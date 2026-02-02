import { Heart } from 'lucide-react';

interface FloatingHeartProps {
    x: number;
    delay: number;
    duration: number;
}

export default function FloatingHeart({ x, delay, duration }: FloatingHeartProps) {
    const size = Math.random() * 30 + 20;
    const isRed = Math.random() > 0.5;

    return (
        <div
            className="absolute animate-float"
            style={{
                left: `${x}%`,
                bottom: '-50px',
                animationDelay: `${delay}s`,
                animationDuration: `${duration}s`,
            }}
        >
            <Heart
                className={`${isRed ? 'text-red-400 dark:text-red-500' : 'text-pink-400 dark:text-pink-500'} opacity-60`}
                size={size}
                fill="currentColor"
            />
        </div>
    );
}

