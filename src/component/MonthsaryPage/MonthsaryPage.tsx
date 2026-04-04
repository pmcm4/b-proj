import { useState, useRef, useEffect } from "react";
import "./MonthsaryPage.css";

const SPG_ITEMS = [
  "I LOVE the view whenever you're on top of me.",
  "I LOVE your face whenever I'm looking down on you when I'm on top.",
  "I LOVE the view at the back, you know what I mean.",
  "I LOVE it whenever you compliment me when we're doing it."
];

const MONTHSARY_MEDIA = [
  { type: "image", src: "/first-month/photo_2026-04-04_22-51-08.jpg", alt: "Our memory" },
  { type: "video", src: "/first-month/my-beiby-3.mp4", alt: "Our moments" },
  { type: "image", src: "/first-month/photo_2026-04-04_21-02-28.jpg", alt: "Our memory" },
  { type: "image", src: "/first-month/photo_2026-04-04_22-08-56.jpg", alt: "Our memory" },
  { type: "video", src: "/first-month/my-beiby.mp4", alt: "Our moments" },
  { type: "image", src: "/first-month/photo_2026-04-04_22-09-20.jpg", alt: "Our memory" },
  { type: "image", src: "/first-month/photo_2026-04-04_22-51-25.jpg", alt: "Our memory" },
  { type: "video", src: "/first-month/my-beiby-5.mp4", alt: "Our moments" },
  { type: "image", src: "/first-month/photo_2026-04-04_22-08-52.jpg", alt: "Our memory" },
  { type: "image", src: "/first-month/photo_2026-04-04_21-02-32.jpg", alt: "Our memory" },
  { type: "video", src: "/first-month/my-beiby-2.mp4", alt: "Our moments" },
  { type: "image", src: "/first-month/photo_2026-04-04_22-51-04.jpg", alt: "Our memory" },
  { type: "image", src: "/first-month/photo_2026-04-04_22-09-02.jpg", alt: "Our memory" },
  { type: "image", src: "/first-month/photo_2026-04-04_22-51-37.jpg", alt: "Our memory" },
  { type: "video", src: "/first-month/my-beiby-4.mp4", alt: "Our moments" },
  { type: "image", src: "/first-month/photo_2026-04-04_22-09-19.jpg", alt: "Our memory" },
  { type: "image", src: "/first-month/photo_2026-04-04_21-02-24.jpg", alt: "Our memory" },
  { type: "image", src: "/first-month/photo_2026-04-04_22-51-20.jpg", alt: "Our memory" },
  { type: "image", src: "/first-month/photo_2026-04-04_22-08-54.jpg", alt: "Our memory" },
  { type: "image", src: "/first-month/photo_2026-04-04_22-09-24.jpg", alt: "Our memory" },
];

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

const LYRICS = [
  { time: 0, text: "Press play, Beiby :)" },
  { time: 1, text: "..." },
  { time: 15.69, text: "Every breath you take" },
  { time: 19.49, text: "And every move you make" },
  { time: 23.53, text: "Every bond you break" },
  { time: 25.62, text: "Every step you take" },
  { time: 27.69, text: "I'll be watching you" },
  { time: 32.10, text: "Every single day" },
  { time: 36.09, text: "Every word you say" },
  { time: 40.00, text: "Every game you play" },
  { time: 42.02, text: "Every night you stay" },
  { time: 44.07, text: "I'll be watching you" },
  { time: 48.37, text: "Oh, can't you see?" },
  { time: 52.46, text: "You belong to me" },
  { time: 56.58, text: "How my poor heart aches" },
  { time: 60.40, text: "With every step you take" },
  { time: 64.79, text: "Every move you make" },
  { time: 68.62, text: "And every vow you break" },
  { time: 72.70, text: "Every smile you fake" },
  { time: 74.75, text: "Every claim you stake" },
  { time: 76.75, text: "I'll be watching you" },
  { time: 82.92, text: "Since you've gone" },
  { time: 83.90, text: "I've been lost without a trace" },
  { time: 87.01, text: "I dream at night, I can only see your face" },
  { time: 91.05, text: "I look around, but it's you I can't replace" },
  { time: 95.18, text: "I feel so cold and I long for your embrace" },
  { time: 99.37, text: "I keep crying, baby, baby, please" },
  { time: 134.28, text: "Oh, can't you see?" },
  { time: 138.30, text: "You belong to me" },
  { time: 142.50, text: "How my poor heart aches" },
  { time: 146.35, text: "With every step you take" },
  { time: 150.62, text: "Every move you make" },
  { time: 154.53, text: "And every vow you break" },
  { time: 158.60, text: "Every smile you fake" },
  { time: 160.62, text: "Every claim you stake" },
  { time: 162.61, text: "I'll be watching you" },
  { time: 166.73, text: "Every move you make" },
  { time: 168.79, text: "Every step you take" },
  { time: 170.80, text: "I'll be watching you" },
  { time: 179.34, text: "I'll be watching you" },
  { time: 181.17, text: "Every breath you take, every move you make" },
  { time: 185.20, text: "Every bond you break, every step you take" },
  { time: 187.52, text: "I'll be watching you" },
  { time: 189.34, text: "Every single day, every word you say" },
  { time: 193.33, text: "Every game you play, every night you stay" },
  { time: 195.62, text: "I'll be watching you" },
  { time: 197.47, text: "Every move you make, every vow you break" },
  { time: 201.49, text: "Every smile you fake, every claim you stake" },
  { time: 203.86, text: "I'll be watching you" },
  { time: 205.69, text: "Every single day, every word you say" },
  { time: 209.65, text: "Every game you play, every night you stay" },
  { time: 212.01, text: "I'll be watching you" },
  { time: 213.88, text: "Every breath you take, every move you make" },
  { time: 217.86, text: "Every bond you break, every step you take" },
  { time: 220.21, text: "I'll be watching you" },
  { time: 221.98, text: "Every single day, every word you say" },
  { time: 226.08, text: "Every game you play, every night you stay" },
  { time: 228.43, text: "I'll be watching you" },
  { time: 230.19, text: "Every move you make, every vow you break" },
  { time: 234.29, text: "Every smile you fake, every claim you stake" },
  { time: 236.62, text: "I'll be watching you" },
  { time: 238.47, text: "Every single day, every word you say" },
  { time: 242.48, text: "Every game you play, every night you stay" },
];

export default function MonthsaryPage() {
  const [isEnvelopeOpened, setIsEnvelopeOpened] = useState(false);
  const [isEnvelopeAnimating, setIsEnvelopeAnimating] = useState(false);
  const [confetti, setConfetti] = useState<ReturnType<typeof makeConfetti>>([]);
  const [revealedItems, setRevealedItems] = useState<Set<number>>(new Set());
  const [mediaIndex, setMediaIndex] = useState(0);
  const [isGiftOpened, setIsGiftOpened] = useState(false);
  const [isAnimatingGift, setIsAnimatingGift] = useState(false);

  const audioRef = useRef<HTMLAudioElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const autoAdvanceTimerRef = useRef<NodeJS.Timeout | null>(null);

  const handleOpenEnvelope = () => {
    if (isEnvelopeAnimating) return;
    setIsEnvelopeAnimating(true);
    setConfetti(makeConfetti(100));
    setTimeout(() => {
      setIsEnvelopeOpened(true);
    }, 1000);
  };

  const handleReveal = (index: number) => {
    setRevealedItems(prev => new Set(prev).add(index));
  };

  const nextMedia = () => {
    setMediaIndex((prev) => (prev + 1) % MONTHSARY_MEDIA.length);
  };

  const prevMedia = () => {
    setMediaIndex((prev) => (prev - 1 + MONTHSARY_MEDIA.length) % MONTHSARY_MEDIA.length);
  };

  const startAutoAdvanceTimer = () => {
    if (autoAdvanceTimerRef.current) {
      clearTimeout(autoAdvanceTimerRef.current);
    }
    autoAdvanceTimerRef.current = setTimeout(() => {
      nextMedia();
    }, 3000);
  };

  const handleVideoEnded = () => {
    startAutoAdvanceTimer();
  };

  useEffect(() => {
    if (!isGiftOpened) return;

    const currentMedia = MONTHSARY_MEDIA[mediaIndex];
    
    if (currentMedia.type === "image") {
      startAutoAdvanceTimer();
    }

    return () => {
      if (autoAdvanceTimerRef.current) {
        clearTimeout(autoAdvanceTimerRef.current);
      }
    };
  }, [mediaIndex, isGiftOpened]);

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
    <div className="monthsary-page">
      {/* Confetti overlay */}
      <div className="confetti-layer" aria-hidden style={{ zIndex: 1000, pointerEvents: "none" }}>
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

      {!isEnvelopeOpened ? (
        <div className="envelope-scene">
          <div className={`gift-envelope ${isEnvelopeAnimating ? 'opening' : ''}`} onClick={handleOpenEnvelope}>
            {/* Ribbon */}
            <div className="ribbon-vertical"></div>
            <div className="ribbon-horizontal"></div>
            <div className="ribbon-bow">
              <div className="bow-left"></div>
              <div className="bow-right"></div>
              <div className="bow-center"></div>
            </div>
            
            {/* Envelope */}
            <div className="envelope-container">
              <div className="envelope-back"></div>
              <div className="envelope-front"></div>
              <div className="envelope-flap"></div>
              
              {/* Letter peek */}
              <div className="letter-peek">
                <div className="letter-edge">
                  <span className="peek-text">For My Beiby 💗</span>
                </div>
              </div>
            </div>
          </div>
          
          <p className="envelope-instruction">
            <span className="instruction-icon">✨</span>
            Click to open your special gift
            <span className="instruction-icon">✨</span>
          </p>
        </div>
      ) : (
        <div className={` ${isEnvelopeOpened ? 'revealed' : ''}`}>
          <div className="monthsary-card">
        <div className="monthsary-header">
          <h1 className="monthsary-title">Happy First Monthsary, Beiby!!</h1>
        </div>

        <div className="monthsary-message">
          <p className="message-greeting">Hi Beiby,</p>
          
          <p>Happy first monthsary, Beiby! Alam mo ba, madalas akong tanungin kung ano ang nagustuhan ko sa’yo, at every time I try to answer, I realize ang dami kong gustong sabihin. Talagang hindi ko alam kung saan ko uumpisahan because there are so many little things about you that make me smile, make me laugh, and make me feel so lucky. Kaya I decided to make a list, para kahit papaano, maipakita ko sa’yo lahat ng reasons kung bakit I love you and why I feel so grateful to have you in my life.</p>
          
          <ol className="love-list">
            <li>I LOVE how cute you are whenever you lose your vape and try to find it.</li>
            <li>I LOVE it when you skip songs halfway.</li>
            <li>I LOVE your cooking, asawahin na kita niyan, sige ka.</li>
            <li>I LOVE how appreciative you are sa lahat ng ginagawa ko, even the small things I don't notice.</li>
            <li>I LOVE the fact na hindi ka maarte; you're always okay with what we have and what we can do right now.</li>
            <li>I LOVE how you think of me before deciding on something for yourself. This melts my heart every time.</li>
            <li>I LOVE how you take care of me and even scold me sometimes because you care.</li>
            <li>I LOVE it kapag sinisipag ka bigla gawin yung isang bagay randomly.</li>
            <li>I LOVE how you introduce me to your friends.</li>
            <li>I LOVE how PROUD you are of having ME.</li>
            <li>MANY MOREEE (Di ko na imention yung iba, baka masyado na lumaki ulo mo Beiby)</li>
          </ol>

          <p className="spg-header">SPG: <span className="spg-hint">(Click to reveal)</span></p>
          
          <ol className="spg-list">
            {SPG_ITEMS.map((item, index) => (
              <li
                key={index}
                className={`spg-item ${revealedItems.has(index) ? 'revealed' : 'blurred'}`}
                onClick={() => handleReveal(index)}
                role="button"
                tabIndex={0}
                onKeyPress={(e) => e.key === 'Enter' && handleReveal(index)}
              >
                {item}
              </li>
            ))}
          </ol>

          <p>
            But kidding aside, Beiby, you really do complete me in a way I didn't expect. Being with you feels so natural, so right, and I'm genuinely grateful every single day that I get to call you mine. I will never take for granted the privilege you gave me to have YOU, to love you, and to be loved by you.
            <br /><br />
            I know I can be naughty or hardheaded sometimes, makulit and pasaway here and there, but please know that everything I do comes from a place of love. I'm still learning, still growing, but one thing I'm always sure of is how much you mean to me. I'll keep trying to be better for you, for us.
            <br /><br />
            Thank you for being you, for your patience, your love, and for choosing me every day. I may not always say it perfectly, but I hope you feel it in everything I do. I LOVE YOU SO MUCH, and I always will.
            <br /><br />
            P.S. I thought of eating seafood sa monthsary natin since hindi natuloy nung last time, if hindi ulit matuloy, suntukin mo ako sa tyan HAHAHAH
          </p>
        </div>

        <div className="surprise-section">
          <h3 className="surprise-title">Moments during our first month together</h3>
          
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
              {MONTHSARY_MEDIA.length > 0 && (
                <>
                  <button className="slide-btn prev" onClick={prevMedia} aria-label="Previous media">
                    &#10094;
                  </button>
                  <div className="slide-content">
                    {MONTHSARY_MEDIA[mediaIndex].type === "image" ? (
                      <img
                        src={MONTHSARY_MEDIA[mediaIndex].src}
                        alt={MONTHSARY_MEDIA[mediaIndex].alt}
                        className="slide-media"
                      />
                    ) : (
                      <video
                        ref={videoRef}
                        src={MONTHSARY_MEDIA[mediaIndex].src}
                        className="slide-media"
                        autoPlay
                        loop={false}
                        muted
                        playsInline
                        onEnded={handleVideoEnded}
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
              src="/first-month/The Police - Every Breath You Take (Lyrics).mp3"
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
        </div>
      )}
    </div>
  );
}
