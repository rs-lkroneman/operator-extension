import runtime from "src/api/runtime";

type Port = chrome.runtime.Port;

class ConnectionClient {
  private static connectionName: string = "Util Runner";
  private static connection: Port | null = null;

  static connect() {
    ConnectionClient.connection = runtime.connect({
      name: ConnectionClient.connectionName,
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

    // @ts-ignore
    ConnectionClient.connection.postMessage(...args);
  }
}

export default ConnectionClient;
