import React from 'react';

const StatusBar = ({ totalResponses, completedResponses }) => {
  const percentage = ((completedResponses / totalResponses) * 100).toFixed(2);

  return (
    <div className='status-bar-container'>
      <div
        className='status-bar'
        style={{
          margin: "-3px 104px",
          width: '100%',
          height: '22px',
          // top:'85px',
          left: '596px',
          backgroundColor: ' #D9D9D9',
          // borderRadius: '50px',
        }}
      >
        <div
          className='status-fill'
          style={{
            width: `${percentage}%`,
            height: '100%',
            backgroundColor: '#55B600',
            // borderRadius: '50px',
          }}
        />
      </div>
      <p className='status-percent'>{`(${percentage}%) `}</p>

      <style jsx>{`
        .status-bar-container {
          display: flex;
          align-items: center;
          justify-content: flex-start;
          width: 60%;
        }

        .status-bar {
          position: relative;
          flex-grow: 1;
        }

        .status-fill {
          position: absolute;
          top: 0;
          left: 0;
        }

        .status-percent {
          margin-left: 10px;
        }

        @media (max-width: 576px) {
          .status-bar-container {
            flex-direction: column;
          }

          .status-bar {
            width: 60%;
            margin-bottom: 10px;
          }

          .status-percent {
            margin-left: 0;
          }
        }

        @media (min-width: 577px) and (max-width: 991px) {
          .status-bar-container {
            justify-content: center;
          }
        }

        @media (min-width: 992px) and (max-width: 1199px) {
          .status-bar-container {
            justify-content: flex-start;
          }
        }

        @media (min-width: 1200px) {
          .status-bar-container {
            justify-content: space-between;
          }

        

          .status-percent {
            margin-left: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default StatusBar;
