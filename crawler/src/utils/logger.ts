import { createInterface } from 'readline';

export enum LogLevel {
  INFO = 'INFO',
  WARN = 'WARN',
  ERROR = 'ERROR',
  DEBUG = 'DEBUG',
  SUCCESS = 'SUCCESS',
}

const colors: Record<LogLevel, string> = {
  [LogLevel.INFO]: '\x1b[36m',
  [LogLevel.WARN]: '\x1b[33m',
  [LogLevel.ERROR]: '\x1b[31m',
  [LogLevel.DEBUG]: '\x1b[90m',
  [LogLevel.SUCCESS]: '\x1b[32m',
};

const reset = '\x1b[0m';

class Logger {
  private logFile: string | null = null;
  private startTime = Date.now();

  setLogFile(path: string) {
    this.logFile = path;
  }

  private formatTimestamp(): string {
    const elapsed = ((Date.now() - this.startTime) / 1000).toFixed(1);
    return `[+${elapsed}s]`;
  }

  private log(level: LogLevel, ...args: unknown[]) {
    const timestamp = this.formatTimestamp();
    const prefix = `${colors[level]}${timestamp} [${level}]${reset}`;
    const message = args.map(a => (typeof a === 'object' ? JSON.stringify(a, null, 2) : String(a))).join(' ');
    console.log(`${prefix} ${message}`);
  }

  info(...args: unknown[]) { this.log(LogLevel.INFO, ...args); }
  warn(...args: unknown[]) { this.log(LogLevel.WARN, ...args); }
  error(...args: unknown[]) { this.log(LogLevel.ERROR, ...args); }
  debug(...args: unknown[]) { this.log(LogLevel.DEBUG, ...args); }
  success(...args: unknown[]) { this.log(LogLevel.SUCCESS, ...args); }

  progress(current: number, total: number, label: string) {
    const pct = ((current / total) * 100).toFixed(1);
    this.info(`${label}: ${current}/${total} (${pct}%)`);
  }

  divider() {
    console.log('\x1b[34m' + '='.repeat(60) + '\x1b[0m');
  }

  async question(query: string): Promise<string> {
    const rl = createInterface({ input: process.stdin, output: process.stdout });
    return new Promise(resolve => {
      rl.question(query, answer => {
        rl.close();
        resolve(answer);
      });
    });
  }
}

export const logger = new Logger();
