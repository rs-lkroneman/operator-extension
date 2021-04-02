/* eslint-disable no-undef */
class ConnectionClient {
  connection = null;
  name = "chrome_runner";

  static connect() {
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
