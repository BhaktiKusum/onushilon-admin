'use client';

import { InlineMath } from 'react-katex';

type Props = {
  text: string;
};

export default function LatexText({ text }: Props) {
  if (!text) return null;

  // 1. Pre-process text to remove immediate raw duplicates (e.g., "\(LT^{-1}\)LT-1" -> "\(LT^{-1}\)")
  // This cleans patterns like \(XYZ\)XYZ or \(XYZ\)XYZ-1
  let sanitizedText = text.replace(/\\\((.*?)\\\)([\w\d\s\-\^\/\\+\*=]*)/g, (match, latexContent, rawFollowup) => {
    // Strip mathematical punctuation from latex content to compare with raw text
    const cleanLatex = latexContent.replace(/[{}^]/g, '').trim();
    const cleanRaw = rawFollowup.trim();

    // If the text right after the formula is a low-quality mirror of the formula, remove it
    if (cleanRaw && (cleanLatex.includes(cleanRaw) || cleanRaw.includes(cleanLatex))) {
      return `\\(${latexContent}\\)`; 
    }
    return match;
  });

  const regex = /\\\((.*?)\\\)/g;
  const elements: any[] = [];
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(sanitizedText)) !== null) {
    if (match.index > lastIndex) {
      elements.push(
        <span key={`text-${lastIndex}`}>
          {sanitizedText.slice(lastIndex, match.index)}
        </span>,
      );
    }

    elements.push(
      <InlineMath key={`latex-${match.index}`}>
        {match[1]}
      </InlineMath>,
    );

    lastIndex = regex.lastIndex;
  }

  if (lastIndex < sanitizedText.length) {
    elements.push(
      <span key={`text-end`}>
        {sanitizedText.slice(lastIndex)}
      </span>,
    );
  }

  return <span>{elements}</span>;
}