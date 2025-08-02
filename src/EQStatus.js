import React from 'react';
import './EQStatus.css';

const EQStatus = () => {
  // iframe URL 配置
  const equipmentStatusUrl = 'http://localhost:1880/ui/#!/0?socketid=0VSjskW1n5N5bsTXAAAB';

  return (
    <div className="iframe-container transparent">
      <div className="iframe-wrapper transparent">
        <iframe
          src={equipmentStatusUrl}
          title="設備狀態"
          className="iframe-content transparent"
          frameBorder="0"
          allowFullScreen
          style={{
            backgroundColor: 'transparent',
            background: 'transparent'
          }}
        />
      </div>
    </div>
  );
};

export default EQStatus;