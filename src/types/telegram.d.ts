interface Window {
  Telegram: {
    WebApp: {
      ready: () => void;
      expand: () => void;
      close: () => void;

      initDataUnsafe: {
        user?: {
          id: number;
          username?: string;
          first_name?: string;
          last_name?: string;
        };
      };
    };
  };
}
