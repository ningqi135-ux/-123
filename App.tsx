import React, { useState, Suspense } from 'react';
import { Scene } from './components/Scene';
import { Overlay } from './components/Overlay';
import { AppState } from './types';
import { Loader } from '@react-three/drei';

const App: React.FC = () => {
    const [appState, setAppState] = useState<AppState>({
        spinSpeed: 0.3,
        bloomIntensity: 1.5,
        isSnowing: false,
        lightColor: "#ffffff"
    });

    return (
        <main className="relative w-full h-screen bg-[#000502]">
            {/* 3D Scene Container */}
            <div className="absolute inset-0 z-0">
                <Suspense fallback={null}>
                    <Scene appState={appState} />
                </Suspense>
            </div>

            {/* 2D UI Overlay */}
            <Overlay appState={appState} setAppState={setAppState} />

            {/* R3F Loader */}
            <Loader 
                containerStyles={{ background: '#000502' }}
                innerStyles={{ background: '#111', width: '200px', height: '2px' }}
                barStyles={{ background: '#D4AF37', height: '2px' }}
                dataStyles={{ fontFamily: 'Montserrat', color: '#D4AF37', fontSize: '10px', letterSpacing: '2px' }}
                dataInterpolation={(p) => `LOADING COLLECTION ${p.toFixed(0)}%`}
            />
            
            <style>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(-20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>
        </main>
    );
};

export default App;