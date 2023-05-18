import React, { useState, useEffect } from 'react';
import { Widget, addResponseMessage } from 'react-chat-widget';
import 'react-chat-widget/lib/styles.css';
import axiosInstance from '../../interceptors/axios';

const Chatbot = () => { 
  const [sendingMessage, setSendingMessage] = useState(false); // Track if a message is being sent

  const uniqueid = localStorage.getItem('unique');
  const complianceid = localStorage.getItem('compliance_id');

  useEffect(() => {
    addResponseMessage('Hello, how can I help you?');
  }, []);


  const handleFormSubmit = async (message) => {
    if (sendingMessage) {
      // Avoid sending duplicate messages
      return;
    }

    try {
      setSendingMessage(true); // Set sendingMessage to true when a message is being sent

      const formData = new FormData();
      formData.append('uniqueid', uniqueid);
      formData.append('compliance', complianceid);
      formData.append('issue', message);

      const response = await axiosInstance.post('chatbot/', formData);
      console.log(response.data.message);

      const botMessage = JSON.stringify(response.data.message);
      addResponseMessage(botMessage);
    } catch (error) {
      console.error('API request failed:', error);
    } finally {
      setSendingMessage(false); // Reset sendingMessage to false when the message is sent or an error occurs
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
        />
      </div>
    </div>
  );
};

export default Chatbot;
