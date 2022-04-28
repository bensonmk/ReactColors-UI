import React, { useEffect, useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import '../styles/ColorBox.css';

const ColorBox = ({ background, name }) => {
  const [copy, setCopy] = useState(false);
  const changeCopyState = () => {
    setCopy(true);
  };

  useEffect(() => {
    setTimeout(() => {
      setCopy(false);
    }, 1500);
  }, [copy]);

  return (
    <CopyToClipboard text={background} onCopy={changeCopyState}>
      <div className="Colorbox" style={{ background }}>
        <div
          className={`copy-overlay ${copy && 'show'}`}
          style={{ background }}
        />
        <div className={`copy-msg ${copy && 'show'}`}>
          <h1>Copied!</h1>
          <p>{background}</p>
        </div>
        <div className="copy-container">
          <div className="box-content">
            <span>{name}</span>
          </div>
          <button className="copy-button">Copy</button>
        </div>
        <span className="see-more">More</span>
      </div>
    </CopyToClipboard>
  );
};

export default ColorBox;