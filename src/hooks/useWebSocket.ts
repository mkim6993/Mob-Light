import { BaseEffect } from '@/types/effects';
import { useEffect, useRef, useState } from 'react';

// const WS_URL = 'ws://127.0.0.1:3000/party/ws';

export const usePartyWebSocket = (url: string) => {
  const [connected, setConnected] = useState(false);
  const [lastMessage, setLastMessage] = useState<any>(null);
  const ws = useRef<WebSocket | null>(null);

  useEffect(() => {
    if (!url) return;
    ws.current = new WebSocket(url);

    // Called when connection is established
    ws.current.onopen = () => {
      console.log('WebSocket connected');
      setConnected(true);
    };

    // Called when a message is received from the server
    ws.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setLastMessage(data);
    };

    // Called when an error occurs
    ws.current.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    // Called when connection is closed
    ws.current.onclose = () => {
      console.log('WebSocket disconnected');
      setConnected(false);
    };

    // Cleanup: close connection when component unmounts
    return () => {
      ws.current?.close();
    };
  }, []);

  const sendMessage = (data: BaseEffect) => {
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