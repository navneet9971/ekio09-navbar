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
      {console.log(percentage)}

      <style jsx>{`
        .status-bar-container {
          display: flex;
          align-items: center;
        }

        .status-bar {
          width: 60%;
          height: 22px;
          background-color: #D9D9D9;
          transform: translate(520px, -8px);
        }

        .status-fill {
          height: 100%;
          background-color: #55B600;
        }

        .status-percent {
          margin-left: 10px;
        }
      `}</style>
    </div>
  );
};

export default StatusBar;
