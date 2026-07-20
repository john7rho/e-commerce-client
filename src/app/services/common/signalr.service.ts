import { Injectable } from '@angular/core';
import {
  HubConnection,
  HubConnectionBuilder,
  HubConnectionState,
} from '@microsoft/signalr';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SignalRService {
  private _connection: HubConnection;

  get connection(): HubConnection {
    return this._connection;
  }

  start(hubUrl: string) {
    // Offline / mock-backend demos: never open a live hub (avoids reconnect spam).
    if (!environment.realtimeEnabled) {
      return;
    }

    if (
      !this.connection ||
      this.connection?.state == HubConnectionState.Disconnected
    ) {
      const builder: HubConnectionBuilder = new HubConnectionBuilder();
      const connection: HubConnection = builder
        .withUrl(hubUrl)
        .withAutomaticReconnect()
        .build();

      connection
        .start()
        .then(() => console.log('Connected'))
        .catch((error) => setTimeout(() => this.start(hubUrl), 2000));
      this._connection = connection;
    }

    this._connection.onreconnected((connectionId) =>
      console.log('Reconnected')
    );
    this._connection.onreconnecting((error) => console.log('Reconnecting'));
    this._connection.onclose((error) => console.log('Close reconnection'));
  }

  invoke(
    methodName: string,
    message: any,
    successCallback?: (value) => void,
    errorCallback?: (error) => void
  ) {
    if (!environment.realtimeEnabled || !this.connection) {
      return;
    }
    this.connection
      .invoke(methodName, message)
      .then(successCallback)
      .catch(errorCallback);
  }

  on(methodName: string, callBack: (...message: any) => void) {
    if (!environment.realtimeEnabled || !this.connection) {
      return;
    }
    this.connection.on(methodName, callBack);
  }
}
