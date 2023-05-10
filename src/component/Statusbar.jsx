import React from 'react';

const StatusBar = ({ totalResponses, completedResponses }) => {
  const percentage = (completedResponses / totalResponses) * 100;
     

  return (
    <div className='status-bar'>
      <div
        style={{
          width: '31%',
          height: '20px',
          backgroundColor: '#e2180e',
          borderRadius: '50px',
        }}
      >
        <div
          style={{
            width: `${percentage}%`,
            height: '100%',
            backgroundColor: 'green',
            borderRadius: '50px',
          }}
        />
      </div>
      <p>{`${percentage}% Completed`}</p>
    </div>
  );
};

export default StatusBar;
