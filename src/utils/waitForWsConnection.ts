/**
 * Recursively wait for websocket connection
 *
 * @param  {WebSocket} ws
 * @param  {any} callback
 * @param  {number} interval
 * @return {void}
 */


// eslint-disable-next-line @typescript-eslint/no-explicit-any
const waitForWsConnection = (ws: WebSocket, callback: any, interval: number): void => {
  if (ws?.readyState === 1) {
    if (callback) callback()
  } else {
    setTimeout(function () {
      waitForWsConnection(ws, callback, interval)
    }, interval)
  }
}

export default waitForWsConnection
