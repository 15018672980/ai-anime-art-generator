import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import confetti from 'canvas-confetti';

interface ProgressImageProps {
    src: string;
    alt: string;
    width: number;
    height: number;
    showOverlay: boolean;
    durationInSeconds: number;
    triggerConfetti: number;  // 新增的参数
}

const ProgressImage: React.FC<ProgressImageProps> = ({
    src,
    alt,
    width,
    height,
    showOverlay,
    durationInSeconds,
    triggerConfetti,  // 新增的参数
}) => {
    const [progress, setProgress] = useState(0);

    const [triggerConfettiOld, setTriggerConfettiOld] = useState<Number | null>(0);
    

    useEffect(() => {
        let interval: NodeJS.Timeout;

        if (showOverlay) {
            const step = 99 / (durationInSeconds * 10);
            interval = setInterval(() => {
                setProgress((prevProgress) => {
                    if (prevProgress >= 99) {
                        clearInterval(interval);
                        return 99;
                    }
                    return Math.min(prevProgress + step, 99);
                });
            }, 100);
        } else {
            setProgress(0);
        }

        return () => {
            if (interval) clearInterval(interval);
        };
    }, [showOverlay, durationInSeconds]);

    useEffect(() => {
        if (triggerConfetti!=triggerConfettiOld) {
            setTriggerConfettiOld(triggerConfetti)
            confetti({
                particleCount: 100,
                spread: 160,
                origin: { y: 0.6 },
            });
        }
    }, [triggerConfetti]);

    return (
        <>
              <Image
                src={src}
                alt={alt}
                unoptimized={true}
                layout="fill"
                objectFit="contain"
                className="rounded-lg"
            />
            {showOverlay && (
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-end">
                    <div className="w-full p-4">
                        <div className="mb-2 h-4 rounded-full bg-gray-200 relative">
                            <div
                                className="h-full rounded-full bg-orange-500 transition-all duration-100 ease-linear"
                                style={{ width: `${progress}%` }}
                            ></div>
                            <div className="absolute inset-0 flex items-center justify-center text-xs font-bold">
                                <span
                                    className={`transition-colors duration-200 ${progress >= 50 ? 'text-white' : 'text-blue-900'
                                        }`}
                                >
                                    {Math.round(progress)}%
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ProgressImage;
