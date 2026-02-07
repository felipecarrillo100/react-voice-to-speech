import React, { useState } from 'react';
import {useDetectVoiceSupport} from "./useDetectVoiceSupport";
import {OverlayVoiceToSpeech} from "./OverlayVoiceToSpeech";
import type {VoiceResult} from "./commonInterfaces";

interface VoiceSearchButtonProps {
    lang?: string;
    onTextReady: (data: VoiceResult) => void;
}

export const BasicVoiceToSpeechButton: React.FC<VoiceSearchButtonProps> = ({ lang = 'en', onTextReady }) => {
    const [isOpen, setIsOpen] = useState(false);
    const isSupported = useDetectVoiceSupport();

    const handleData = (data: VoiceResult) => {
        setIsOpen(false);
        if (typeof onTextReady === "function")
            onTextReady(data);
    };

    return (
        <>
            <button onClick={() => setIsOpen(true)} disabled={!isSupported}>🎤</button>
            {isOpen && (
                <OverlayVoiceToSpeech
                    lang={lang}
                    onDataReady={handleData}
                    onClose={() => setIsOpen(false)}
                />
            )}
        </>
    );
};
