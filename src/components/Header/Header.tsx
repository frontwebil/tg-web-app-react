import { Button } from "../Button/Button";

export function Header() {
  const tg = window.Telegram.WebApp;

  const onClose = () => {
    tg.close();
  };
  return (
    <header className="header">
      <Button onClick={onClose}>Закрити</Button>
      <span className="username">
        {tg.initDataUnsafe?.user?.username ?? ""}
      </span>
    </header>
  );
}
