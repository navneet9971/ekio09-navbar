import React, { useState, useEffect } from 'react';
import ChatBot from 'react-simple-chatbot';

const MainChatbot = () => {
  const [isOpen, setIsOpen] = useState(false); // State to track if the chatbot is open or closed

  const handleToggleFloating = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const observer = new MutationObserver((mutationsList) => {
      for (const mutation of mutationsList) {
        if (mutation.type === 'childList') {
          // Handle the DOM changes here (if needed)
        }
      }
    });

    const chatbotContainer = document.querySelector('.rsc-container'); // Adjust the selector based on the class name of the chatbot container

    observer.observe(chatbotContainer, { childList: true });

    return () => {
      observer.disconnect();
    };
  }, []); // Make sure to include an empty dependency array to ensure this effect runs only once

  const steps = [
    {
      id: '1',
      message: 'Which compliance do you want to know?',
      trigger: 'complianceOptions',
    },
    {
      id: 'complianceOptions',
      options: [
        { value: 'BIS', label: 'BIS', trigger: 'BIS' },
        { value: 'TEC', label: 'TEC', trigger: 'TEC' },
        { value: 'BIS-ISI', label: 'BIS-ISI', trigger: 'BIS-ISI' },
        { value: 'EPR', label: 'EPR', trigger: 'EPR' },
        { value: 'WPC', label: 'WPC', trigger: 'WPC' },
      ],
    },
    {
      id: 'BIS',
      message: 'You selected BIS compliance.',
      trigger: 'askStack',
    },
    {
      id: 'TEC',
      message: 'You selected TEC compliance.',
      trigger: 'askStack',
    },
    {
      id: 'BIS-ISI',
      message: 'You selected BIS-ISI compliance.',
      trigger: 'askStack',
    },
    {
      id: 'EPR',
      message: 'You selected EPR compliance.',
      trigger: 'askStack',
    },
    {
      id: 'WPC',
      message: 'You selected WPC compliance.',
      trigger: 'askStack',
    },
    {
      id: 'askStack',
      message: 'Where are you stuck?',
      trigger: 'stackOptions',
    },
    {
      id: 'stackOptions',
      options: [
        {
          value: 'Know Your compliance',
          label: 'Know Your compliance',
          trigger: 'Know Your compliance',
        },
        {
          value: 'Track ON page Modification',
          label: 'Track ON page Modification',
          trigger: 'Track ON page Modification',
        },
        { value: 'Other', label: 'Other', trigger: 'userInput' }, // Add option for free text input
      ],
    },
    {
      id: 'Know Your compliance',
      message: 'Here is information about your compliance.',
      end: true,
    },
    {
      id: 'Track ON page Modification',
      message: 'Here is how you can track on page modification.',
      end: true,
    },
    {
      id: 'userInput',
      message: 'Please enter your message:',
      trigger: 'userInputField',
    },
    {
      id: 'userInputField',
      user: true, // Capture user input
      trigger: 'userInputResponse',
    },
    {
      id: 'userInputResponse',
      message: 'You entered: {previousValue}', // Display the user's input
      end: true,
    },
  ];

  return (
    <div>
      {/* Render chatbot component if isOpen is true */}
      <ChatBot
        className="chatbot"
        steps={steps}
        isOpen={isOpen}
        onToggleFloating={handleToggleFloating}
        headerTitle="Eikomp ChatBot"
        floating={true}
        //   botAvatar={<img src={Botface} alt="" />}
      />

      {/* Add the iframe element */}
      {/* Add the iframe element with a unique title */}
    </div>
  );
};

export default MainChatbot;
