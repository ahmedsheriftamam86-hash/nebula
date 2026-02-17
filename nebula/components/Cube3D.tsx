import React from 'react';

const Cube3D: React.FC = () => {
  return (
    <div className="relative w-64 h-64 md:w-80 md:h-80 perspective-1000">
      <style>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .preserve-3d {
          transform-style: preserve-3d;
        }
        .cube-spin {
          animation: spinCube 12s infinite linear;
        }
        @keyframes spinCube {
          from { transform: rotateX(-20deg) rotateY(0deg); }
          to { transform: rotateX(-20deg) rotateY(360deg); }
        }
        .cube-face {
          position: absolute;
          width: 100%;
          height: 100%;
          background: rgba(255, 255, 255, 0.05);
          border: 2px solid rgba(76, 201, 240, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          font-size: 2rem;
          color: #4cc9f0;
          box-shadow: 0 0 15px rgba(67, 97, 238, 0.3);
          backdrop-filter: blur(5px);
          backface-visibility: visible;
        }
        .face-front  { transform: rotateY(0deg) translateZ(128px); }
        .face-back   { transform: rotateY(180deg) translateZ(128px); }
        .face-right  { transform: rotateY(90deg) translateZ(128px); }
        .face-left   { transform: rotateY(-90deg) translateZ(128px); }
        .face-top    { transform: rotateX(90deg) translateZ(128px); }
        .face-bottom { transform: rotateX(-90deg) translateZ(128px); }
        
        @media (min-width: 768px) {
           .face-front  { transform: rotateY(0deg) translateZ(160px); }
           .face-back   { transform: rotateY(180deg) translateZ(160px); }
           .face-right  { transform: rotateY(90deg) translateZ(160px); }
           .face-left   { transform: rotateY(-90deg) translateZ(160px); }
           .face-top    { transform: rotateX(90deg) translateZ(160px); }
           .face-bottom { transform: rotateX(-90deg) translateZ(160px); }
        }
      `}</style>
      
      <div className="w-full h-full relative preserve-3d cube-spin">
        <div className="cube-face face-front bg-gradient-to-br from-neon-blue/20 to-transparent">
            <span className="drop-shadow-lg">إبداع</span>
        </div>
        <div className="cube-face face-back bg-gradient-to-bl from-neon-purple/20 to-transparent">
            <span className="drop-shadow-lg">تقنية</span>
        </div>
        <div className="cube-face face-right bg-gradient-to-br from-neon-pink/20 to-transparent">
            <span className="drop-shadow-lg">سرعة</span>
        </div>
        <div className="cube-face face-left bg-gradient-to-bl from-neon-cyan/20 to-transparent">
            <span className="drop-shadow-lg">ذكاء</span>
        </div>
        <div className="cube-face face-top border-neon-pink/50">
            <div className="w-16 h-16 rounded-full bg-neon-pink blur-xl opacity-40"></div>
        </div>
        <div className="cube-face face-bottom border-neon-blue/50">
            <div className="w-16 h-16 rounded-full bg-neon-blue blur-xl opacity-40"></div>
        </div>
        
        {/* Inner floating core */}
        <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 bg-white/10 rounded-full blur-md animate-pulse transform translate-z-10"></div>
      </div>
    </div>
  );
};

export default Cube3D;