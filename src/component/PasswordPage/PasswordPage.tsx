import { useState } from "react";
import "./PasswordPage.css";

type Props = {
    onSuccess: () => void;
};

// Replace this with whatever you want the password to be!
const CORRECT_PASSWORD = "bea-maangas";

export default function PasswordPage({ onSuccess }: Props) {
    const [password, setPassword] = useState("");
    const [errorKey, setErrorKey] = useState(0); // Used to re-trigger shake animation

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (password.trim() === CORRECT_PASSWORD) {
            onSuccess();
        } else {
            setErrorKey((prev) => prev + 1);
            setPassword("");
        }
    };

    return (
        <div className="password-page">
            <div className={`password-card ${errorKey > 0 ? "shake" : ""}`} key={errorKey}>
                <span className="lock-icon">🔒</span>

                <h1 className="password-heading">For Bea</h1>
                <p className="password-subtitle">
                    Nasa likod ng papel ang passcode
                </p>

                <form onSubmit={handleSubmit} className="password-form">
                    <input
                        type="password"
                        className="password-input"
                        placeholder="Enter passcode..."
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        autoFocus
                    />
                    <button type="submit" className="btn btn-unlock">
                        Unlock
                    </button>
                </form>
            </div>
        </div>
    );
}
