import React, { useState } from 'react';
import {useDetectVoiceSupport} from "./useDetectVoiceSupport";
import {OverlayVoiceToSpeech} from "./OverlayVoiceToSpeech";
import {DefaultVoiceToSpeechLabels, VoiceResult, VoiceToSpeechLabels} from "./commonInterfaces";

interface VoiceSearchButtonProps {
    lang?: string;
    onDataReady: (data: VoiceResult) => void;
    className?: string;
    id?: string;
    style?: React.CSSProperties;
    children?: React.ReactNode;
    labels?: VoiceToSpeechLabels;
}

export const BasicVoiceToSpeechButton: React.FC<VoiceSearchButtonProps> = ({ lang = 'en', onDataReady, className, id, style, children, labels }) => {
    const [isOpen, setIsOpen] = useState(false);
    const isSupported = useDetectVoiceSupport();

    const handleData = (data: VoiceResult) => {
        setIsOpen(false);
        if (typeof onDataReady === "function")
            onDataReady(data);
    };

    // ✅ Merge default labels with any user-provided overrides
    const uiLabels = { ...DefaultVoiceToSpeechLabels, ...labels };

    return (
        <>
            <button onClick={() => setIsOpen(true)} disabled={!isSupported} className={className} id={id} style={style}
                    aria-label={uiLabels.recordButtonAria}
            >
                {children || "🎤"}
            </button>
            {isOpen && (
                <OverlayVoiceToSpeech
                    language={lang}
                    labels={labels}
                    onDataReady={handleData}
                    onClose={() => setIsOpen(false)}
                />
            )}
        </>
    );
};
