import React from 'react';
import './Home.css';
import temperatureSvg from './graphicfile/temperature.svg';
import NH2Svg from './graphicfile/NH2.svg';
import O2Svg from './graphicfile/O2.svg';
import phSvg from './graphicfile/ph.svg';
import saltSvg from './graphicfile/salt.svg';
import waterpoolImg from './graphicfile/waterpool.svg';

const Home = () => {
  return (
    <div className="home-container">

    {/* 中央水池圖片 */}
    <img 
      src={waterpoolImg} 
      alt="水池圖" 
      className="waterpool-img"
    />

    <img 
      src={phSvg} 
      alt="ph監控" 
      className="ph-svg"
    />  

    <img 
      src={temperatureSvg} 
      alt="trmperature監控" 
      className="trmperature-svg"
    /> 

    <img 
      src={O2Svg} 
      alt="O2監控" 
      className="O2-svg"
    />

    <img 
      src={saltSvg} 
      alt="salt監控" 
      className="salt-svg"
    />

    <img 
      src={NH2Svg} 
      alt="NH2監控" 
      className="NH2-svg"
    />

    </div>
  );
};

export default Home;