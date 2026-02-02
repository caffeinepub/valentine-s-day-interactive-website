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

        // Generate 10 random messages spread dynamically across full screen
        const selectedMessages: FloatingMessage[] = [];
        const usedIndices = new Set<number>();

        // Define grid-based positions to ensure visibility and no overlap
        // Divide screen into regions with safe spacing
        const positions = [
            { x: 10, y: 10 },   // Top-left
            { x: 50, y: 8 },    // Top-center
            { x: 90, y: 10 },   // Top-right
            { x: 8, y: 35 },    // Mid-left
            { x: 92, y: 35 },   // Mid-right
            { x: 10, y: 60 },   // Lower-left
            { x: 50, y: 55 },   // Lower-center
            { x: 90, y: 60 },   // Lower-right
            { x: 30, y: 30 },   // Center-left
            { x: 70, y: 30 },   // Center-right
        ];

        while (selectedMessages.length < 10) {
            const randomIndex = Math.floor(Math.random() * romanticMessages.length);
            if (!usedIndices.has(randomIndex)) {
                usedIndices.add(randomIndex);
                const position = positions[selectedMessages.length];
                selectedMessages.push({
                    id: selectedMessages.length,
                    text: romanticMessages[randomIndex],
                    x: position.x,
                    y: position.y,
                    rotation: (Math.random() - 0.5) * 15, // Random rotation between -7.5 and 7.5 degrees
                    delay: selectedMessages.length * 0.15, // Stagger the appearance
                });
            }
        }

        setFloatingMessages(selectedMessages);

        // Generate burst of hearts that continue throughout
        const heartArray = Array.from({ length: 50 }, (_, i) => ({
            id: i,
            x: Math.random() * 100,
            delay: Math.random() * 2,
            duration: Math.random() * 3 + 5,
        }));
        setBurstHearts(heartArray);
    };

    return (
        <div className="relative min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-pink-200 via-rose-200 to-red-200 dark:from-pink-900 dark:via-rose-900 dark:to-red-900 overflow-hidden">
            {/* Animated background hearts - continue throughout */}
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
            <div className="relative z-10 text-center px-4 w-full animate-fade-in">
                {!isEnvelopeOpen ? (
                    <div className="max-w-4xl mx-auto">
                        <h1 className="text-4xl md:text-6xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-pink-600 via-red-500 to-rose-600 dark:from-pink-300 dark:via-red-300 dark:to-rose-300">
                            You said Yes! 💖
                        </h1>
                        <p className="text-xl md:text-2xl text-foreground/80 mb-12">
                            Click the envelope to reveal your special messages...
                        </p>
                        
                        {/* Envelope */}
                        <div 
                            className="relative mx-auto cursor-pointer transition-all duration-500 hover:scale-105"
                            onClick={handleEnvelopeClick}
                            style={{ width: '400px', height: '300px', maxWidth: '90vw' }}
                        >
                            <img
                                src="/assets/generated/envelope-closed.dim_400x300.png"
                                alt="Closed envelope"
                                className="w-full h-full object-contain"
                            />
                        </div>
                    </div>
                ) : (
                    <div className="max-w-3xl mx-auto">
                        {/* Enlarged main card with plain background and single centered heart */}
                        <div className="bg-white dark:bg-pink-950 rounded-3xl p-16 shadow-2xl border-4 border-pink-300 dark:border-pink-700">
                            <div className="flex flex-col items-center justify-center space-y-8">
                                {/* Single centered heart graphic - larger */}
                                <Heart className="w-32 h-32 text-red-500 animate-pulse-heart" fill="currentColor" />
                                
                                {/* Card text */}
                                <p className="text-3xl md:text-4xl font-bold text-foreground text-center leading-relaxed">
                                    I knew you would say yes. I love you baby.
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Floating messages spread across full screen */}
                {isEnvelopeOpen && floatingMessages.map((message) => (
                    <div
                        key={message.id}
                        className="fixed bg-white/95 dark:bg-pink-950/95 backdrop-blur-sm rounded-2xl p-4 shadow-2xl border-2 border-pink-300 dark:border-pink-700 animate-message-float z-20"
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
            <footer className="absolute bottom-4 left-0 right-0 text-center text-sm text-foreground/60 z-30">
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
