import { DB_NAME, DB_VERSION, LEVEL_PRIORITY, LOG_LEVELS, STORE_NAME } from '@/constants';
import type { LogEntry, Logger, LoggerConfig, LogLevel } from '@/typings';
import dayjs from 'dayjs';

const openDatabase = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined' || !window.indexedDB) {
      reject(new Error('IndexedDB is not available'));
      return;
    }

    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = () => {
      reject(new Error('Failed to open IndexedDB'));
    };

    request.onsuccess = () => {
      resolve(request.result);
    };

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        const objectStore = db.createObjectStore(STORE_NAME, { keyPath: 'id' });
        objectStore.createIndex('timestamp', 'timestamp', { unique: false });
        objectStore.createIndex('level', 'level', { unique: false });
      }
    };
  });
};

const saveLog = async (entry: LogEntry): Promise<void> => {
  try {
    const db = await openDatabase();
    const transaction = db.transaction([STORE_NAME], 'readwrite');
    const store = transaction.objectStore(STORE_NAME);

    await new Promise<void>((resolve, reject) => {
      const request = store.add(entry);
      request.onsuccess = () => resolve();
      request.onerror = () => reject(new Error('Failed to save log'));
    });

    db.close();
  } catch (error) {
    // 静默失败，不影响主流程
    console.warn('Failed to persist log to IndexedDB:', error);
  }
};

const getLogs = async (level?: LogLevel, limit = 100): Promise<LogEntry[]> => {
  try {
    const db = await openDatabase();
    const transaction = db.transaction([STORE_NAME], 'readonly');
    const store = transaction.objectStore(STORE_NAME);
    const index = store.index('timestamp');

    return new Promise((resolve, reject) => {
      const request = index.openCursor(null, 'prev');
      const logs: LogEntry[] = [];

      request.onsuccess = (event) => {
        const cursor = (event.target as IDBRequest<IDBCursorWithValue>).result;
        if (cursor && logs.length < limit) {
          const entry = cursor.value as LogEntry;
          if (!level || entry.level === level) {
            logs.push(entry);
          }
          cursor.continue();
        } else {
          resolve(logs);
        }
      };

      request.onerror = () => {
        reject(new Error('Failed to retrieve logs'));
      };
    });
  } catch (error) {
    console.warn('Failed to retrieve logs from IndexedDB:', error);
    return [];
  }
};

const clearLogs = async (): Promise<void> => {
  try {
    const db = await openDatabase();
    const transaction = db.transaction([STORE_NAME], 'readwrite');
    const store = transaction.objectStore(STORE_NAME);

    await new Promise<void>((resolve, reject) => {
      const request = store.clear();
      request.onsuccess = () => resolve();
      request.onerror = () => reject(new Error('Failed to clear logs'));
    });

    db.close();
  } catch (error) {
    console.warn('Failed to clear logs from IndexedDB:', error);
    throw error;
  }
};

const cleanupOldLogs = async (maxEntries: number): Promise<void> => {
  try {
    const db = await openDatabase();
    const transaction = db.transaction([STORE_NAME], 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    const index = store.index('timestamp');

    const countRequest = store.count();
    const count = await new Promise<number>((resolve, reject) => {
      countRequest.onsuccess = () => resolve(countRequest.result);
      countRequest.onerror = () => reject(new Error('Failed to count logs'));
    });

    if (count <= maxEntries) {
      return;
    }

    const deleteCount = count - maxEntries;
    const request = index.openCursor(null, 'next');

    await new Promise<void>((resolve, reject) => {
      let deleted = 0;
      request.onsuccess = (event) => {
        const cursor = (event.target as IDBRequest<IDBCursorWithValue>).result;
        if (cursor && deleted < deleteCount) {
          cursor.delete();
          deleted++;
          cursor.continue();
        } else {
          resolve();
        }
      };
      request.onerror = () => reject(new Error('Failed to cleanup logs'));
    });

    db.close();
  } catch (error) {
    console.warn('Failed to cleanup old logs:', error);
  }
};

export const createLogger = (config: LoggerConfig = {}): Logger => {
  const { level = LOG_LEVELS.INFO, enableConsole = true, enablePersistence = true, maxEntries = 1000, prefix } = config;

  const shouldLog = (logLevel: LogLevel): boolean => {
    return LEVEL_PRIORITY[logLevel] >= LEVEL_PRIORITY[level];
  };

  const formatMessage = (message: string): string => {
    return prefix ? `[${prefix}] ${message}` : message;
  };

  const log = async (logLevel: LogLevel, message: string, dataOrError?: unknown): Promise<void> => {
    if (!shouldLog(logLevel)) {
      return;
    }

    const timestamp = Date.now();
    const id = `${timestamp}-${Math.random().toString(36).substring(2, 9)}`;
    const formattedMessage = formatMessage(message);
    const entry: LogEntry = {
      id,
      level: logLevel,
      message: formattedMessage,
      timestamp,
      ...(prefix ? { prefix } : {}),
      ...(dataOrError instanceof Error
        ? { stack: dataOrError.stack }
        : dataOrError !== undefined
          ? { data: dataOrError }
          : {})
    };

    // 控制台输出
    if (enableConsole) {
      const timestampStr = dayjs(timestamp).format('YYYY-MM-DD HH:mm:ss.SSS');
      const levelStr = logLevel.toUpperCase();
      const logMessage = `[${timestampStr}] [${levelStr}] ${formattedMessage}`;
      const logData = dataOrError instanceof Error ? dataOrError : dataOrError;

      if (logLevel === LOG_LEVELS.ERROR) {
        console.error(logMessage, logData !== undefined ? logData : '');
      } else if (logLevel === LOG_LEVELS.WARN) {
        console.warn(logMessage, logData !== undefined ? logData : '');
      } else if (logLevel === LOG_LEVELS.INFO) {
        console.info(logMessage, logData !== undefined ? logData : '');
      } else {
        console.debug(logMessage, logData !== undefined ? logData : '');
      }
    }

    // 持久化存储
    if (enablePersistence) {
      await saveLog(entry);
      await cleanupOldLogs(maxEntries);
    }
  };

  return {
    debug: (message: string, data?: unknown) => {
      return log(LOG_LEVELS.DEBUG, message, data);
    },
    info: (message: string, data?: unknown) => {
      return log(LOG_LEVELS.INFO, message, data);
    },
    warn: (message: string, data?: unknown) => {
      return log(LOG_LEVELS.WARN, message, data);
    },
    error: (message: string, error?: Error | unknown) => {
      return log(LOG_LEVELS.ERROR, message, error);
    },
    getLogs,
    clearLogs
  };
};
