import { useTelegram } from "../../hooks/useTelegram";
import { Button } from "../Button/Button";

export function Header() {
  const { user, onClose } = useTelegram();

  return (
    <header className="header">
      <Button onClick={onClose}>Закрити</Button>
      <span className="username">{user?.username ?? ""}</span>
    </header>
  );
}
