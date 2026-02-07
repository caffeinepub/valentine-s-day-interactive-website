import { Button } from '@/components/ui/button';
import { Heart, Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';

interface BrokenHeartPageProps {
    onTryAgain: () => void;
}

interface GiphyResponse {
    data: {
        images: {
            original: {
                url: string;
            };
        };
    };
}

export default function BrokenHeartPage({ onTryAgain }: BrokenHeartPageProps) {
    const [gifUrl, setGifUrl] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');
    const [animationType, setAnimationType] = useState<'fade' | 'bounce'>('fade');

    useEffect(() => {
        // Randomly select animation type
        setAnimationType(Math.random() > 0.5 ? 'fade' : 'bounce');

        // Fetch random sad GIF from Giphy
        const fetchGif = async () => {
            setIsLoading(true);
            setError('');
            
            try {
                const apiKey = 'GlVGYHkr3WSBnllca54iNt0yFbjz7L65'; // Public Giphy API key
                const response = await fetch(
                    `https://api.giphy.com/v1/gifs/random?tag=sad+cartoon+love+heartbroken&rating=g&api_key=${apiKey}`
                );

                if (!response.ok) {
                    throw new Error('Failed to fetch GIF from Giphy');
                }

                const data: GiphyResponse = await response.json();
                
                if (data.data && data.data.images && data.data.images.original) {
                    setGifUrl(data.data.images.original.url);
                } else {
                    throw new Error('Invalid response from Giphy');
                }
            } catch (err) {
                console.error('Error fetching GIF:', err);
                setError('Could not load GIF. Please try again.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchGif();
    }, []);

    return (
        <div className="relative min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-pink-100 via-rose-100 to-red-100 dark:from-pink-950 dark:via-rose-950 dark:to-red-950 overflow-hidden">
            {/* Floating hearts background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(12)].map((_, i) => (
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

            {/* Single centered animated GIF from Giphy */}
            <div className="relative z-10 mb-12 flex items-center justify-center min-h-[300px]">
                {isLoading && (
                    <div className="flex flex-col items-center gap-4">
                        <Loader2 className="w-16 h-16 text-pink-500 animate-spin" />
                        <p className="text-lg text-pink-600 dark:text-pink-400">Loading sad moment...</p>
                    </div>
                )}
                
                {error && (
                    <div className="flex flex-col items-center gap-4 max-w-md text-center">
                        <Heart className="w-16 h-16 text-red-500" fill="currentColor" />
                        <p className="text-lg text-red-600 dark:text-red-400">{error}</p>
                    </div>
                )}
                
                {!isLoading && !error && gifUrl && (
                    <img
                        src={gifUrl}
                        alt="Sad broken heart"
                        className={`max-w-md w-full h-auto object-contain ${
                            animationType === 'fade' ? 'animate-sticker-fade' : 'animate-sticker-bounce'
                        }`}
                        style={{
                            filter: 'drop-shadow(0 10px 20px rgba(0, 0, 0, 0.2))',
                        }}
                    />
                )}
            </div>

            {/* Try Again Button */}
            <div className="relative z-10 animate-fade-in" style={{ animationDelay: '0.5s' }}>
                <Button
                    size="lg"
                    onClick={onTryAgain}
                    className="text-2xl px-16 py-10 rounded-2xl bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white shadow-2xl hover:shadow-pink-500/50 transition-all duration-300 hover:scale-110"
                >
                    Try Again 💝
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
