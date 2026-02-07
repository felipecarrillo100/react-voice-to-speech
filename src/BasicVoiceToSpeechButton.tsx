import React, {useMemo, useState} from 'react';
import {useDetectVoiceSupport} from "./useDetectVoiceSupport";
import {OverlayVoiceToSpeech} from "./OverlayVoiceToSpeech";
import {DefaultVoiceToSpeechLabels, VoiceResult, VoiceToSpeechLabels} from "./commonInterfaces";

interface VoiceSearchButtonProps {
    language?: string;
    onDataReady: (data: VoiceResult) => void;
    className?: string;
    id?: string;
    style?: React.CSSProperties;
    children?: React.ReactNode;
    labels?: VoiceToSpeechLabels;
}

export const BasicVoiceToSpeechButton: React.FC<VoiceSearchButtonProps> = ({ language = 'en', onDataReady, className, id, style, children, labels }) => {
    const [isOpen, setIsOpen] = useState(false);
    const isSupported = useDetectVoiceSupport();

    const handleData = (data: VoiceResult) => {
        setIsOpen(false);
        if (typeof onDataReady === "function")
            onDataReady(data);
    };

    // ✅ Merge default labels with any user-provided overrides
// Inside your Component
    const uiLabels = useMemo(() => ({
        ...DefaultVoiceToSpeechLabels,
        ...labels
    }), [labels]); // 👈 Re-run this logic whenever 'labels' changes

    const onClick = (e?: React.FormEvent) => {
        if (e) { e.preventDefault(); e.stopPropagation(); }
        setIsOpen(true);
    }

    return (
        <>
            <button onClick={onClick} disabled={!isSupported} className={className} id={id} style={style}
                    aria-label={uiLabels.recordButtonAria}
            >
                {children || "🎤"}
            </button>
            {isOpen && (
                <OverlayVoiceToSpeech
                    language={language}
                    labels={labels}
                    onDataReady={handleData}
                    onClose={() => setIsOpen(false)}
                />
            )}
        </>
    );
};
