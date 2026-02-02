import { useState } from 'react';
import { Heart } from 'lucide-react';
import FloatingHeart from '@/components/FloatingHeart';

const romanticMessages = [
    "You make my heart skip a beat! 💕",
    "Every moment with you is magical! ✨",
    "You're the best thing that ever happened to me! 💖",
    "I fall for you more every single day! 🌹",
    "You light up my world like nobody else! 🌟",
    "Being with you feels like a dream come true! 💫",
    "You're my favorite person in the whole world! 💝",
    "My heart belongs to you, today and always! ❤️",
    "You make everything better just by being you! 🥰",
    "I'm so lucky to have you in my life! 🍀",
    "You're the reason I believe in love! 💗",
    "Forever grateful for your love and kindness! 🌸",
    "You complete me in every way! 💞",
    "Can't wait to make more memories with you! 📸",
    "You're my sunshine on cloudy days! ☀️",
    "With you, every day is Valentine's Day! 💝",
    "You're the missing piece to my puzzle! 🧩",
    "My love for you grows stronger each day! 🌺",
    "You're my happily ever after! 👑",
    "Together is my favorite place to be! 🏡",
    "You're the melody to my heart's song! 🎵",
    "I choose you, today and always! 💍",
    "You're my greatest adventure! 🗺️",
    "Forever isn't long enough with you! ⏰",
];

interface FloatingMessage {
    id: number;
    text: string;
    x: number;
    y: number;
    rotation: number;
    delay: number;
}

export default function CelebrationPage() {
    const [isEnvelopeOpen, setIsEnvelopeOpen] = useState(false);
    const [floatingMessages, setFloatingMessages] = useState<FloatingMessage[]>([]);
    const [burstHearts, setBurstHearts] = useState<Array<{ id: number; x: number; delay: number; duration: number }>>([]);

    const handleEnvelopeClick = () => {
        if (isEnvelopeOpen) return;

        setIsEnvelopeOpen(true);

        // Generate 10 random messages
        const selectedMessages: FloatingMessage[] = [];
        const usedIndices = new Set<number>();

        while (selectedMessages.length < 10) {
            const randomIndex = Math.floor(Math.random() * romanticMessages.length);
            if (!usedIndices.has(randomIndex)) {
                usedIndices.add(randomIndex);
                selectedMessages.push({
                    id: selectedMessages.length,
                    text: romanticMessages[randomIndex],
                    x: 30 + Math.random() * 40, // Spread across 30-70% of screen width
                    y: 20 + Math.random() * 60, // Spread across 20-80% of screen height
                    rotation: (Math.random() - 0.5) * 30, // Random rotation between -15 and 15 degrees
                    delay: selectedMessages.length * 0.15, // Stagger the appearance
                });
            }
        }

        setFloatingMessages(selectedMessages);

        // Generate burst of hearts
        const heartArray = Array.from({ length: 40 }, (_, i) => ({
            id: i,
            x: Math.random() * 100,
            delay: Math.random() * 2,
            duration: Math.random() * 3 + 4,
        }));
        setBurstHearts(heartArray);
    };

    return (
        <div className="relative min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-pink-200 via-rose-200 to-red-200 dark:from-pink-900 dark:via-rose-900 dark:to-red-900 overflow-hidden">
            {/* Animated background hearts */}
            {isEnvelopeOpen && (
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    {burstHearts.map((heart) => (
                        <FloatingHeart
                            key={heart.id}
                            x={heart.x}
                            delay={heart.delay}
                            duration={heart.duration}
                        />
                    ))}
                </div>
            )}

            {/* Main content */}
            <div className="relative z-10 text-center px-4 max-w-4xl animate-fade-in">
                {!isEnvelopeOpen ? (
                    <>
                        <h1 className="text-4xl md:text-6xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-pink-600 via-red-500 to-rose-600 dark:from-pink-300 dark:via-red-300 dark:to-rose-300">
                            You said Yes! 💖
                        </h1>
                        <p className="text-xl md:text-2xl text-foreground/80 mb-12">
                            Click the envelope to reveal your special messages...
                        </p>
                    </>
                ) : (
                    <h1 className="text-4xl md:text-6xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-pink-600 via-red-500 to-rose-600 dark:from-pink-300 dark:via-red-300 dark:to-rose-300">
                        Happy Valentine's Day! 💝
                    </h1>
                )}

                {/* Envelope */}
                <div 
                    className={`relative mx-auto cursor-pointer transition-all duration-500 ${
                        isEnvelopeOpen ? 'scale-90 opacity-80' : 'hover:scale-105'
                    }`}
                    onClick={handleEnvelopeClick}
                    style={{ width: '400px', height: '300px', maxWidth: '90vw' }}
                >
                    <img
                        src={isEnvelopeOpen ? '/assets/generated/envelope-opened.dim_400x300.png' : '/assets/generated/envelope-closed.dim_400x300.png'}
                        alt={isEnvelopeOpen ? 'Opened envelope' : 'Closed envelope'}
                        className={`w-full h-full object-contain transition-all duration-700 ${
                            isEnvelopeOpen ? 'animate-envelope-open' : ''
                        }`}
                    />
                </div>

                {/* Floating messages */}
                {isEnvelopeOpen && floatingMessages.map((message) => (
                    <div
                        key={message.id}
                        className="absolute bg-white/95 dark:bg-pink-950/95 backdrop-blur-sm rounded-2xl p-4 shadow-2xl border-2 border-pink-300 dark:border-pink-700 animate-message-float"
                        style={{
                            left: `${message.x}%`,
                            top: `${message.y}%`,
                            transform: `translate(-50%, -50%) rotate(${message.rotation}deg)`,
                            animationDelay: `${message.delay}s`,
                            maxWidth: '280px',
                            minWidth: '200px',
                        }}
                    >
                        <p className="text-sm md:text-base font-semibold text-foreground">
                            {message.text}
                        </p>
                    </div>
                ))}
            </div>

            {/* Footer */}
            <footer className="absolute bottom-4 left-0 right-0 text-center text-sm text-foreground/60">
                <p>
                    © 2025. Built with <Heart className="inline w-4 h-4 text-red-500" fill="currentColor" /> using{' '}
                    <a
                        href="https://caffeine.ai"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline hover:text-foreground transition-colors"
                    >
                        caffeine.ai
                    </a>
                </p>
            </footer>
        </div>
    );
}
