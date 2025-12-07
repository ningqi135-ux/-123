import React from 'react';
import { AppState } from '../types';
import { Wind, Lightbulb, Pause, Play, Sparkles } from 'lucide-react';

interface OverlayProps {
    appState: AppState;
    setAppState: React.Dispatch<React.SetStateAction<AppState>>;
}

export const Overlay: React.FC<OverlayProps> = ({ appState, setAppState }) => {
    const toggleSnow = () => setAppState(prev => ({ ...prev, isSnowing: !prev.isSnowing }));
    const toggleSpin = () => setAppState(prev => ({ ...prev, spinSpeed: prev.spinSpeed === 0 ? 0.3 : 0 }));
    
    const handleBloomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAppState(prev => ({ ...prev, bloomIntensity: parseFloat(e.target.value) }));
    };

    return (
        <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-6 z-10 text-[#E5E4E2]">
            {/* Header */}
            <header className="flex flex-col items-center mt-4 opacity-0 animate-[fadeIn_1s_ease-out_forwards]">
                <h2 className="arix-sans text-xs tracking-[0.5em] text-gold uppercase mb-2 text-[#D4AF37]">The 2024 Collection</h2>
                <h1 className="arix-serif text-5xl md:text-7xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-[#FFF] to-[#D4AF37] drop-shadow-2xl">
                    ARIX
                </h1>
                <p className="arix-serif italic text-lg opacity-80 mt-2">Signature Interactive Tree</p>
            </header>

            {/* Controls */}
            <div className="pointer-events-auto flex flex-col items-center gap-6 mb-12">
                
                {/* Control Bar */}
                <div className="backdrop-blur-md bg-black/40 border border-[#D4AF37]/30 px-6 py-4 rounded-full flex items-center gap-8 shadow-[0_0_30px_rgba(0,0,0,0.5)] transition-all hover:bg-black/50 hover:border-[#D4AF37]/60">
                    
                    {/* Spin Toggle */}
                    <button 
                        onClick={toggleSpin} 
                        className="group flex flex-col items-center gap-1 focus:outline-none"
                        aria-label="Toggle Rotation"
                    >
                        <div className={`p-3 rounded-full border border-white/10 transition-all duration-300 ${appState.spinSpeed > 0 ? 'bg-[#D4AF37] text-black' : 'hover:bg-white/10 text-white'}`}>
                            {appState.spinSpeed > 0 ? <Pause size={20} /> : <Play size={20} />}
                        </div>
                        <span className="text-[10px] uppercase tracking-widest opacity-60 group-hover:opacity-100">Spin</span>
                    </button>

                    <div className="w-px h-8 bg-white/10" />

                    {/* Snow Toggle */}
                    <button 
                        onClick={toggleSnow} 
                        className="group flex flex-col items-center gap-1 focus:outline-none"
                    >
                        <div className={`p-3 rounded-full border border-white/10 transition-all duration-300 ${appState.isSnowing ? 'bg-[#D4AF37] text-black' : 'hover:bg-white/10 text-white'}`}>
                            <Wind size={20} />
                        </div>
                        <span className="text-[10px] uppercase tracking-widest opacity-60 group-hover:opacity-100">Storm</span>
                    </button>

                    <div className="w-px h-8 bg-white/10" />
                    
                    {/* Glow Slider */}
                    <div className="flex flex-col items-center gap-1">
                        <div className="flex items-center gap-3 px-2">
                             <Lightbulb size={16} className="text-[#D4AF37]" />
                             <input 
                                type="range" 
                                min="0" 
                                max="4" 
                                step="0.1" 
                                value={appState.bloomIntensity} 
                                onChange={handleBloomChange}
                                className="w-24 accent-[#D4AF37] cursor-pointer"
                             />
                             <Sparkles size={16} className="text-[#D4AF37]" />
                        </div>
                        <span className="text-[10px] uppercase tracking-widest opacity-60">Radiance</span>
                    </div>

                </div>

                <div className="text-center opacity-40 arix-sans text-[10px] tracking-widest">
                    SCROLL TO ZOOM • DRAG TO ROTATE
                </div>
            </div>
        </div>
    );
};