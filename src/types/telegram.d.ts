import type { Telegram } from "@types/telegram-web-app";

declare global {
  interface Window {
    Telegram: Telegram;
  }
}

export {};
