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

/* ─── Media Slideshow config ─── */
const MEDIA_ITEMS = [
    { type: "video", src: "https://res.cloudinary.com/dgb2lnz2i/video/upload/v1772813295/IMG_2697_hqd5ii.mp4", alt: "yuni 1" },
    { type: "video", src: "https://res.cloudinary.com/dgb2lnz2i/video/upload/v1772813294/IMG_3311_c9hc8q.mp4", alt: "yuni 2" },
    { type: "video", src: "https://res.cloudinary.com/dgb2lnz2i/video/upload/v1772813294/IMG_3314_g33jbm.mp4", alt: "yuni 3" },
    { type: "video", src: "https://res.cloudinary.com/dgb2lnz2i/video/upload/v1772813294/IMG_3312_s2h3p8.mp4", alt: "yuni 4" },
    { type: "image", src: "https://res.cloudinary.com/dgb2lnz2i/image/upload/v1772813296/photo_2026-03-06_21-58-56_yedtmz.jpg", alt: "yuni 13" },
    { type: "image", src: "https://res.cloudinary.com/dgb2lnz2i/image/upload/v1772813297/photo_2026-03-06_21-58-57_lon5yw.jpg", alt: "yuni 14" },
    { type: "image", src: "https://res.cloudinary.com/dgb2lnz2i/image/upload/v1772813293/photo_2026-03-06_22-06-12_augwla.jpg", alt: "yuni 5" },
    { type: "image", src: "https://res.cloudinary.com/dgb2lnz2i/image/upload/v1772813296/photo_2026-03-06_22-05-19_he5hv7.jpg", alt: "yuni 6" },
    { type: "image", src: "https://res.cloudinary.com/dgb2lnz2i/image/upload/v1772813295/photo_2026-03-06_21-23-42_gcteut.jpg", alt: "yuni 7" },
    { type: "image", src: "https://res.cloudinary.com/dgb2lnz2i/image/upload/v1772813295/photo_2026-03-06_21-23-31_csqyn4.jpg", alt: "yuni 8" },
    { type: "image", src: "https://res.cloudinary.com/dgb2lnz2i/image/upload/v1772813296/photo_2026-03-06_21-26-15_yfqwue.jpg", alt: "yuni 9" },
    { type: "image", src: "https://res.cloudinary.com/dgb2lnz2i/image/upload/v1772813296/photo_2026-03-06_21-30-13_g5sa0x.jpg", alt: "yuni 10" },
    { type: "image", src: "https://res.cloudinary.com/dgb2lnz2i/image/upload/v1772813296/photo_2026-03-06_21-31-15_tnw8xr.jpg", alt: "yuni 11" },
    { type: "image", src: "https://res.cloudinary.com/dgb2lnz2i/image/upload/v1772813296/photo_2026-03-06_22-05-16_zdpwvd.jpg", alt: "yuni 12" },
];

/* ─── Lyrics config: "Your Universe" by Rico Blanco ─── */
const LYRICS = [
    { time: 0, text: "Press play, Bea :)" },
    { time: 1.20, text: "Tell me something" },
    { time: 3.49, text: "When the rain falls on my face" },
    { time: 9.50, text: "How do you quickly replace" },
    { time: 13.50, text: "It with a golden summer smile" },
    { time: 20.10, text: "Tell me something" },
    { time: 22.70, text: "When I'm feeling tired and afraid" },
    { time: 28.40, text: "How do you know just what to say" },
    { time: 32.40, text: "To make everything all right" },
    { time: 41.40, text: "I don't think that you even realize the joy you make me feel when I'm inside" },
    { time: 48.00, text: "Your universe" },
    { time: 52.40, text: "You hold me like I'm the one who's precious" },
    { time: 54.80, text: "I hate to break it to you but it's just" },
    { time: 57.60, text: "The other way around" },
    { time: 62.50, text: "You can thank your stars all you want but" },
    { time: 66.00, text: "I'll always be the lucky one" },
    { time: 74.70, text: "Tell me something" },
    { time: 77.50, text: "When I'm about to lose control" },
    { time: 83.00, text: "How do you patiently hold" },
    { time: 86.50, text: "My hand and gently calm me down" },
    { time: 96.40, text: "Tell me something" },
    { time: 99.30, text: "When you sing and when you lie" },
    { time: 104.70, text: "When you are always photograph my heart" },
    { time: 110.10, text: "Fly way above the clouds" },
    { time: 117.60, text: "I don't think that you even realize the joy you make me feel when I'm inside" },
    { time: 124.20, text: "Your universe" },
    { time: 128.50, text: "You hold me like I'm the one who's precious" },
    { time: 131.00, text: "I hate to break it to you but it's just" },
    { time: 133.80, text: "The other way around" },
    { time: 138.40, text: "You can thank your stars all you want but" },
    { time: 141.80, text: "I'll always be the lucky one" },
    { time: 149.50, text: "Woah" },
    { time: 154.50, text: "Woah" },
    { time: 159.50, text: "Woah" },
    { time: 172.30, text: "I don't think that you even realize the joy you make me feel when I'm inside" },
    { time: 178.80, text: "Your universe" },
    { time: 183.20, text: "You hold me like I'm the one who's precious" },
    { time: 185.70, text: "I hate to break it to you but it's just" },
    { time: 188.50, text: "The other way around" },
    { time: 192.80, text: "You can thank your stars all you want but" },
    { time: 196.40, text: "I'll always be the lucky one" },
    { time: 203.80, text: "You can thank your stars all you want but" },
    { time: 207.20, text: "I'll always be the lucky one" },
    { time: 218.70, text: "I'll always be the lucky one" },
    { time: 226.80, text: "I'll always be the lucky one" },
    { time: 235.00, text: "🎵" }
];

/* ─── Live duration since we first talked ─── */
const START_DATE = new Date("2026-01-30T02:41:00+08:00");

function formatDuration(ms: number) {
    const absMs = Math.abs(ms);
    const totalSeconds = Math.floor(absMs / 1000);
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

/* ─── Live relationship timer since March 5, 2026 ─── */
const RELATIONSHIP_START = new Date("2026-03-05T00:00:00+08:00");

function useRelationshipDuration() {
    const [duration, setDuration] = useState(() =>
        formatDuration(Date.now() - RELATIONSHIP_START.getTime())
    );
    useEffect(() => {
        const id = setInterval(() => {
            setDuration(formatDuration(Date.now() - RELATIONSHIP_START.getTime()));
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
    const relDuration = useRelationshipDuration();
    /* No-button evasion state */
    const [isEvasive, setIsEvasive] = useState(false);
    const [noPos, setNoPos] = useState({ x: 0, y: 0 });
    const noBtnRef = useRef<HTMLButtonElement>(null);

    /* State */
    const [showCourtingCard, setShowCourtingCard] = useState(false);
    const [confetti, setConfetti] = useState<ReturnType<typeof makeConfetti>>([]);
    const [mediaIndex, setMediaIndex] = useState(0);

    /* Proof modal state */
    const [showProof, setShowProof] = useState(false);

    /* Audio and Lyrics state */
    const audioRef = useRef<HTMLAudioElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);

    /* Gift Box State */
    const [isGiftOpened, setIsGiftOpened] = useState(false);
    const [isAnimatingGift, setIsAnimatingGift] = useState(false);

    /* ── Dodge handler ── */
    const dodge = (e?: React.MouseEvent | React.TouchEvent) => {
        e?.preventDefault();
        if (!isEvasive) setIsEvasive(true);
        setNoPos(prev => randomPosition(noBtnRef, isEvasive ? prev : undefined));
    };

    /* ── Yes handler ── */
    const handleYes = () => {
        setConfetti(makeConfetti(120));
        setShowCourtingCard(false);
    };

    /* ── Slideshow handlers ── */
    const nextMedia = () => {
        setMediaIndex((prev) => (prev + 1) % MEDIA_ITEMS.length);
    };

    const prevMedia = () => {
        setMediaIndex((prev) => (prev - 1 + MEDIA_ITEMS.length) % MEDIA_ITEMS.length);
    };

    /* ── Audio handlers ── */
    const toggleAudio = () => {
        if (!audioRef.current) return;
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
            // Open the gift box when play is first pressed
            if (!isGiftOpened && !isAnimatingGift) {
                handleOpenGift();
            }
        }
        setIsPlaying(!isPlaying);
    };

    const handleTimeUpdate = () => {
        if (!audioRef.current) return;
        setCurrentTime(audioRef.current.currentTime);
    };

    /* Find current lyric line */
    const currentLyric = LYRICS.slice().reverse().find(lyric => currentTime >= lyric.time)?.text || LYRICS[0].text;

    /* ── Gift Box Handler ── */
    const handleOpenGift = () => {
        if (isGiftOpened || isAnimatingGift) return;
        setIsAnimatingGift(true);
        setTimeout(() => {
            setIsGiftOpened(true);
            setIsAnimatingGift(false);
        }, 1200);
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
            {/* Confetti overlay for main screen */}
            <div className="confetti-layer" aria-hidden style={{ zIndex: 100, pointerEvents: "none" }}>
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

            {/* ─── Main View: Appreciation Screen ─── */}
            <div className="appreciation-main-card">
                <div className="success-header">
                    <h2 className="success-title">Hi Bea</h2>
                    <p className="success-subtitle">
                        I am incredibly happy that you legitimately said yes. I asked you so many times yesterday if it was true because I truly couldn’t believe it. Sorry for laughing randomly in the car yesterday. I just couldn’t help it. I love you so muchhhhhhhhhhhhhh.                    </p>
                </div>

                <div className="relationship-timer">
                    <span className="timer-label">Time since your sweet "Yes":</span>
                    <span className="timer-value">{relDuration}</span>
                </div>

                {/* ─── Interactive Gift Box or Media Slideshow ─── */}
                {!isGiftOpened ? (
                    <div className="gift-box-container">
                        <div className={`gift-box ${isAnimatingGift ? "opening" : "bouncing"}`}>
                            <div className="gift-lid">
                                <div className="gift-bow"></div>
                            </div>
                            <div className="gift-body"></div>
                        </div>
                    </div>
                ) : (
                    <div className="media-slideshow" style={{ animation: "fadeIn 1.5s ease" }}>
                        {MEDIA_ITEMS.length > 0 && (
                            <>
                                <button className="slide-btn prev" onClick={prevMedia} aria-label="Previous media">
                                    &#10094;
                                </button>
                                <div className="slide-content">
                                    {MEDIA_ITEMS[mediaIndex].type === "image" ? (
                                        <img
                                            src={MEDIA_ITEMS[mediaIndex].src}
                                            alt={MEDIA_ITEMS[mediaIndex].alt}
                                            className="slide-media"
                                        />
                                    ) : (
                                        <video
                                            src={MEDIA_ITEMS[mediaIndex].src}
                                            className="slide-media"
                                            autoPlay
                                            loop
                                            muted
                                            playsInline
                                        />
                                    )}
                                </div>
                                <button className="slide-btn next" onClick={nextMedia} aria-label="Next media">
                                    &#10095;
                                </button>
                            </>
                        )}
                    </div>
                )}

                {/* ─── Music Player & Lyrics ─── */}
                <div className="music-player-section">
                    <audio
                        ref={audioRef}
                        src="/yuni/Rico Blanco - Your Universe.mp3"
                        onTimeUpdate={handleTimeUpdate}
                        onEnded={() => setIsPlaying(false)}
                    />

                    <div className="lyrics-display">
                        <p className="lyric-line">{currentLyric}</p>
                    </div>

                    <button className="btn-play-music" onClick={toggleAudio}>
                        {isPlaying ? "⏸" : "▶"}
                    </button>
                </div>
            </div>

            {/* ─── Revisit Button (Outside Card) ─── */}
            <div className="revisit-row-outside">
                <button className="btn btn-revisit-glass" onClick={() => setShowCourtingCard(true)}>
                    See how I asked you out again
                </button>
            </div>

            {/* ─── Courting Overlay (portal) ─── */}
            {showCourtingCard &&
                typeof document !== "undefined" &&
                createPortal(
                    <div className="courting-overlay" onClick={() => setShowCourtingCard(false)}>
                        <div className="courting-card modal-version" onClick={e => e.stopPropagation()}>
                            <button
                                className="proof-close"
                                onClick={() => setShowCourtingCard(false)}
                                aria-label="Close"
                            >
                                ✕
                            </button>
                            <span className="heart-graphic">💕</span>

                            <h1 className="courting-heading">
                                Hi <span className="recipient-name">Bea</span>,<br />
                                can I <strong >court</strong> you?
                            </h1>

                            <p className="courting-message">
                                I know we've just met -{" "}
                                <span className="duration-counter">{duration}</span>{" "}
                                ago to be exact (
                                <button className="proof-link" onClick={() => setShowProof(true)}>
                                    here's proof.
                                </button>
                                ) - yes, I checked hehehe 😄 - but kidding aside, in that time, I’ve genuinely enjoyed getting to know you and I feel a strong connection.
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
                    </div>,
                    document.body
                )}

            {/* ─── Proof modal ─── */}
            {showProof &&
                typeof document !== "undefined" &&
                createPortal(
                    <div className="proof-backdrop" style={{ zIndex: 1100 }} onClick={() => setShowProof(false)}>
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
