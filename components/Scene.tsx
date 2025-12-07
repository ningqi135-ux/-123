import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, OrbitControls, ContactShadows, PerspectiveCamera, Stars } from '@react-three/drei';
import { EffectComposer, Bloom, Vignette, Noise } from '@react-three/postprocessing';
import { ArixTree } from './ArixTree';
import GoldDust from './GoldDust';
import { AppState } from '../types';
import * as THREE from 'three';

interface SceneProps {
    appState: AppState;
}

const MovingSpot = ({ vec = new THREE.Vector3(), ...props }) => {
    const light = useRef<THREE.SpotLight>(null);
    const viewport = useRef<THREE.Object3D>(null);
    useFrame((state) => {
        if (light.current) {
            light.current.target.position.lerp(vec.set((state.mouse.x * 5), (state.mouse.y * 5), 0), 0.1);
            light.current.target.updateMatrixWorld();
        }
    });
    return <spotLight ref={light} castShadow penumbra={1} distance={10} angle={0.35} attenuation={5} anglePower={4} intensity={5} {...props} />;
};

const SceneContent: React.FC<SceneProps> = ({ appState }) => {
    return (
        <>
            <PerspectiveCamera makeDefault position={[0, 1, 8]} fov={50} />
            <OrbitControls 
                enablePan={false} 
                enableZoom={true} 
                maxPolarAngle={Math.PI / 1.8} 
                minPolarAngle={Math.PI / 3}
                maxDistance={12}
                minDistance={4}
                autoRotate={false}
            />

            {/* Lighting - The Cinematic Key */}
            <ambientLight intensity={0.2} color="#001100" />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={10} castShadow shadow-mapSize={[2048, 2048]} color="#fff0d0" />
            <MovingSpot position={[0, 5, 5]} color="#fff" />
            
            {/* Back light for rim effect */}
            <spotLight position={[-5, 5, -5]} intensity={5} color="#00ff88" distance={10} />

            {/* Environment for shiny gold reflections */}
            <Environment preset="city" />

            {/* The Main Actor */}
            <ArixTree spinSpeed={appState.spinSpeed} />

            {/* Atmosphere */}
            <GoldDust count={appState.isSnowing ? 500 : 100} />
            <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

            {/* Floor */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]} receiveShadow>
                <planeGeometry args={[50, 50]} />
                <meshStandardMaterial 
                    color="#000804" 
                    roughness={0.05} 
                    metalness={0.9} 
                />
            </mesh>
            <ContactShadows resolution={1024} scale={50} blur={2} opacity={0.5} far={10} color="#000000" />

            {/* Post Processing */}
            <EffectComposer disableNormalPass>
                <Bloom 
                    luminanceThreshold={1} 
                    mipmapBlur 
                    intensity={appState.bloomIntensity} 
                    radius={0.6}
                />
                <Vignette eskil={false} offset={0.1} darkness={1.1} />
                <Noise opacity={0.02} />
            </EffectComposer>
        </>
    );
};

export const Scene: React.FC<SceneProps> = (props) => {
    return (
        <Canvas shadows dpr={[1, 2]}>
            <SceneContent {...props} />
        </Canvas>
    );
};