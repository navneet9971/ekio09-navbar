import React from 'react';

const StatusBar = ({ totalResponses, completedResponses }) => {
  const percentage = ((completedResponses / totalResponses) * 100).toFixed(2);

  return (
    <div className='status-bar-container'>
      <div className='status-bar'>
        <div
          className='status-fill'
          style={{
            width: `${percentage}%`,
            backgroundColor: '#55B600',
          }}
        />
      </div>
      <p className='status-percent'>{`(${percentage}%)`}</p>

      <style jsx>{`
        .status-bar-container {
          display: flex;
          align-items: center;
        }

        .status-bar {
          width: 35%;
          height: 22px;
          background-color: #D9D9D9;
          position: absolute;
          right: 89px;
        }

        .status-fill {
          height: 100%;
          background-color: #55B600;
        }

        .status-percent {
          position: absolute;
          right: 89px;
        }

        @media (max-width: 768px) {
          .status-bar {
            position: relative;
            width: 100%;
            right: -2px;
        }
        @media (min-width: 821px) and (max-width: 1023px) {
          .status-bar {
            position: relative;
            width: 85%;
          }
        }
        
        }
        }
      `}</style>
    </div>
  );
};

export default StatusBar;
