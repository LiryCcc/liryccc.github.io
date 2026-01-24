import type { LOG_LEVELS } from '@/constants';
import type { Values } from './generic';

export type LogLevel = Values<typeof LOG_LEVELS>;

export type LogEntry = {
  id: string;
  level: LogLevel;
  message: string;
  timestamp: number;
  prefix?: string | undefined;
  data?: unknown;
  stack?: string | undefined;
};

export type LoggerConfig = {
  level?: LogLevel;
  enableConsole?: boolean;
  enablePersistence?: boolean;
  maxEntries?: number;
  prefix?: string;
};

export type Logger = {
  debug: (message: string, data?: unknown) => void;
  info: (message: string, data?: unknown) => void;
  warn: (message: string, data?: unknown) => void;
  error: (message: string, error?: Error | unknown) => void;
  getLogs: (level?: LogLevel, limit?: number) => Promise<LogEntry[]>;
  clearLogs: () => Promise<void>;
};
