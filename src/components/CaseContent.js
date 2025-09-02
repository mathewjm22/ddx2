import React, { useRef, useEffect } from 'react';

const CaseContent = ({ parts }) => {
  const contentRef = useRef(null);

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTop = contentRef.current.scrollHeight;
    }
  }, [parts]);

  const renderPart = (part, index) => {
    if (part.text) {
      if (part.text.startsWith('<div')) {
        return (
          <div 
            key={index}
            dangerouslySetInnerHTML={{ __html: part.text }}
          />
        );
      } else {
        return (
          <p key={index} className="text-lg">
            {part.text.split('\n').map((line, i) => (
              <React.Fragment key={i}>
                {line}
                {i < part.text.split('\n').length - 1 && <br />}
              </React.Fragment>
            ))}
          </p>
        );
      }
    } else if (part.inlineData) {
      return (
        <img
          key={index}
          src={`data:${part.inlineData.mimeType};base64,${part.inlineData.data}`}
          className="my-4 rounded-lg shadow-lg w-full object-cover max-h-96"
          alt="Medical case illustration"
        />
      );
    }
    return null;
  };

  return (
    <div ref={contentRef} className="pr-2 flex-grow overflow-y-auto max-h-96">
      {parts.map((phaseParts, phaseIndex) => (
        <div key={phaseIndex}>
          {phaseIndex > 0 && <hr className="my-4 border-gray-600" />}
          {phaseParts.map((part, partIndex) => renderPart(part, `${phaseIndex}-${partIndex}`))}
        </div>
      ))}
    </div>
  );
};

export default CaseContent;
