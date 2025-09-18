import { useState, useRef, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { X, Gift, Copy, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ScratchCardProps {
  isOpen: boolean;
  onClose: () => void;
  reward: {
    type: 'coupon' | 'offer' | 'cashback';
    value: string;
    code?: string;
  };
}

const ScratchCard = ({ isOpen, onClose, reward }: ScratchCardProps) => {
  const [isScratched, setIsScratched] = useState(false);
  const [isScratching, setIsScratching] = useState(false);
  const [copied, setCopied] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mouseDown, setMouseDown] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsScratched(false);
      setCopied(false);
    }
  }, [isOpen]);

  const handleMouseDown = () => {
    setMouseDown(true);
    setIsScratching(true);
  };

  const handleMouseUp = () => {
    setMouseDown(false);
    setIsScratching(false);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!mouseDown || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Create circular scratch effect
    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 20, 0, Math.PI * 2);
    ctx.fill();

    // Check if enough area is scratched
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = imageData.data;
    let transparentPixels = 0;
    
    for (let i = 3; i < pixels.length; i += 4) {
      if (pixels[i] === 0) transparentPixels++;
    }
    
    const scratchedPercentage = (transparentPixels / (pixels.length / 4)) * 100;
    
    if (scratchedPercentage > 30) {
      setIsScratched(true);
    }
  };

  const copyCode = async () => {
    if (reward.code) {
      try {
        await navigator.clipboard.writeText(reward.code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error('Failed to copy:', err);
      }
    }
  };

  const getRewardIcon = () => {
    switch (reward.type) {
      case 'coupon':
        return '🎫';
      case 'offer':
        return '🎁';
      case 'cashback':
        return '💰';
      default:
        return '🎉';
    }
  };

  const getRewardColor = () => {
    switch (reward.type) {
      case 'coupon':
        return 'from-yellow-400 to-orange-500';
      case 'offer':
        return 'from-pink-400 to-purple-500';
      case 'cashback':
        return 'from-green-400 to-emerald-500';
      default:
        return 'from-blue-400 to-indigo-500';
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-lg bg-gradient-to-br from-purple-600 to-pink-600 text-white border-0 shadow-2xl">
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <Gift className="w-6 h-6" />
              Congratulations! 🎉
            </h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-white hover:bg-white/20"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>

          <div className="text-center mb-6">
            <div className="text-4xl mb-2">{getRewardIcon()}</div>
            <p className="text-lg font-semibold mb-2">You've earned a reward!</p>
            <p className="text-sm opacity-90">Scratch the card below to reveal your prize</p>
          </div>

          <div className="relative mb-6">
            <div className="bg-gradient-to-br from-yellow-300 to-orange-400 rounded-lg p-6 text-center min-h-[140px] flex flex-col justify-center">
              <div className="text-3xl font-bold text-gray-800 mb-2">
                {isScratched ? '🎉' : '???'}
              </div>
              <div className="text-xl font-semibold text-gray-800 mb-2">
                {isScratched ? reward.value : 'Scratch to reveal'}
              </div>
              {isScratched && reward.code && (
                <div className="mt-3 p-3 bg-white/90 rounded-lg text-gray-800 border-2 border-dashed border-gray-400">
                  <div className="text-sm text-gray-600 mb-1">Your Code:</div>
                  <div className="text-lg font-mono font-bold">{reward.code}</div>
                </div>
              )}
            </div>

            {!isScratched && (
              <canvas
                ref={canvasRef}
                width={400}
                height={140}
                className="absolute inset-0 cursor-crosshair rounded-lg"
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseUp}
                style={{
                  background: 'linear-gradient(45deg, #c0c0c0 25%, transparent 25%), linear-gradient(-45deg, #c0c0c0 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #c0c0c0 75%), linear-gradient(-45deg, transparent 75%, #c0c0c0 75%)',
                  backgroundSize: '20px 20px',
                  backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px'
                }}
              />
            )}
          </div>

          {isScratched && (
            <div className="space-y-3">
              <div className="text-center">
                <p className="text-sm opacity-90 mb-2">Your reward:</p>
                <div className={cn(
                  "bg-gradient-to-r text-white px-4 py-2 rounded-lg font-semibold",
                  getRewardColor()
                )}>
                  {reward.value}
                </div>
              </div>

              {reward.code && (
                <Button
                  onClick={copyCode}
                  className="w-full bg-white/20 hover:bg-white/30 text-white border-white/30"
                  variant="outline"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 mr-2" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 mr-2" />
                      Copy Code
                    </>
                  )}
                </Button>
              )}

              <Button
                onClick={onClose}
                className="w-full bg-white text-purple-600 hover:bg-gray-100 font-semibold"
              >
                Claim Reward
              </Button>
            </div>
          )}

          {!isScratched && (
            <div className="text-center text-sm opacity-75">
              <p>Use your mouse to scratch the card and reveal your reward!</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ScratchCard;
