import React, { useEffect, useState } from 'react';
import './ErrorDiv.css';

function ErrorDiv(props) {
  const [isVisible, setIsVisible] = useState(false);
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    setIsVisible(props.visible);

    let timer;

    if (props.visible) {
      timer = setInterval(() => {
        setProgress(prevProgress => {
          if (prevProgress <= 0) {
            clearInterval(timer);
            setIsVisible(false);
            return 0;
          }
          return prevProgress - 1;
        });
      }, 60);
    } else {
      setProgress(100);
    }

    return () => clearInterval(timer);
  }, [props.visible]);


  return (
    <div>
      <div className={`animated-div ${isVisible ? 'visible' : ''}`}>
        <div className={props.color ? 'texto-green' : 'texto-red'}><span>{props.text}</span></div>
        {isVisible && (
        <div className="progress-container">
          <div className="progress-bar" style={{ width: `${progress}%` }}></div>
        </div>
      )}
      </div>
    </div>
  );
}

export default ErrorDiv;
