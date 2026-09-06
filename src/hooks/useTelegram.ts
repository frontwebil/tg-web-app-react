const tg = window.Telegram.WebApp;

export function useTelegram() {
  const onClose = () => {
    tg.close();
  };

  const onToggleButon = () => {
    if (tg.MainButton.isVisible) {
      tg.MainButton.show();
    } else {
      tg.MainButton.hide();
    }
  };

  return {
    onClose,
    onToggleButon,
    tg,
    user: tg.initDataUnsafe.user,
  };
}
