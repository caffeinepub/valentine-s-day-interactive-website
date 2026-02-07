import { useEffect, useState } from 'react';
import { Heart } from 'lucide-react';

interface Firework {
    id: number;
    x: number;
    y: number;
    color: string;
    particles: Particle[];
}

interface Particle {
    id: number;
    angle: number;
    velocity: number;
    life: number;
}

const FIREWORK_COLORS = [
    'oklch(65% 0.25 350)', // Red
    'oklch(75% 0.20 340)', // Pink
    'oklch(85% 0.05 0)',   // Silver
    'oklch(70% 0.22 355)', // Rose
    'oklch(80% 0.15 345)', // Light pink
];

export default function FireworksPage() {
    const [fireworks, setFireworks] = useState<Firework[]>([]);

    useEffect(() => {
        const createFirework = () => {
            const x = Math.random() * 100;
            const y = 20 + Math.random() * 50; // Upper half of screen
            const color = FIREWORK_COLORS[Math.floor(Math.random() * FIREWORK_COLORS.length)];
            
            const particles: Particle[] = [];
            const particleCount = 30 + Math.floor(Math.random() * 20);
            
            for (let i = 0; i < particleCount; i++) {
                particles.push({
                    id: i,
                    angle: (Math.PI * 2 * i) / particleCount,
                    velocity: 2 + Math.random() * 3,
                    life: 1,
                });
            }

            const newFirework: Firework = {
                id: Date.now() + Math.random(),
                x,
                y,
                color,
                particles,
            };

            setFireworks(prev => [...prev, newFirework]);

            // Remove firework after animation completes
            setTimeout(() => {
                setFireworks(prev => prev.filter(fw => fw.id !== newFirework.id));
            }, 2000);
        };

        // Create initial burst of fireworks
        for (let i = 0; i < 3; i++) {
            setTimeout(() => createFirework(), i * 300);
        }

        // Continue creating fireworks at intervals
        const interval = setInterval(() => {
            createFirework();
            
            // Sometimes create multiple fireworks at once
            if (Math.random() > 0.7) {
                setTimeout(() => createFirework(), 200);
            }
        }, 800);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="relative min-h-screen w-full flex items-center justify-center bg-gradient-to-b from-gray-900 via-red-950 to-gray-900 overflow-hidden">
            {/* Fireworks container */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {fireworks.map((firework) => (
                    <div
                        key={firework.id}
                        className="absolute"
                        style={{
                            left: `${firework.x}%`,
                            top: `${firework.y}%`,
                        }}
                    >
                        {/* Launch trail */}
                        <div
                            className="absolute w-1 h-20 animate-firework-launch"
                            style={{
                                background: `linear-gradient(to top, ${firework.color}, transparent)`,
                                bottom: '0',
                                left: '50%',
                                transform: 'translateX(-50%)',
                            }}
                        />
                        
                        {/* Explosion particles */}
                        {firework.particles.map((particle) => (
                            <div
                                key={particle.id}
                                className="absolute w-2 h-2 rounded-full animate-firework-particle"
                                style={{
                                    backgroundColor: firework.color,
                                    boxShadow: `0 0 10px ${firework.color}, 0 0 20px ${firework.color}`,
                                    '--particle-angle': `${particle.angle}rad`,
                                    '--particle-velocity': particle.velocity,
                                } as React.CSSProperties}
                            />
                        ))}
                        
                        {/* Center burst glow */}
                        <div
                            className="absolute w-8 h-8 rounded-full animate-firework-burst"
                            style={{
                                backgroundColor: firework.color,
                                boxShadow: `0 0 30px ${firework.color}, 0 0 60px ${firework.color}`,
                                left: '50%',
                                top: '50%',
                                transform: 'translate(-50%, -50%)',
                            }}
                        />
                    </div>
                ))}
            </div>

            {/* Floating hearts decoration */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(15)].map((_, i) => (
                    <Heart
                        key={`heart-${i}`}
                        className="absolute text-pink-400/30 animate-float-slow"
                        size={Math.random() * 40 + 20}
                        fill="currentColor"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 5}s`,
                            animationDuration: `${Math.random() * 10 + 15}s`,
                        }}
                    />
                ))}
            </div>

            {/* Centered romantic text */}
            <div className="relative z-10 animate-fade-in-slow">
                <h1 className="text-6xl md:text-8xl font-bold text-center text-white drop-shadow-2xl animate-pulse-slow px-4"
                    style={{
                        textShadow: '0 0 40px oklch(75% 0.20 340), 0 0 80px oklch(65% 0.25 350), 0 4px 20px rgba(0, 0, 0, 0.5)',
                    }}>
                    Bye Bye my sweet little Boo Boo
                </h1>
            </div>

            {/* Footer */}
            <footer className="absolute bottom-4 left-0 right-0 text-center text-sm text-white/60 z-30">
                <p>
                    © 2025. Built with <Heart className="inline w-4 h-4 text-pink-400" fill="currentColor" /> using{' '}
                    <a
                        href="https://caffeine.ai"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline hover:text-white/80 transition-colors"
                    >
                        caffeine.ai
                    </a>
                </p>
            </footer>
        </div>
    );
}
