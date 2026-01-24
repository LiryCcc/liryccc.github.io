import { LOG_LEVELS } from '@/constants';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { createLogger } from './logger';

describe('logger', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('createLogger', () => {
    it('should create a logger with default config', () => {
      const logger = createLogger();
      expect(logger).toHaveProperty('debug');
      expect(logger).toHaveProperty('info');
      expect(logger).toHaveProperty('warn');
      expect(logger).toHaveProperty('error');
      expect(logger).toHaveProperty('getLogs');
      expect(logger).toHaveProperty('clearLogs');
    });

    it('should respect log level configuration', () => {
      const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
      const logger = createLogger({ level: LOG_LEVELS.WARN, enableConsole: true });

      logger.debug('debug message');
      logger.info('info message');
      logger.warn('warn message');

      expect(consoleSpy).toHaveBeenCalledTimes(1);
      const callArgs = consoleSpy.mock.calls[0];
      expect(callArgs).toBeDefined();
      expect(callArgs?.[0]).toContain('[WARN]');
      expect(callArgs?.[0]).toContain('warn message');
      expect(callArgs?.[1]).toBe('');

      consoleSpy.mockRestore();
    });

    it('should disable console output when enableConsole is false', () => {
      const consoleSpy = vi.spyOn(console, 'info').mockImplementation(() => {});
      const logger = createLogger({ enableConsole: false });

      logger.info('test message');

      expect(consoleSpy).not.toHaveBeenCalled();

      consoleSpy.mockRestore();
    });

    it('should log error with stack trace', () => {
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
      const logger = createLogger({ enableConsole: true });

      const error = new Error('test error');
      logger.error('error occurred', error);

      const callArgs = consoleSpy.mock.calls[0];
      expect(callArgs).toBeDefined();
      expect(callArgs?.[0]).toContain('[ERROR]');
      expect(callArgs?.[0]).toContain('error occurred');
      expect(callArgs?.[1]).toBe(error);

      consoleSpy.mockRestore();
    });

    it('should log with data', () => {
      const consoleSpy = vi.spyOn(console, 'info').mockImplementation(() => {});
      const logger = createLogger({ enableConsole: true });

      const data = { userId: 123, action: 'login' };
      logger.info('user action', data);

      const callArgs = consoleSpy.mock.calls[0];
      expect(callArgs).toBeDefined();
      expect(callArgs?.[0]).toContain('[INFO]');
      expect(callArgs?.[0]).toContain('user action');
      expect(callArgs?.[1]).toEqual(data);

      consoleSpy.mockRestore();
    });
  });

  describe('log levels', () => {
    it('should support all log levels', () => {
      const logger = createLogger({ level: LOG_LEVELS.DEBUG, enableConsole: false });

      expect(() => logger.debug('debug')).not.toThrow();
      expect(() => logger.info('info')).not.toThrow();
      expect(() => logger.warn('warn')).not.toThrow();
      expect(() => logger.error('error')).not.toThrow();
    });
  });

  describe('prefix', () => {
    it('should add prefix to log messages when provided', () => {
      const consoleSpy = vi.spyOn(console, 'info').mockImplementation(() => {});
      const logger = createLogger({ prefix: 'MyModule', enableConsole: true, enablePersistence: false });

      logger.info('test message');

      const callArgs = consoleSpy.mock.calls[0];
      expect(callArgs).toBeDefined();
      expect(callArgs?.[0]).toContain('[MyModule]');
      expect(callArgs?.[0]).toContain('test message');

      consoleSpy.mockRestore();
    });

    it('should not add prefix when not provided', () => {
      const consoleSpy = vi.spyOn(console, 'info').mockImplementation(() => {});
      const logger = createLogger({ enableConsole: true, enablePersistence: false });

      logger.info('test message');

      const callArgs = consoleSpy.mock.calls[0];
      expect(callArgs).toBeDefined();
      const messagePart = callArgs?.[0] as string;
      expect(messagePart).toContain('test message');
      // 检查不包含类似 [MyModule] 这样的前缀格式（在级别标识之后）
      const afterLevel = messagePart.split(']').slice(2).join(']');
      expect(afterLevel.trim()).toBe('test message');

      consoleSpy.mockRestore();
    });

    it('should include prefix in all log levels', () => {
      const consoleSpy = vi.spyOn(console, 'debug').mockImplementation(() => {});
      const logger = createLogger({
        prefix: 'Test',
        level: LOG_LEVELS.DEBUG,
        enableConsole: true,
        enablePersistence: false
      });

      logger.debug('debug message');
      logger.info('info message');
      logger.warn('warn message');
      logger.error('error message');

      expect(consoleSpy).toHaveBeenCalled();
      const callArgs = consoleSpy.mock.calls[0];
      expect(callArgs?.[0]).toContain('[Test]');

      consoleSpy.mockRestore();
    });
  });
});
