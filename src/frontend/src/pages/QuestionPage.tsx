import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Heart } from 'lucide-react';

interface QuestionPageProps {
    onYes: () => void;
}

export default function QuestionPage({ onYes }: QuestionPageProps) {
    const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 });
    const [showHeading, setShowHeading] = useState(false);
    const noButtonRef = useRef<HTMLButtonElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!noButtonRef.current || !containerRef.current || showHeading) return;

            const buttonRect = noButtonRef.current.getBoundingClientRect();
            const buttonCenterX = buttonRect.left + buttonRect.width / 2;
            const buttonCenterY = buttonRect.top + buttonRect.height / 2;

            const distance = Math.sqrt(
                Math.pow(e.clientX - buttonCenterX, 2) + Math.pow(e.clientY - buttonCenterY, 2)
            );

            // If cursor is within 150px of the button, move it away
            if (distance < 150) {
                const containerRect = containerRef.current.getBoundingClientRect();
                const maxX = containerRect.width - buttonRect.width - 100;
                const maxY = containerRect.height - buttonRect.height - 100;

                // Calculate direction away from cursor
                const angle = Math.atan2(buttonCenterY - e.clientY, buttonCenterX - e.clientX);
                
                // Add some randomness to make it more unpredictable
                const randomAngle = angle + (Math.random() - 0.5) * Math.PI / 2;
                const moveDistance = 150 + Math.random() * 100;

                let newX = Math.cos(randomAngle) * moveDistance;
                let newY = Math.sin(randomAngle) * moveDistance;

                // Keep button within bounds
                newX = Math.max(-maxX / 2, Math.min(maxX / 2, newX));
                newY = Math.max(-maxY / 2, Math.min(maxY / 2, newY));

                setNoButtonPosition({ x: newX, y: newY });
            }
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [showHeading]);

    const handleYesClick = () => {
        setShowHeading(true);
        // Transition to celebration page after showing heading
        setTimeout(() => {
            onYes();
        }, 2500);
    };

    return (
        <div 
            ref={containerRef}
            className="relative min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-pink-100 via-rose-100 to-red-100 dark:from-pink-950 dark:via-rose-950 dark:to-red-950"
        >
            {/* Floating hearts background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(15)].map((_, i) => (
                    <Heart
                        key={i}
                        className="absolute text-pink-300 dark:text-pink-700 opacity-20 animate-float"
                        size={Math.random() * 40 + 20}
                        fill="currentColor"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 6}s`,
                            animationDuration: `${Math.random() * 4 + 4}s`,
                        }}
                    />
                ))}
            </div>

            {/* Main content */}
            <div className="relative z-10 text-center px-4 animate-fade-in">
                {showHeading ? (
                    <div className="animate-fade-in">
                        <div className="mb-8 flex justify-center">
                            <Heart
                                className="text-red-500 dark:text-red-400 animate-pulse-heart"
                                size={100}
                                fill="currentColor"
                            />
                        </div>
                        <h1 className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 via-red-500 to-rose-600 dark:from-pink-400 dark:via-red-400 dark:to-rose-400">
                            I knew you would say yes. I love you baby.
                        </h1>
                    </div>
                ) : (
                    <>
                        <div className="mb-8 flex justify-center">
                            <Heart
                                className="text-red-500 dark:text-red-400 animate-pulse-heart"
                                size={80}
                                fill="currentColor"
                            />
                        </div>

                        <h1 className="text-5xl md:text-7xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-pink-600 via-red-500 to-rose-600 dark:from-pink-400 dark:via-red-400 dark:to-rose-400">
                            Will you be my Valentine?
                        </h1>

                        <p className="text-xl md:text-2xl text-muted-foreground mb-12 font-medium">
                            Choose wisely... 💕
                        </p>

                        <div className="flex flex-col sm:flex-row gap-6 items-center justify-center">
                            <Button
                                size="lg"
                                onClick={handleYesClick}
                                className="text-xl px-12 py-8 rounded-2xl bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white shadow-2xl hover:shadow-pink-500/50 transition-all duration-300 hover:scale-110"
                            >
                                Yes! 💖
                            </Button>

                            <Button
                                ref={noButtonRef}
                                size="lg"
                                variant="outline"
                                className="text-xl px-12 py-8 rounded-2xl border-2 transition-all duration-200 cursor-pointer"
                                style={{
                                    transform: `translate(${noButtonPosition.x}px, ${noButtonPosition.y}px)`,
                                    transition: 'transform 0.2s ease-out',
                                }}
                                onClick={(e) => e.preventDefault()}
                            >
                                No
                            </Button>
                        </div>

                        <p className="mt-8 text-lg text-muted-foreground italic">
                            Try to click "No" if you dare... 😏
                        </p>
                    </>
                )}
            </div>

            {/* Footer */}
            <footer className="absolute bottom-4 left-0 right-0 text-center text-sm text-muted-foreground">
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
