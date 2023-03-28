class ActionProvider {
    constructor(createChatBotMessage) {
      this.createChatBotMessage = createChatBotMessage;
    }
  
    greet() {
      const message = this.createChatBotMessage('Hello there!');
      this.addMessageToState(message);
    }
  
    handleReactInfo() {
      const message = this.createChatBotMessage(
        'React is a JavaScript library for building user interfaces.',
      );
      this.addMessageToState(message);
    }
  
    handleReduxInfo() {
      const message = this.createChatBotMessage(
        'Redux is a predictable state container for JavaScript apps.',
      );
      this.addMessageToState(message);
    }
  
    handleNodeInfo() {
      const message = this.createChatBotMessage(
        'Node.js is a JavaScript runtime built on Chrome\'s V8 JavaScript engine.',
      );
      this.addMessageToState(message);
    }
  
    addMessageToState(message) {
      this.setState((prevState) => ({
        ...prevState,
        messages: [...prevState.messages, message],
      }));
    }
  }
  
  export default ActionProvider;
  