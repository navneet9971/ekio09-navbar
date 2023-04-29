// in MessageParser.jsx
import React from 'react';

const MessageParser = ({ children, actions }) => {
  const parse = (message) => {
    if (message.includes('hello')) {
      actions.handleHello();
    }

    if (message.includes('What is BIS')) {
      actions.handleBIS();
    }

    if (message.includes('What is TEC')) {
        actions.handleTEC();
      }

      if (message.includes('Register')) {
        actions.handleRegister();
      }

      if (message.includes('Bye')) {
        actions.handleBye();
      }
  };



  return (
    <div>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          parse: parse,
          actions,
        });
      })}
    </div>
  );
};

export default MessageParser;