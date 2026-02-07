Since your project is a specialized React component for voice-to-speech, your README should focus on the **Web Speech API** requirements and clear usage instructions.

Here is a professional `README.md` template:

---

# react-voice-to-speech

A lightweight, customizable React component and hook for integrated **Voice-to-Text** functionality using the Web Speech API.

## 🚀 Features

* **Simple Integration:** Use the pre-built button or the custom hook.
* **Real-time Overlay:** Built-in UI for recording feedback.
* **SCSS Support:** Easily themeable with CSS variables or custom classes.
* **Modern Testing:** 100% test coverage using Vitest Browser Mode.

---

## 📦 Installation

```bash
npm install react-voice-to-speech

```

## 🛠️ Usage

### Basic Component

The easiest way to get started is using the `BasicVoiceToSpeechButton`.

```tsx
import { BasicVoiceToSpeechButton } from 'react-voice-to-speech';
import 'react-voice-to-speech/dist/index.css';

function App() {
  const handleText = (data: VoiceResult) => {
    console.log("Transcribed text:", data.text);
  };

  return (
    <BasicVoiceToSpeechButton
      onDataReady={handleText} 
      language="en-US"
    />
  );
}
```
---

### Advance Component

For full customization build your own button in your preferred framework using the overlay `OverlayVoiceToSpeech`.

```tsx
import React, { useState } from 'react';
import {useDetectVoiceSupport} from "./useDetectVoiceSupport";
import {OverlayVoiceToSpeech} from "./OverlayVoiceToSpeech";
import type {VoiceResult} from "./commonInterfaces";
import 'react-voice-to-speech/dist/index.css';

interface Props {
    language?: string;
    onTextReady: (data: VoiceResult) => void;
    labels?: {[key:string]: string};
}

export const YourVoiceToSpeechButton: React.FC<Props> = ({ language = 'en', onTextReady, labels }) => {
    const [isOpen, setIsOpen] = useState(false);
    const isSupported = useDetectVoiceSupport();

    const handleData = (data: VoiceResult) => {
        setIsOpen(false);
        if (typeof onTextReady === "function")
            onTextReady(data);
    };

    return (
        <>
            { /* Your own button here! */ }
            <button onClick={() => setIsOpen(true)} disabled={!isSupported}>🎤</button>
            {isOpen && (
                <OverlayVoiceToSpeech
                    language={language}
                    onDataReady={handleData}
                    onClose={() => setIsOpen(false)}
                    labels={labels}
                />
            )}
        </>
    );
};
```
---

## ⚙️ API Reference

### `BasicVoiceToSpeechButton` Props

| Prop          | Type | Default | Description                                       |
|---------------| --- | --- |---------------------------------------------------|
| `onDataReady` | `(text: VoiceResult) => void` | **Required** | Callback fired when transcription is complete.    |
| `language`        | `string` | `'en-US'` | BCP 47 language tag (e.g., `'es-ES'`, `'fr-FR'`). |
| `className`   | `string` |  | Custom class for the button.                      |
| `id`           | `string` |  | Assign an id.                                     |
| `style`           | `React.CSSProperties` |  | Style                                             |
| `children`           | `React.ReactNode` |  | Use your own icon                                 |
| `labels`      | `VoiceToSpeechLabels`      | `` | Labels.                                           |

### `OverlayVoiceToSpeech` Props

| Prop          | Type                          | Default | Description                                       |
|---------------|-------------------------------| -- |---------------------------------------------------|
| `onDataReady` | `(text: VoiceResult) => void` | **Required** | Callback fired when transcription is complete.    |
| `language`    | `string`                      | `'en-US'` | BCP 47 language tag (e.g., `'es-ES'`, `'fr-FR'`). |
| `labels`      | `VoiceToSpeechLabels`      | `` | Labels.                                           |

---

## 🎙️ Browser Support & Permissions

This library relies on the **Web Speech API**.

* **Supported:** Chrome, Edge, Safari.
* **Not Supported:** Firefox (limited support), IE.
* **Permissions:** Browsers require an active **HTTPS** connection (or `localhost`) to access the microphone.

---

## 🧪 Development & Testing

We use **Vitest Browser Mode** to test the component in a real Chromium environment.

```bash
# Run tests
npm run test

# Run tests in watch mode (interactive)
npm run test:watch

```

### Mocking Speech in Tests

If you want to test your implementation without a physical microphone, see the `tests/voice.test.tsx` file for examples of mocking the `SpeechRecognition` global object.

---

## 📄 License

MIT © [Your Name/Organization]

---
