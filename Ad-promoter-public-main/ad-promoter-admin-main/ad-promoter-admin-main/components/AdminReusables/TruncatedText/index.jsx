import { useState, useEffect } from 'react';

function TruncatedText({ text, maxLength, className }) {
  const [truncatedText, setTruncatedText] = useState(text);

  useEffect(() => {
    if (text && text.length > maxLength) {
      setTruncatedText(text.substring(0, maxLength - 3) + '...');
    } else {
      setTruncatedText(text);
    }
  }, [text, maxLength]);

  return <span className={className}>{truncatedText}</span>;
}

export default TruncatedText;