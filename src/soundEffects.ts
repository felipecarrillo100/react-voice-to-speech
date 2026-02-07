const playTone = (freq: number, type: OscillatorType, duration: number) => {
    const AudioContextClass = (window as any).AudioContext || (window as any).webkitAudioContext;
    const ctx = new AudioContextClass();

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, ctx.currentTime);

    // Create a smooth volume envelope (prevents clicking)
    gain.gain.setValueAtTime(0, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.2, ctx.currentTime + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + duration);
};

// YouTube-inspired sound signatures
export const playStartSound = () => playTone(523.25, 'sine', 0.15); // Clean High C
export const playSuccessSound = () => {
    playTone(659.25, 'sine', 0.1); // E5
    setTimeout(() => playTone(880.00, 'sine', 0.2), 100); // A5 (Ascending)
};
export const playErrorSound = () => {
    playTone(220.00, 'triangle', 0.1); // Low A3
    setTimeout(() => playTone(220.00, 'triangle', 0.1), 150); // Double Thud
};
