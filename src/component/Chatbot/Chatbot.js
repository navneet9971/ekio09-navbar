import React, { useState, useEffect } from 'react';
import { Widget, addResponseMessage } from 'react-chat-widget';
import 'react-chat-widget/lib/styles.css';
import axiosInstance from '../../interceptors/axios';

const Chatbot = () => {
  const [sendingMessage, setSendingMessage] = useState(false);
  const [initialMessageDisplayed, setInitialMessageDisplayed] = useState(false);

  const uniqueid = localStorage.getItem('unique');
  const complianceid = localStorage.getItem('compliance_id');

  useEffect(() => {
    if (!initialMessageDisplayed) {
      setInitialMessageDisplayed(true);
      addResponseMessage('Hello, how can I help you?');
    }
  }, [initialMessageDisplayed]);

  const handleFormSubmit = async (message) => {
    if (sendingMessage) {
      return;
    }

    try {
      setSendingMessage(true);

      const formData = new FormData();
      formData.append('uniqueid', uniqueid);
      formData.append('compliance', complianceid);
      formData.append('issue', message);

      const response = await axiosInstance.post('chatbot/', formData);
      const botMessage = JSON.stringify(response.data.message);
      addResponseMessage(botMessage);
    } catch (error) {
      console.error('API request failed:', error);
    } finally {
      setSendingMessage(false);
    }
  };

  const handleNewUserMessage = (message) => {
    handleFormSubmit(message);
  };

  return (
    <div className="chatbot-container">
      <div className="floating-chat">
        <Widget
          handleNewUserMessage={handleNewUserMessage}
          title="Chat"
          subtitle="Ask me anything"
          showChat={true} // Display the chat widget without needing to click
        />
      </div>
    </div>
  );
};

export default Chatbot;
