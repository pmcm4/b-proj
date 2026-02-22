import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import "./CourtingPage.css";

/* ─── Confetti config ─── */
const CONFETTI_COLORS = [
    "#f48bb0", "#f9a8c9", "#ffc8d8", "#ff85a1",
    "#e8608f", "#c63a73", "#ffb3cc", "#ff5c8d",
];

function makeConfetti(count = 80) {
    return Array.from({ length: count }, () => ({
        left: Math.random() * 100,
        delay: Math.floor(Math.random() * 1400),
        duration: 4000 + Math.floor(Math.random() * 3000),
        width: 6 + Math.floor(Math.random() * 8),
        height: 4 + Math.floor(Math.random() * 6),
        color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
        rotate: Math.floor(Math.random() * 360),
    }));
}

/* ─── "No" button position helper ─── */
function randomPosition(
    btnRef: React.RefObject<HTMLButtonElement | null>,
    current?: { x: number; y: number }
) {
    if (!btnRef.current) return { x: 0, y: 0 };
    const { width, height, left, top } = btnRef.current.getBoundingClientRect();
    const pad = 20;
    const maxX = window.innerWidth - width - pad;
    const maxY = window.innerHeight - height - pad;

    const baseX = Math.min(Math.max(current?.x ?? left, pad), maxX);
    const baseY = Math.min(Math.max(current?.y ?? top, pad), maxY);

    const angle = Math.random() * Math.PI * 2;
    const radius = 40 + Math.random() * 80;

    const x = Math.min(Math.max(Math.round(baseX + Math.cos(angle) * radius), pad), maxX);
    const y = Math.min(Math.max(Math.round(baseY + Math.sin(angle) * radius), pad), maxY);
    return { x, y };
}

/* ─── Success image config ─── */
const SUCCESS_IMAGE = {
    src: "https://res.cloudinary.com/dgb2lnz2i/image/upload/v1755854741/yeyy-removebg-preview_a6el2f.png",
    alt: "Yeeey!!",
};

/* ─── Live duration since we first talked ─── */
const START_DATE = new Date("2026-01-30T02:41:00+08:00");

function formatDuration(ms: number) {
    const totalSeconds = Math.floor(ms / 1000);
    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    const parts: string[] = [];
    if (days) parts.push(`${days} day${days !== 1 ? "s" : ""}`);
    if (hours) parts.push(`${hours} hour${hours !== 1 ? "s" : ""}`);
    if (minutes) parts.push(`${minutes} minute${minutes !== 1 ? "s" : ""}`);
    parts.push(`${seconds} second${seconds !== 1 ? "s" : ""}`);

    return parts.join(", ");
}

function useDuration() {
    const [duration, setDuration] = useState(() =>
        formatDuration(Date.now() - START_DATE.getTime())
    );
    useEffect(() => {
        const id = setInterval(() => {
            setDuration(formatDuration(Date.now() - START_DATE.getTime()));
        }, 1000);
        return () => clearInterval(id);
    }, []);
    return duration;
}

/* ================================================================
   MAIN COMPONENT
   ================================================================ */
export default function CourtingPage() {
    const duration = useDuration();
    /* No-button evasion state */
    const [isEvasive, setIsEvasive] = useState(false);
    const [noPos, setNoPos] = useState({ x: 0, y: 0 });
    const noBtnRef = useRef<HTMLButtonElement>(null);

    /* Success overlay state */
    const [showSuccess, setShowSuccess] = useState(false);
    const [confetti, setConfetti] = useState<ReturnType<typeof makeConfetti>>([]);

    /* Proof modal state */
    const [showProof, setShowProof] = useState(false);

    /* ── Dodge handler ── */
    const dodge = (e?: React.MouseEvent | React.TouchEvent) => {
        e?.preventDefault();
        if (!isEvasive) setIsEvasive(true);
        setNoPos(prev => randomPosition(noBtnRef, isEvasive ? prev : undefined));
    };

    /* ── Yes handler ── */
    const handleYes = () => {
        setConfetti(makeConfetti(90));
        setShowSuccess(true);
    };

    /* ── No-button props (changes when evasive) ── */
    const noBtnProps = isEvasive
        ? {
            ref: noBtnRef,
            style: {
                position: "fixed" as const,
                left: noPos.x,
                top: noPos.y,
            } as React.CSSProperties,
            onMouseEnter: dodge,
            onMouseMove: dodge,
            onClick: dodge,
            onTouchStart: dodge,
        }
        : {
            ref: noBtnRef,
            onMouseEnter: dodge,
            onClick: dodge,
            onTouchStart: dodge,
        };

    return (
        <div className="courting-page">
            {/* ─── Main card ─── */}
            <div className="courting-card">
                <span className="heart-graphic">💕</span>

                <h1 className="courting-heading">
                    Hi <span className="recipient-name">Bea</span>,<br />
                    can I <strong >court</strong> you?
                </h1>

                <p className="courting-message">
                    I know we've just met —{" "}
                    <span className="duration-counter">{duration}</span>{" "}
                    ago to be exact (
                    <button className="proof-link" onClick={() => setShowProof(true)}>
                        here's proof
                    </button>
                    ) — but in that time, I’ve genuinely enjoyed getting to know you and I feel a strong connection.
                    I wanted to ask because I’d like to pursue you intentionally.
                    No pressure at all. If now isn’t the right time for you, that’s completely okay. 🌸
                </p>

                <div className="buttons-row">
                    <button className="btn btn-yes" onClick={handleYes}>
                        Yes 💗
                    </button>
                    <button className={`btn btn-no${isEvasive ? " evasive" : ""}`} {...noBtnProps}>
                        No 🙈
                    </button>
                </div>
            </div>

            {/* ─── Success overlay (portal) ─── */}
            {showSuccess &&
                typeof document !== "undefined" &&
                createPortal(
                    <div className="success-overlay">
                        {/* Confetti */}
                        <div className="confetti-layer" aria-hidden>
                            {confetti.map((p, i) => (
                                <span
                                    key={i}
                                    className="confetti-piece"
                                    style={{
                                        left: `${p.left}%`,
                                        width: `${p.width}px`,
                                        height: `${p.height}px`,
                                        backgroundColor: p.color,
                                        animationDuration: `${p.duration}ms, ${Math.max(1500, p.duration * 0.5)}ms`,
                                        animationDelay: `${p.delay}ms, ${p.delay}ms`,
                                        transform: `rotate(${p.rotate}deg)`,
                                    }}
                                />
                            ))}
                        </div>

                        {/* Success card */}
                        <div className="success-card">
                            <div className="success-image-single">
                                <img
                                    className="success-img-single"
                                    src={SUCCESS_IMAGE.src}
                                    alt={SUCCESS_IMAGE.alt}
                                />
                            </div>
                        </div>
                    </div>,
                    document.body
                )}

            {/* ─── Proof modal ─── */}
            {showProof &&
                typeof document !== "undefined" &&
                createPortal(
                    <div className="proof-backdrop" onClick={() => setShowProof(false)}>
                        <div className="proof-modal" onClick={e => e.stopPropagation()}>
                            <button
                                className="proof-close"
                                onClick={() => setShowProof(false)}
                                aria-label="Close"
                            >
                                ✕
                            </button>
                            <img
                                src="/5b33459e-ed67-4304-9f0d-b2d851e52845.jpg"
                                alt="Proof — January 30, 2:41 AM"
                                className="proof-img"
                            />
                            <p className="proof-caption">January 30 · 2:41 AM 🌙</p>
                        </div>
                    </div>,
                    document.body
                )}
        </div>
    );
}
