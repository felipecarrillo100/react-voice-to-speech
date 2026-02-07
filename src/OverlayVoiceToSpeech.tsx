import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import {playErrorSound, playStartSound, playSuccessSound} from "./soundEffects";
import type {VoiceResult, VoiceStatus} from "./commonInterfaces";

interface OverlayProps {
    lang: string;
    onDataReady: (data: VoiceResult) => void;
    onClose: () => void;
}

export const OverlayVoiceToSpeech: React.FC<OverlayProps> = ({ lang, onDataReady, onClose }) => {
    const [status, setStatus] = useState<VoiceStatus>('listening');
    const [errorMessage, setErrorMessage] = useState("");
    const [interim, setInterim] = useState("");
    const [volume, setVolume] = useState(0);

    const recognitionRef = useRef<any>(null);
    const streamRef = useRef<MediaStream | null>(null);
    const audioContextRef = useRef<AudioContext | null>(null);
    const timeoutRef = useRef<any>(null);

    const handleStop = (e: React.MouseEvent) => {
        e.stopPropagation(); // Prevent the backdrop's onClose from firing

        if (status === 'listening' && recognitionRef.current) {
            // Stop the engine - this will trigger 'onresult' with the 'isFinal' flag
            recognitionRef.current.stop();

            // If there's no interim text yet, just close
            if (!interim) {
                onClose();
            }
        }
    };

    const resetSilenceTimer = () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);

        timeoutRef.current = setTimeout(() => {
            // We use a functional update to get the TRUE current status
            setStatus((prevStatus) => {
                if (prevStatus === 'listening') {
                    playErrorSound();
                    setErrorMessage("Didn't catch that. Try again?");

                    // 🔥 CRITICAL: Stop the mic so it doesn't trigger onresult/onsuccess
                    if (recognitionRef.current) {
                        recognitionRef.current.onresult = null; // Detach listener
                        recognitionRef.current.abort();
                    }

                    setTimeout(() => onClose(), 2000);
                    return 'error';
                }
                return prevStatus;
            });
        }, 8000);
    };

    useEffect(() => {
        let isMounted = true;
        resetSilenceTimer();

        const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
        const recog = new SpeechRecognition();
        recog.continuous = true;
        recog.interimResults = true;
        recog.lang = lang;

        recog.onstart = () => {
            playStartSound();
        };

        recog.onresult = (event: any) => {
            resetSilenceTimer();
            let currentInterim = "";

            for (let i = event.resultIndex; i < event.results.length; ++i) {
                if (event.results[i].isFinal) {
                    playSuccessSound(); // 🎉 Trigger success sound
                    setStatus('success');
                    const result = {
                        text: event.results[i][0].transcript,
                        confidence: event.results[i][0].confidence,
                        timestamp: Date.now()
                    };
                    setTimeout(() => {
                        if (isMounted) onDataReady(result);
                    }, 400);
                    return;
                } else {
                    currentInterim += event.results[i][0].transcript;
                }
            }
            if (isMounted) setInterim(currentInterim);
        };

        recog.onerror = (event: any) => {
            if (event.error === 'no-speech') return;
            if (event.error === 'aborted') return;

            if (timeoutRef.current) clearTimeout(timeoutRef.current);
            if (event.error === 'not-allowed') {
                playErrorSound();
                setStatus('denied');
                setErrorMessage("Microphone access denied.");
                setTimeout(() => { if (isMounted) onClose(); }, 2000);
            } else {
                playErrorSound();
                setStatus('error');
                setErrorMessage(`Error: ${event.error}`);
                setTimeout(() => { if (isMounted) onClose(); }, 2000);
            }
        };

        recog.start();
        recognitionRef.current = recog;

        let animationFrame: number;
        navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {
            if (!isMounted) {
                stream.getTracks().forEach(t => t.stop());
                return;
            }
            streamRef.current = stream;
            const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
            audioContextRef.current = ctx;
            const source = ctx.createMediaStreamSource(stream);
            const analyzer = ctx.createAnalyser();
            analyzer.fftSize = 64;
            source.connect(analyzer);
            const data = new Uint8Array(analyzer.frequencyBinCount);

            const update = () => {
                analyzer.getByteFrequencyData(data);
                const avg = data.reduce((a, b) => a + b) / data.length;
                if (isMounted) {
                    setVolume(avg);
                    animationFrame = requestAnimationFrame(update);
                }
            };
            update();
        }).catch(() => {
            if (isMounted) {
                setStatus('denied');
                setErrorMessage("Microphone access denied.");
                setTimeout(() => { if (isMounted) onClose(); }, 2000);
            }
        });

        return () => {
            isMounted = false;
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
            if (recognitionRef.current) recognitionRef.current.abort();
            if (streamRef.current) streamRef.current.getTracks().forEach(t => t.stop());
            if (audioContextRef.current) audioContextRef.current.close();
            cancelAnimationFrame(animationFrame);
        };
    }, []);

    return createPortal(
        <div className="voice-overlay-backdrop" onClick={onClose}>
            <div className="voice-modal" onClick={e => e.stopPropagation()}>
                {status === 'listening' || status === 'success' ? (
                    <>
                        <div className="interim-text">
                            {status === 'success' ? "" : (interim || "Listening...")}
                        </div>
                        <div className={`mic-section ${status}`}
                             onClick={handleStop}
                             style={{ cursor: 'pointer' }}
                        >
                            <div
                                className="pulse-ring"
                                style={{ transform: status === 'success' ? 'scale(1.2)' : `scale(${1 + volume / 50})` }}
                            />
                            <div className="mic-circle"/>
                        </div>
                    </>
                ) : (
                    <div className="status-container">
                        <span className="status-icon">{status === 'denied' ? "🚫" : "⚠️"}</span>
                        <div className="error-message">{errorMessage}</div>
                    </div>
                )}
            </div>
        </div>,
        document.body
    );
};
