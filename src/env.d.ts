import type { Logger } from './typings';

declare global {
  interface Window {
    logger: Logger;
  }
}
