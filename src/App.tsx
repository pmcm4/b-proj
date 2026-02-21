import { useState } from "react";
import CourtingPage from "./component/CourtingPage/CourtingPage";
import PasswordPage from "./component/PasswordPage/PasswordPage";

function App() {
  const [unlocked, setUnlocked] = useState(false);

  return unlocked ? <CourtingPage /> : <PasswordPage onSuccess={() => setUnlocked(true)} />;
}

export default App;
