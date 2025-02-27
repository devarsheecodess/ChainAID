import React from 'react';

const Loader = () => {
    return (
        <div className="integrated-loader">
            <div className="bars-container">
                {[...Array(6)].map((_, index) => (
                    <div
                        key={index}
                        className="loader-bar"
                        style={{ animationDelay: `${index * 0.1}s` }}
                    />
                ))}
            </div>

            <style jsx>{`
        .integrated-loader {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 10;
          background-color: transparent;
        }
        
        .bars-container {
          display: flex;
          align-items: center;
          gap: 4px;
        }
        
        .loader-bar {
          width: 8px;
          height: 32px;
          border-radius: 999px;
          background: linear-gradient(to right, #a855f7, #3b82f6);
          animation: barPulse 1.2s ease-in-out infinite;
        }
        
        @keyframes barPulse {
          0%, 100% {
            transform: scaleY(0.5);
            opacity: 0.5;
          }
          50% {
            transform: scaleY(1);
            opacity: 1;
          }
        }
      `}</style>
        </div>
    );
};

export default Loader;