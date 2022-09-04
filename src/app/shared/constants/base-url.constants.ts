
import { environment } from 'src/environments/environment';

// export const  WEBSOCKET_ENDPOINT = "http://localhost:8081/ws-notification";
// export const  WEBSOCKET_NOTIFY_TOPIC = '/topic/notif';


export const  WEBSOCKET_ENDPOINT = "http://localhost:5000/ws-notification";
export const  WEBSOCKET_ELEMENTS_STATUS = '/topic/elements/status';
export const  WEBSOCKET_ORDER_STATUS_CHANGED = '/topic/order/status/changed';
export const  WEBSOCKET_CALL_WAITER = '/topic/call/waiter';
export const  WEBSOCKET_ELEMENTS_CREATED = '/topic/elements/created';