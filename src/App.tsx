import { useEffect } from "react";
import "./App.css";
import { Header } from "./components/Header/Header";
import { useTelegram } from "./hooks/useTelegram";
import { Button } from "./components/Button/Button";

function App() {
  const { tg, onToggleButon } = useTelegram();

  useEffect(() => {
    tg.ready();
  }, []);

  return (
    <div className="App">
      <Header />
      <Button onClick={onToggleButon}>Toogle</Button>
    </div>
  );
}

export default App;
