/* eslint-disable no-undef */
type Connection = {
  onDisconnect: {
    addListener: (callback: Function) => void
  },
  onMessage: {
    addListener: (callback: Function) => void
  },
  postMessage: any
}

class ConnectionClient {
  private static connection: Connection = null;
  name = "chrome_runner";

  static connect() {
    // @ts-ignore
    ConnectionClient.connection = chrome.extension.connect({
      name: 'ConnectionClient.name',
    });

    if(ConnectionClient.connection) {
      ConnectionClient.connection.onDisconnect.addListener(
        ConnectionClient.onDisconnect
      );
    }
  }

  static addListener(callback) {
    if(!ConnectionClient.connection) {
      ConnectionClient.connect();
    }

    ConnectionClient.connection.onMessage.addListener(callback);
  }

  static onDisconnect() {
    ConnectionClient.connection = null;
  }

  static sendMessage(...args) {
    if(!ConnectionClient.connection) {
      ConnectionClient.connect();
    }

    ConnectionClient.connection.postMessage(...args);
  }
}

export default ConnectionClient;
