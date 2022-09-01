
import { environment } from 'src/environments/environment';

// export const  WEBSOCKET_ENDPOINT = "http://localhost:8081/ws-notification";
// export const  WEBSOCKET_NOTIFY_TOPIC = '/topic/notif';


export const  WEBSOCKET_ENDPOINT = "http://localhost:5000/ws-notification";
export const  WEBSOCKET_ELEMENTS_STATUS = '/topic/elements/created';
export const  WEBSOCKET_NOTIFY_TOPIC = '/topic/elements/status';
export const  WEBSOCKET_CALL_WAITER = '/topic/call/waiter';