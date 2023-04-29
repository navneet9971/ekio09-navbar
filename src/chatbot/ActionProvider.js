import React from 'react';

const ActionProvider = ({ createChatBotMessage, setState, children }) => {
  const handleHello = () => {
    const botMessage = createChatBotMessage('Hello. Nice to meet you.');

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };

  const handleBIS = () => {
    const botMessage = createChatBotMessage(
      "How Can I help You in BIS Compliance",
    );

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };

  const handleTEC = () => {
    const botMessage = createChatBotMessage(
      "How Can I help You in TEC Compliance",
    );

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };

  const handleRegister = () => {
    const botMessage = createChatBotMessage(
      "This is register process",
    );

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };

  const handleBye = () => {
    const botMessage = createChatBotMessage(
      "Thank You!! Have Good Day!!",
    );

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };


  // Put the handleHello and handleDog function in the actions object to pass to the MessageParser
  return (
    <div>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          actions: {
            handleHello,
            handleBIS,
            handleTEC,
            handleRegister,
            handleBye,
          },
        });
      })}
    </div>
  );
};

export default ActionProvider;