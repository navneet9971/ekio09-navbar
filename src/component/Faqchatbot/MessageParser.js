class MessageParser {
    constructor(actionProvider) {
      this.actionProvider = actionProvider;
    }
  
    parse(message) {
      const lowercase = message.toLowerCase();
  
      if (lowercase.includes('hello')) {
        this.actionProvider.greet();
      }
  
      if (lowercase.includes('what is TCS?')) {
        this.actionProvider.handleReactInfo();
      }
  
      if (lowercase.includes('what is BIS?')) {
        this.actionProvider.handleReduxInfo();
      }
  
      if (lowercase.includes('what is LAB TESTING?')) {
        this.actionProvider.handleNodeInfo();
      }
    }
  }
  
  export default MessageParser;
  