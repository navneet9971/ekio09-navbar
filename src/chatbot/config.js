import { createChatBotMessage } from 'react-chatbot-kit';
import CreateFeature from './widgets/CreateFeature';

const config = {
  initialMessages: [createChatBotMessage(`Welcome! Eikomp Chat`)],
  widgets: [
    {
        widgetName: 'createFeature',
        widgetFunc: props => <CreateFeature {...props} />,
    },
  ],
};

export default config;