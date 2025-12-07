import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Sparkles, Instance, Instances, Outlines } from '@react-three/drei';
import * as THREE from 'three';
import { GOLD_COLOR, EMERALD_COLOR, OrnamentData } from '../types';

const TreeLayer: React.FC<{ 
    scale: number; 
    position: [number, number, number];
    height: number;
    radius: number;
}> = ({ scale, position, height, radius }) => {
    return (
        <mesh position={position} scale={scale} castShadow receiveShadow>
            <coneGeometry args={[radius, height, 64, 1, true]} />
            <meshStandardMaterial 
                color={EMERALD_COLOR} 
                roughness={0.3} 
                metalness={0.4}
                flatShading={false}
            />
            {/* Adding a wireframe overlay for that "tech-luxury" feel */}
            <lineSegments>
                <edgesGeometry args={[new THREE.ConeGeometry(radius, height, 8)]} />
                <lineBasicMaterial color={EMERALD_COLOR} opacity={0.3} transparent />
            </lineSegments>
        </mesh>
    );
};

const Ornaments: React.FC<{ count: number; radiusBase: number; heightBase: number }> = ({ count, radiusBase, heightBase }) => {
    const ornaments = useMemo(() => {
        const temp: OrnamentData[] = [];
        // Spiral algorithm
        for (let i = 0; i < count; i++) {
            const t = i / count;
            const angle = t * Math.PI * 12; // 6 full rotations
            const y = (1 - t) * heightBase * 2.5 - (heightBase); 
            const radiusAtHeight = radiusBase * (t); // Tapering
            
            const x = Math.cos(angle) * (radiusAtHeight + 0.2);
            const z = Math.sin(angle) * (radiusAtHeight + 0.2);
            
            temp.push({
                position: [x, y, z],
                scale: Math.random() * 0.15 + 0.1,
                type: Math.random() > 0.7 ? 'diamond' : 'sphere',
                color: GOLD_COLOR
            });
        }
        return temp;
    }, [count, radiusBase, heightBase]);

    return (
        <group>
             {ornaments.map((o, i) => (
                <Float key={i} speed={2} rotationIntensity={1} floatIntensity={0.2}>
                    <mesh position={o.position} castShadow>
                        {o.type === 'sphere' ? (
                            <sphereGeometry args={[o.scale, 32, 32]} />
                        ) : (
                            <octahedronGeometry args={[o.scale]} />
                        )}
                        <meshStandardMaterial 
                            color={GOLD_COLOR} 
                            metalness={1} 
                            roughness={0.1}
                            envMapIntensity={2}
                        />
                    </mesh>
                </Float>
            ))}
        </group>
    );
};

const Star: React.FC = () => {
    const ref = useRef<THREE.Group>(null);
    useFrame((state) => {
        if (ref.current) {
            ref.current.rotation.y = state.clock.getElapsedTime() * 0.5;
            ref.current.rotation.z = Math.sin(state.clock.getElapsedTime()) * 0.1;
        }
    });

    return (
        <group position={[0, 4.2, 0]} ref={ref}>
            <mesh castShadow>
                <octahedronGeometry args={[0.4, 0]} />
                <meshStandardMaterial 
                    color="#FFDD44" 
                    emissive="#FFAA00" 
                    emissiveIntensity={2} 
                    toneMapped={false} 
                />
            </mesh>
            <pointLight distance={5} intensity={5} color="#FFAA00" />
            <Sparkles count={20} scale={2} size={6} speed={0.4} opacity={1} color="#FFFF00" />
        </group>
    );
};

export const ArixTree: React.FC<{ spinSpeed: number }> = ({ spinSpeed }) => {
    const groupRef = useRef<THREE.Group>(null);

    useFrame((state, delta) => {
        if (groupRef.current) {
            groupRef.current.rotation.y += delta * spinSpeed;
        }
    });

    return (
        <group ref={groupRef} position={[0, -1.5, 0]}>
            {/* The Tree Body - Layered Cones */}
            <TreeLayer position={[0, 0.5, 0]} scale={1} height={2} radius={1.8} />
            <TreeLayer position={[0, 1.8, 0]} scale={0.9} height={1.8} radius={1.6} />
            <TreeLayer position={[0, 3.0, 0]} scale={0.8} height={1.5} radius={1.4} />

            {/* Decorations */}
            <Ornaments count={40} radiusBase={1.8} heightBase={2.2} />
            
            {/* Topper */}
            <Star />

            {/* Stand */}
            <mesh position={[0, -0.5, 0]} castShadow>
                <cylinderGeometry args={[0.3, 0.5, 1, 8]} />
                <meshStandardMaterial color="#111" metalness={0.8} roughness={0.2} />
            </mesh>
        </group>
    );
};