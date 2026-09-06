import { useState } from "react";

export function useCopyToClipboard() {
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const handleCopy = async (content: string) => {
    if (!content) {
      console.warn("No content provided to copy.");
      return;
    }
    try {
      await navigator.clipboard.writeText(content);
      setCopiedText(content);
      setTimeout(() => setCopiedText(null), 2000);
    } catch (err) {
      console.warn("Failed to copy using clipboard API, trying fallback", err);
      try {
        const textArea = document.createElement("textarea");
        textArea.value = content;
        textArea.style.position = "fixed";
        textArea.style.opacity = "0";
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);

        setCopiedText(content);
        setTimeout(() => setCopiedText(null), 2000);
      } catch (fallbackErr) {
        console.error("Failed to copy content", fallbackErr);
      }
    }
  };

  return {
    copied: Boolean(copiedText),
    copiedText,
    handleCopy,
  };
}
