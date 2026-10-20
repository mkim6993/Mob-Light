import { useEffect, useRef, useState } from 'react';

const WS_URL = 'ws://127.0.0.1:3000/party/ws';

export const usePartyWebSocket = () => {
  const [connected, setConnected] = useState(false);
  const [lastMessage, setLastMessage] = useState<any>(null);
  const ws = useRef<WebSocket | null>(null);

  useEffect(() => {
    ws.current = new WebSocket(WS_URL);

    ws.current.onopen = () => {
      console.log('WebSocket connected');
      setConnected(true);
    };

    ws.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setLastMessage(data);
    };

    ws.current.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    ws.current.onclose = () => {
      console.log('WebSocket disconnected');
      setConnected(false);
    };

    return () => {
      ws.current?.close();
    };
  }, []);

  const sendMessage = (data: any) => {
    console.log('calling send message.\nws.current.readyState?', ws.current?.readyState, 'WebSocket.OPEN', WebSocket.OPEN);
    if (ws.current?.readyState === WebSocket.OPEN) {
      ws.current.send(JSON.stringify(data));
    }
  };

  return {
    connected,
    lastMessage,
    sendMessage
  };
}