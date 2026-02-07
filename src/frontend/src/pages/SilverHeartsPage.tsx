import { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';
import AnimatedJar from '@/components/AnimatedJar';
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
];

interface DisplayedMessage {
    id: number;
    text: string;
    x: number;
    y: number;
    rotation: number;
    isCenter: boolean;
}

interface SilverHeartsPageProps {
    onFireworksTransition: () => void;
}

export default function SilverHeartsPage({ onFireworksTransition }: SilverHeartsPageProps) {
    const [isJarOpen, setIsJarOpen] = useState(false);
    const [lidAnimationComplete, setLidAnimationComplete] = useState(false);
    const [displayedMessages, setDisplayedMessages] = useState<DisplayedMessage[]>([]);
    const [usedMessageIndices, setUsedMessageIndices] = useState<Set<number>>(new Set());
    const [burstHearts, setBurstHearts] = useState<Array<{ id: number; x: number; delay: number; duration: number }>>([]);
    const [clickCount, setClickCount] = useState(0);

    // Track when lid animation completes (1.2s to match CSS animation)
    useEffect(() => {
        if (isJarOpen) {
            const timer = setTimeout(() => {
                setLidAnimationComplete(true);
            }, 1200);
            return () => clearTimeout(timer);
        }
    }, [isJarOpen]);

    const getRandomPosition = (existingMessages: DisplayedMessage[]) => {
        const margin = 10; // percentage from edges
        const maxAttempts = 50;
        
        for (let i = 0; i < maxAttempts; i++) {
            const x = margin + Math.random() * (100 - 2 * margin);
            const y = margin + Math.random() * (100 - 2 * margin);
            
            // Check if position is far enough from existing messages
            const isFarEnough = existingMessages.every(msg => {
                if (msg.isCenter) return true; // Skip center message in collision check
                const distance = Math.sqrt(Math.pow(x - msg.x, 2) + Math.pow(y - msg.y, 2));
                return distance > 20; // Minimum distance in percentage
            });
            
            if (isFarEnough) {
                return { x, y };
            }
        }
        
        // Fallback to random position if no good spot found
        return {
            x: margin + Math.random() * (100 - 2 * margin),
            y: margin + Math.random() * (100 - 2 * margin)
        };
    };

    const handleJarClick = () => {
        if (!isJarOpen) {
            // First click - open jar
            setIsJarOpen(true);
            setClickCount(1);
            
            // Generate burst of hearts
            const heartArray = Array.from({ length: 50 }, (_, i) => ({
                id: i,
                x: Math.random() * 100,
                delay: Math.random() * 2,
                duration: Math.random() * 3 + 5,
            }));
            setBurstHearts(heartArray);
        } else if (lidAnimationComplete) {
            // Subsequent clicks - check if we should transition to fireworks
            const newClickCount = clickCount + 1;
            setClickCount(newClickCount);

            // After 11th click (1 for opening + 10 for messages), transition to fireworks
            if (newClickCount > 10) {
                onFireworksTransition();
                return;
            }

            // Show new message
            if (usedMessageIndices.size >= romanticMessages.length) {
                // All messages shown, reset
                setUsedMessageIndices(new Set());
            }
            
            // Find unused message
            let randomIndex;
            do {
                randomIndex = Math.floor(Math.random() * romanticMessages.length);
            } while (usedMessageIndices.has(randomIndex));
            
            setUsedMessageIndices(prev => new Set([...prev, randomIndex]));
            
            // Move current center message to random position
            const updatedMessages = displayedMessages.map(msg => {
                if (msg.isCenter) {
                    const newPos = getRandomPosition(displayedMessages.filter(m => !m.isCenter));
                    return {
                        ...msg,
                        x: newPos.x,
                        y: newPos.y,
                        rotation: (Math.random() - 0.5) * 15,
                        isCenter: false,
                    };
                }
                return msg;
            });
            
            // Add new message in center
            const newMessage: DisplayedMessage = {
                id: Date.now(),
                text: romanticMessages[randomIndex],
                x: 50,
                y: 50,
                rotation: 0,
                isCenter: true,
            };
            
            setDisplayedMessages([...updatedMessages, newMessage]);
        }
    };

    return (
        <div className="relative min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-red-600 via-red-500 to-rose-600 dark:from-red-700 dark:via-red-600 dark:to-rose-700 overflow-hidden">
            {/* Silver sparkling hearts background - continuous throughout */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
                {[...Array(30)].map((_, i) => (
                    <Heart
                        key={`silver-${i}`}
                        className="absolute text-gray-300 dark:text-gray-400 animate-sparkle"
                        size={Math.random() * 50 + 20}
                        fill="currentColor"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 3}s`,
                            animationDuration: `${Math.random() * 2 + 2}s`,
                            filter: 'drop-shadow(0 0 8px rgba(255, 255, 255, 0.6))',
                        }}
                    />
                ))}
            </div>

            {/* Animated background hearts - burst effect after jar opens */}
            {isJarOpen && (
                <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
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
                <div className="max-w-4xl mx-auto">
                    {/* Animated jar */}
                    <div className="flex flex-col items-center">
                        <AnimatedJar 
                            isOpen={isJarOpen} 
                            onClick={handleJarClick}
                            isClickable={!isJarOpen || lidAnimationComplete}
                        />
                    </div>
                </div>

                {/* Displayed messages */}
                {displayedMessages.map((message) => (
                    <div
                        key={message.id}
                        className={`fixed bg-white/95 dark:bg-pink-950/95 backdrop-blur-sm rounded-2xl p-4 shadow-2xl border-2 border-pink-300 dark:border-pink-700 z-20 ${
                            message.isCenter ? 'animate-message-center-appear' : 'animate-message-reposition'
                        }`}
                        style={{
                            left: `${message.x}%`,
                            top: `${message.y}%`,
                            transform: `translate(-50%, -50%) rotate(${message.rotation}deg)`,
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
            <footer className="absolute bottom-4 left-0 right-0 text-center text-sm text-white/80 z-30">
                <p>
                    © 2025. Built with <Heart className="inline w-4 h-4 text-pink-300" fill="currentColor" /> using{' '}
                    <a
                        href="https://caffeine.ai"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline hover:text-white transition-colors"
                    >
                        caffeine.ai
                    </a>
                </p>
            </footer>
        </div>
    );
}
