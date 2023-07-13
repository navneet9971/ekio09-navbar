import React, { useState, useEffect } from 'react';
import { Widget, addResponseMessage, setQuickButtons } from 'react-chat-widget';
import 'react-chat-widget/lib/styles.css';
import axiosInstance from '../../interceptors/axios';

const Chatbot = () => {
  const [sendingMessage, setSendingMessage] = useState(false); // Track if a message is being sent

  const uniqueid = localStorage.getItem('unique');
  const complianceid = localStorage.getItem('compliance_id');

  const [state, setState] = useState({ messages: [] }); // Define state for chat messages

  useEffect(() => {
    const buttons = [{ label: 'Yes', value: '1' }, { label: 'No', value: '2' }];
    addResponseMessage('Are you satisfied?'); // Initial question
    setQuickButtons(buttons);
  }, []);

  const handleFormSubmit = async (message) => {
    if (sendingMessage) {
      // Avoid sending duplicate messages
      return;
    }

    try {
      setSendingMessage(true); // Set sendingMessage to true when a message is being sent

      const buttons = [
        { label: 'Portal Registration', value: 'Portal Registration' },
        { label: 'Initiation of Testing', value: 'Initiation of Testing' },
        { label: 'AIR registration', value: 'AIR registration' },
        { label: 'Foreign OEM Registration', value: 'Foreign OEM Registration' },
        { label: 'BOM Submission', value: 'BOM Submission' },
        { label: 'Application Payment', value: 'Application Payment' },
        { label: 'Final Submission', value: 'Final Submission' },
        { label: 'Issuance of certification', value: 'Issuance of certification' },
      ];

      if (message === '1') {
        // User clicked 'Yes'
        addResponseMessage('Thank you!');
      } else if (message === '2') {
        // User clicked 'No'
        addResponseMessage('Please choose an option:');
        setQuickButtons(buttons);
      } else {
        // Make API call for other messages
        const formData = new FormData();
        formData.append('uniqueid', uniqueid);
        formData.append('compliance', complianceid);
        formData.append('issue', message);

        const response = await axiosInstance.post('chatbot/', formData);
        console.log(response.data.message);

        const botMessage = JSON.stringify(response.data.message);
        addResponseMessage(botMessage);
      }
    } catch (error) {
      console.error('API request failed:', error);
    } finally {
      setSendingMessage(false); // Reset sendingMessage to false when the message is sent or an error occurs
    }

    // Remove the quick buttons from the user's side after a response is sent
    if (message === '1' || message === '2') {
      setTimeout(() => {
        const quickButtons = [];
        setQuickButtons(quickButtons);
      }, 0);
    } else {
      // Remove the message from the user's side after it is sent
      setTimeout(() => {
        const messageIndex = state.messages.findIndex((m) => m.message === message);
        if (messageIndex !== -1) {
          state.messages.splice(messageIndex, 1);
          setState({ ...state });
        }
      }, 0);
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
          senderPlaceHolder="Type a message..."
          showCloseButton={true}
          fullScreenMode={false}
          badge={0}
          autofocus={true}
          customLauncher={<button className="custom-launcher-button">Chat with us</button>}
          customSubmitButton={<button className="custom-submit-button">Send</button>}
          handleQuickButtonClicked={(message) => handleNewUserMessage(message)}
          quickButtons={[
            { label: 'YES', value: 'YES' },
            { label: 'NO', value: 'NO' },
          ]}
        />
      </div>
    </div>
  );
};

export default Chatbot;
