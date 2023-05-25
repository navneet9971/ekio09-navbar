import React from 'react';

const StatusBar = ({ totalResponses, completedResponses }) => {
  const percentage = ((completedResponses / totalResponses) * 100).toFixed(2);
     

  return (
    <div className='status-bar'>
      <div
        style={{
          display: "flex",
        justifyContent: "flex-start",
        position: "absolute",
          width: '51%',
          height: '20px',
          left: "418px",
          top: "200px",
          backgroundColor: '#fff',
          borderRadius: '50px',
        }}
      >
        <div
          style={{
            width: `${percentage}%`,
            height: '100%',
            backgroundColor: '#55B600',
            borderRadius: '50px',
          }}
        />
      </div>
      <p className='status-percent'>{`${percentage}% `}</p>
    </div>
  );
};

export default StatusBar;
