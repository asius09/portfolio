import { useState } from "react";

/**
 * This hooks will give hanldeCopyToClipboard function to use.
 *
 */
export function useCopyToClipboard() {
  const [copied, setCopied] = useState(false);
  const handleCopy = async (content: string) => {
    if (!content) {
      console.log("No Content present to copy.");
    }
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);

      //Reset: Copies state after 2000
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.log("Failed to copy the content", err);
      const textArea = document.createElement("textarea");
      textArea.value = content;
      textArea.style.position = "fixed";
      textArea.style.opacity = "0";
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);

      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    }
  };
  return { copied, handleCopy };
}
