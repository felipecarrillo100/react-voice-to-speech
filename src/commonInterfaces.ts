import React from "react";

export interface VoiceResult {
    text: string;
    confidence: number;
    timestamp: number;
}

export type VoiceStatus = 'listening' | 'success' | 'error' | 'denied';

export interface VoiceToSpeechLabels {
    recordButtonAria?: string;
    nothingReceived?: string;
    listeningText?: string;
    errorPermission?: string;
    errorPrefix?: string;
    deniedIcon?: string | React.ReactNode;      // Default "🚫"
    errorIcon?: string | React.ReactNode;       // Default "⚠️"
}

export const DefaultVoiceToSpeechLabels: Required<VoiceToSpeechLabels> = {
    recordButtonAria: "Start voice recording",
    nothingReceived: "Didn't catch that. Try again?",
    listeningText: "Listening...",
    errorPermission: "Microphone access denied",
    errorPrefix: "Error",
    deniedIcon: "🚫",
    errorIcon: "⚠️"
};
