import { useState } from 'react';

interface MyWindow {
    SpeechRecognition: unknown;
    webkitSpeechRecognition: unknown;
}

export const useDetectVoiceSupport = () => {
    // We initialize the state using a "lazy initializer" function.
    // This runs once during the initial render and avoids the Effect entirely.
    const [isSupported] = useState(() => {
        if (typeof window === 'undefined') return false;

        const hasAPI = !!((window as unknown as MyWindow).SpeechRecognition || (window as unknown as MyWindow).webkitSpeechRecognition);
        const isSecure = window.isSecureContext;

        return hasAPI && isSecure;
    });

    return isSupported;
};
