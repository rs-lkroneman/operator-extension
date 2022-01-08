import extension, { Connection } from "src/api/extension";

class ConnectionClient {
  private static connection: Connection | null = null;

  static connect() {
    ConnectionClient.connection = extension.connect({
      name: "ConnectionClient.name",
    });

    if (ConnectionClient.connection) {
      ConnectionClient.connection.onDisconnect.addListener(
        ConnectionClient.onDisconnect
      );
    }
  }

  static addListener(callback) {
    if (!ConnectionClient.connection) {
      ConnectionClient.connect();
      return;
    }

    ConnectionClient.connection.onMessage.addListener(callback);
  }

  static onDisconnect() {
    ConnectionClient.connection = null;
  }

  static sendMessage(...args) {
    if (!ConnectionClient.connection) {
      ConnectionClient.connect();
      return;
    }

    ConnectionClient.connection.postMessage(...args);
  }
}

export default ConnectionClient;
