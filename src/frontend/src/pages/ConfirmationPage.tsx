import { Button } from '@/components/ui/button';
import { Heart } from 'lucide-react';

interface ConfirmationPageProps {
    onButtonClick: () => void;
}

export default function ConfirmationPage({ onButtonClick }: ConfirmationPageProps) {
    return (
        <div className="relative min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-pink-100 via-rose-100 to-red-100 dark:from-pink-950 dark:via-rose-950 dark:to-red-950">
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
                <div className="mb-8 flex justify-center">
                    <Heart
                        className="text-red-500 dark:text-red-400 animate-pulse-heart"
                        size={80}
                        fill="currentColor"
                    />
                </div>

                <h1 className="text-4xl md:text-6xl font-bold mb-12 text-transparent bg-clip-text bg-gradient-to-r from-pink-600 via-red-500 to-rose-600 dark:from-pink-400 dark:via-red-400 dark:to-rose-400">
                    I knew you would say yes. I love you baby.
                </h1>

                <Button
                    size="lg"
                    onClick={onButtonClick}
                    className="text-xl px-12 py-8 rounded-2xl bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white shadow-2xl hover:shadow-pink-500/50 transition-all duration-300 hover:scale-110"
                >
                    Click here for receiving love 💖
                </Button>
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
