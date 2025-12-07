export interface AppState {
    spinSpeed: number;
    bloomIntensity: number;
    isSnowing: boolean;
    lightColor: string;
}

export interface OrnamentData {
    position: [number, number, number];
    scale: number;
    type: 'sphere' | 'diamond' | 'box';
    color: string;
}

export const GOLD_COLOR = "#FFD700";
export const EMERALD_COLOR = "#003319"; // Deep luxurious green
export const PLATINUM_COLOR = "#E5E4E2";