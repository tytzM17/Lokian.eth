import { VoidFunction } from "../components/common/interfaces"

/**
 * Recursively wait for websocket connection
 * 
 * @param  {WebSocket} ws
 * @param  {VoidFunction} callback
 * @param  {number} interval
 */
const waitForWsConnection = (ws: WebSocket, callback: VoidFunction, interval: number) => {
  if (ws?.readyState === 1) {
    callback()
  } else {
    setTimeout(function () {
      waitForWsConnection(ws, callback, interval)
    }, interval)
  }
}

export default waitForWsConnection
