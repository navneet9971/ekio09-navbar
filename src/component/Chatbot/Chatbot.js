import React, { useState, useEffect } from 'react';
import axiosInstance from '../../interceptors/axios';

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const uniqueid = localStorage.getItem('unique');
  const complianceid = localStorage.getItem('compliance_id');

  useEffect(() => {
    const initialMessage = { text: 'Hello, how can I help you?', sender: 'bot' };
    setMessages([initialMessage]);
  }, []);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    if (inputValue.trim() !== '') {
      const userMessage = { text: inputValue, sender: 'user' };
      setMessages([...messages, userMessage]);
      sendMessageToApi(inputValue);
      setInputValue('');
    }
  };

  const sendMessageToApi = async (message) => {
    try {
      const formData = new FormData();
      formData.append('uniqueid', uniqueid);
      formData.append('compliance', complianceid);
      formData.append('issue', message);

      const response = await axiosInstance.post('chatbot/', formData);
      console.log(response.data.message);

      const botMessage = {
        text: JSON.stringify(response.data.message),
        sender: 'bot',
      };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      console.error('API request failed:', error);
    }
  };

  return (
    <div className="chatbot-container">
      <div className="chatbox">
        {messages.map((message, index) => (
          <div key={index} className={`message12 ${message.sender}`}>
            {message.text}
          </div>
        ))}
      </div>
      <form onSubmit={handleFormSubmit} className="chat-form">
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Type your message..."
          className="input-field"
        />
        <button type="submit" className="send-button">
          Send
        </button>
      </form>
    </div>
  );
};

export default Chatbot;
