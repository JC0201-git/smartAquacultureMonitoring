import React from 'react';
import './EQStatus.css';

const Home = () => {
  // iframe URL 配置
  const equipmentStatusUrl = 'http://localhost:1880/ui/#!/0?socketid=0VSjskW1n5N5bsTXAAAB';

  return (
    <div className="iframe-container transparent">
      <div className="iframe-wrapper transparent">
        <iframe
          src={equipmentStatusUrl}
          title="設備狀態"
          className="iframe-content transparent"
          allowFullScreen
          style={{
            backgroundColor: 'transparent',
            background: 'transparent',
            border: 'none'
          }}
        />
      </div>
    </div>
  );
};

export default Home;