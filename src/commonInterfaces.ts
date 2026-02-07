export interface VoiceResult {
    text: string;
    confidence: number;
    timestamp: number;
}

export type VoiceStatus = 'listening' | 'success' | 'error' | 'denied';
