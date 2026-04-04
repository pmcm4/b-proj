import { useState } from "react";
import MainPage from "./component/MainPage/MainPage";
import PasswordPage from "./component/PasswordPage/PasswordPage";

function App() {
  const [unlocked, setUnlocked] = useState(false);

  return unlocked ? <MainPage /> : <PasswordPage onSuccess={() => setUnlocked(true)} />;
}

export default App;
