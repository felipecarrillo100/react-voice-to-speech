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

function App() {
  const handleText = (text: string) => {
    console.log("Transcribed text:", text);
  };

  return (
    <BasicVoiceToSpeechButton 
      onTextReady={handleText} 
      language="en-US"
    />
  );
}

```

---

## ⚙️ API Reference

### `BasicVoiceToSpeechButton` Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `onTextReady` | `(text: string) => void` | **Required** | Callback fired when transcription is complete. |
| `language` | `string` | `'en-US'` | BCP 47 language tag (e.g., `'es-ES'`, `'fr-FR'`). |
| `className` | `string` | `''` | Custom class for the button. |
| `continuous` | `boolean` | `false` | Keep listening after the first result is found. |

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
