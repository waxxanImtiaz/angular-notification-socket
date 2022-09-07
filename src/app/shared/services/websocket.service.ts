import { Injectable } from '@angular/core';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import { WEBSOCKET_ENDPOINT, WEBSOCKET_ELEMENTS_STATUS, WEBSOCKET_ORDER_STATUS_CHANGED, WEBSOCKET_CALL_WAITER, WEBSOCKET_ELEMENTS_CREATED } from '../constants/base-url.constants';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  stompClient: any;
  constructor(private notificationService: NotificationService) { }

  connect(): void {
    var token = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiI2MjczY2IxZGJkMzhiMDJlMTZiOTFjYjAiLCJjb21hcHlJZCI6IjYyNzNjYjFkYmQzOGIwMmUxNmI5MWNiMCIsImlzQWRtaW4iOmZhbHNlLCJyZXN0YXVyYW50SWQiOiI2MjczY2IxZGJkMzhiMDJlMTZiOTFjYjIiLCJhdXRob3JpdGllcyI6Ik5FV19VU0VSIiwiZXhwIjoxNjYyODgxMjg3LCJpYXQiOjE2NjIyNzY0ODd9.KYbOR_Og0O_7mNarqXYD-gpdgqMu77bDM4RmM3dCRGN75kcDhohN40J9bcrT0g4xz2Pji3rmT7YDiFulvIp1mg";

    console.log('webSocket Connection');
    //const ws = new SockJS(`http://localhost:5000/ws-notification`);
    const ws = new SockJS(`http://localhost:5000/ws-notification?token=${token}`);
    // const ws = new SockJS(WEBSOCKET_ENDPOINT);
    this.stompClient = Stomp.over(ws);
    const _this = this;
   
    var header = {
      Authorization: `Bearer ${token}`
    };
    _this.stompClient.connect(header, function(frame:any) {
      _this.stompClient.subscribe(WEBSOCKET_ORDER_STATUS_CHANGED + "/6273cb1dbd38b02e16b91cb2", function(sdkEvent: any) {
          _this.onMessageReceived(sdkEvent);
      });
  }, this.errorCallBack);

//   _this.stompClient.connect({}, function(frame:any) {
//     _this.stompClient.subscribe(WEBSOCKET_ELEMENTS_STATUS + "/6273cb1dbd38b02e16b91cb2", function(sdkEvent: any) {
//         _this.onMessageReceived(sdkEvent);
//     });
// }, this.errorCallBack);

// _this.stompClient.connect({}, function(frame:any) {
//   _this.stompClient.subscribe(WEBSOCKET_CALL_WAITER + "/6273cb1dbd38b02e16b91cb2", function(sdkEvent: any) {
//       _this.onMessageReceived(sdkEvent);
//   });
// }, this.errorCallBack);

// _this.stompClient.connect({}, function(frame:any) {
//   _this.stompClient.subscribe(WEBSOCKET_ELEMENTS_CREATED + "/6273cb1dbd38b02e16b91cb2", function(sdkEvent: any) {
//       _this.onMessageReceived(sdkEvent);
//   });
// }, this.errorCallBack);
}


  disconnect(): void {
    if (this.stompClient !== null) {
      this.stompClient.disconnect();
    }
    console.log('Disconnected');
  }

   // on error, schedule a reconnection attempt
   errorCallBack(error: any) {
    console.log('errorCallBack -> ' + error);
    setTimeout(() => {
        this.connect();
    }, 5000);
}
  onMessageReceived(message: any) {
    console.log('Message Recieved from Server :: ' + message);
   // Emits the event.
    this.notificationService.notificationMessage.emit(JSON.parse(message.body));
  }

}
