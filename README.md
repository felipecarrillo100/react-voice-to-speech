# react-voice-to-speech

A lightweight, customizable React library for Voice-to-Text functionality powered by the Web Speech API.

## 🚀 Features

* **Simple Integration:** Drop in a pre-built button or build your own with our hooks and overlays.
* **Real-time Overlay:** Beautiful built-in UI with live volume visualization and transcription feedback.
* **Smart Punctuation:** Optional engine to convert spoken words (e.g., "comma") into symbols (`,`).
* **Fully Themeable:** Style every aspect using CSS variables or custom classes.
* **Modern Testing:** 100% test coverage using Vitest Browser Mode for real-world reliability.

---

## 📦 Installation

```bash
npm install react-voice-to-speech

```

## 🛠️ Usage

### Getting started

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

### Customization

For full control, integrate the `OverlayVoiceToSpeech` into your own custom components.
Write your own custom react component using your preferred framework (Bootstrap, MUI, etc).
Usee CSS to modify the `OverlayVoiceToSpeech` background, color, fonts, etc. 

```tsx
import React, { useState } from 'react';
import {useDetectVoiceSupport} from "./useDetectVoiceSupport";
import {OverlayVoiceToSpeech} from "./OverlayVoiceToSpeech";
import type {VoiceResult} from "./commonInterfaces";
import 'react-voice-to-speech/dist/index.css';
// Add your own css for styling
import 'yourcssgoeshere.css';

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
### Advanced Punctuation Support (Experimental)

By default, the Web Speech API does not automatically convert spoken words into punctuation symbols (e.g., it transcribes "comma" as a word rather than ,).

To solve this, use the OverlayVoiceToSpeechWithPunctuation component. It functions identically to the standard overlay but includes a built-in processing engine that transforms spoken commands into symbols in real-time.

How it works
The component monitors the transcript for specific keywords based on the language prop and snaps them into the correct punctuation marks.

User says: "It is a nice day comma isn't it question mark"

Result: "It is a nice day, isn't it?"


## ⚙️ API Reference

### `BasicVoiceToSpeechButton` Props

| Prop          | Type | Default | Description                                              |
|---------------| --- | --- |----------------------------------------------------------|
| `onDataReady` | `(text: VoiceResult) => void` | **Required** | Callback fired when transcription is complete.           |
| `language`        | `string` | `'en-US'` | BCP 47 language tag (e.g., `'es-ES'`, `'fr-FR'`).        |
| `className`   | `string` |  | Custom class for the button.                             |
| `id`           | `string` |  | Assign an id.                                            |
| `style`           | `React.CSSProperties` |  | Style                                                    |
| `children`           | `React.ReactNode` |  | Use your own icon                                        |
| `labels`      | `VoiceToSpeechLabels`      | `` | Labels. In case you want to replace the default messages |

### `OverlayVoiceToSpeech` Props

| Prop          | Type                          | Default | Description                                                             |
|---------------|-------------------------------| -- |-------------------------------------------------------------------------|
| `onDataReady` | `(text: VoiceResult) => void` | **Required** | Callback fired when transcription is complete.                          |
| `language`    | `string`                      | `'en-US'` | BCP 47 language tag (e.g., `'es-ES'`, `'fr-FR'`).                       |
| `children`           | `React.ReactNode` |  | Allows you to add a custom at the center of the circle |
| `labels`      | `VoiceToSpeechLabels`      | `` | Labels. In case you want to replace the default messages                |

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

## Donations
Creating these libraries is my hobie. If you consider my work useful to you, please consider buying me a coffee. Your contribution keeps me motivated to created and maintain these useful libraries.

[<img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" name="buy-me-a-coffee" alt="Buy Me A Coffee" width="180">](https://buymeacoffee.com/felipecarrillo100)

[![paypal](https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/donate/?business=7X3JAPNBQTXZG&amount=5&no_recurring=0&item_name=NPM%2FGitHub+libraries&currency_code=USD)

[![QR](https://raw.githubusercontent.com/felipecarrillo100/bankgreen/main/QR_Code_5Euro.png)](https://www.paypal.com/donate/?business=7X3JAPNBQTXZG&amount=5&no_recurring=0&item_name=NPM%2FGitHub+libraries&currency_code=USD)

[<img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" name="buy-me-a-coffee" alt="Buy Me A Coffee" width="180">](https://buymeacoffee.com/felipecarrillo100)
