import { useState, useRef, useEffect } from "react";
import "./RelationshipPage.css";

const RELATIONSHIP_START = new Date("2026-03-05T00:00:00+08:00");

const MEDIA_ITEMS = [
  { type: "video", src: "/yuni/IMG_2697.MOV", alt: "yuni 1" },
  { type: "video", src: "/yuni/IMG_3311.MOV", alt: "yuni 2" },
  { type: "video", src: "/yuni/IMG_3314.MOV", alt: "yuni 3" },
  { type: "video", src: "/yuni/IMG_3312.MOV", alt: "yuni 4" },
  { type: "image", src: "/yuni/photo_2026-03-06_21-23-31.jpg", alt: "yuni 5" },
  { type: "image", src: "/yuni/photo_2026-03-06_21-23-42.jpg", alt: "yuni 6" },
  { type: "image", src: "/yuni/photo_2026-03-06_21-26-15.jpg", alt: "yuni 7" },
  { type: "image", src: "/yuni/photo_2026-03-06_21-30-13.jpg", alt: "yuni 8" },
  { type: "image", src: "/yuni/photo_2026-03-06_21-31-15.jpg", alt: "yuni 9" },
  { type: "image", src: "/yuni/photo_2026-03-06_21-58-56.jpg", alt: "yuni 10" },
  { type: "image", src: "/yuni/photo_2026-03-06_21-58-57.jpg", alt: "yuni 11" },
  { type: "image", src: "/yuni/photo_2026-03-06_22-05-16.jpg", alt: "yuni 12" },
  { type: "image", src: "/yuni/photo_2026-03-06_22-05-19.jpg", alt: "yuni 13" },
  { type: "image", src: "/yuni/photo_2026-03-06_22-06-12.jpg", alt: "yuni 14" },
];

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

export default function RelationshipPage() {
  const relDuration = useRelationshipDuration();
  const [mediaIndex, setMediaIndex] = useState(0);
  const [isGiftOpened, setIsGiftOpened] = useState(false);
  const [isAnimatingGift, setIsAnimatingGift] = useState(false);

  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);

  const nextMedia = () => {
    setMediaIndex((prev) => (prev + 1) % MEDIA_ITEMS.length);
  };

  const prevMedia = () => {
    setMediaIndex((prev) => (prev - 1 + MEDIA_ITEMS.length) % MEDIA_ITEMS.length);
  };

  const toggleAudio = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
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

  const handleOpenGift = () => {
    if (isGiftOpened || isAnimatingGift) return;
    setIsAnimatingGift(true);
    setTimeout(() => {
      setIsGiftOpened(true);
      setIsAnimatingGift(false);
    }, 1200);
  };

  const currentLyric = LYRICS.slice().reverse().find(lyric => currentTime >= lyric.time)?.text || LYRICS[0].text;

  return (
    <div className="relationship-page">
      <div className="relationship-card">
        <div className="relationship-header">
          <h2 className="relationship-title">Hi Bea</h2>
          <p className="relationship-subtitle">
            I am incredibly happy that you legitimately said yes. I asked you so many times yesterday if it was true because I truly couldn't believe it. Sorry for laughing randomly in the car yesterday. I just couldn't help it. I love you so muchhhhhhhhhhhhhh.
          </p>
        </div>

        <div className="relationship-timer">
          <span className="timer-label">Time since your sweet "Yes":</span>
          <span className="timer-value">{relDuration}</span>
        </div>

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
    </div>
  );
}
