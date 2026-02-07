import { expect, test, vi } from "vitest";
import { render } from "vitest-browser-react"; 
// ✅ Use 'vitest/browser' instead of '@vitest/browser/context'
import { page } from "vitest/browser"; 
import { BasicVoiceToSpeechButton } from "../src/BasicVoiceToSpeechButton";
import "../src/styles.scss";
import React from "react";

test("visual check of the button", async () => {
  render(
    <BasicVoiceToSpeechButton onTextReady={(text) => console.log(text)} />
  );

  const button = page.getByRole('button');
  await expect.element(button).toBeVisible();

  // Let's actually interact with it!
  await button.click();
  
  // Now we can check if your overlay appeared
  // Assuming your overlay has a specific text or role:
  // const overlay = page.getByText(/listening/i);
  // await expect.element(overlay).toBeVisible();
});

test("should start listening when clicked", async () => {
  render(
    <BasicVoiceToSpeechButton onTextReady={() => {}} />
  );

  const button = page.getByRole('button');
  await button.click();

  // Replace 'Listening...' with whatever text or aria-label 
  // your Overlay component shows when it's active
  const status = page.getByText(/listening/i);
  await expect.element(status).toBeVisible();
});


test("should display text when speech is recognized", async () => {
  // 1. Create a shared object to capture the handlers
  let capturedHandlers: any = {};

  // 2. Define a class that behaves like the real SpeechRecognition
  class MockRecognition {
    start = vi.fn();
    stop = vi.fn();
    // These will be set by your component
    set onresult(fn: any) { capturedHandlers.onresult = fn; }
    set onend(fn: any) { capturedHandlers.onend = fn; }
  }

  // 3. Stub the globals using the Class
  vi.stubGlobal('webkitSpeechRecognition', MockRecognition);
  vi.stubGlobal('SpeechRecognition', MockRecognition);

  render(<BasicVoiceToSpeechButton onTextReady={(text) => console.log(text)} />);

  // 4. Click the button to trigger your component's 'new SpeechRecognition()'
  const button = page.getByRole('button');
  await button.click();

  // 5. Check if the component attached the handler, then call it
  if (capturedHandlers.onresult) {
    capturedHandlers.onresult({
      results: [[{ transcript: "Hello World", confidence: 1 }]],
      resultIndex: 0
    });
  } else {
    throw new Error("Component did not attach onresult handler to SpeechRecognition");
  }

  // 6. Assert the result
  const textOutput = page.getByText("Hello World");
  await expect.element(textOutput).toBeVisible();
});