import { ReactNode, useEffect, useRef, useState } from "react";
import Cursor from "./Cursor";

export interface CursorData {
  id: string;
  x: number;
  y: number;
  visible: boolean;
  name: string;
}

interface Props {
  children: ReactNode;
  channel?: string;
  myName?: string;
}

export default function CoCursorProvider({ children, channel, myName }: Props) {
  const [cursors, setCursors] = useState<Record<string, CursorData>>({});
  const ws = useRef<WebSocket | null>(null);
  const userId = useRef(`user-${Math.random().toString(36).substring(2, 11)}`);
  const userName = useRef(myName || `anonymous`);

  useEffect(() => {
    let wsURL = `ws://localhost:8080`;
    if (channel) {
      wsURL = `ws://localhost:8080?channel=${channel}`;
    }

    ws.current = new WebSocket(wsURL, [import.meta.env.VITE_COCURSOR_API_KEY]);

    ws.current.onmessage = (event) => {
      const cursorData: CursorData = JSON.parse(event.data);
      setCursors((prev) => ({ ...prev, [cursorData.id]: cursorData }));
    };

    return () => {
      ws.current?.close();
    };
  }, [channel]);

  const sendCursorPosition = (e: MouseEvent) => {
    if (!ws.current || ws.current.readyState !== WebSocket.OPEN) return;

    const cursorData: CursorData = {
      id: userId.current,
      x: e.pageX,
      y: e.pageY,
      visible: true,
      name: userName.current,
    };
    ws.current?.send(JSON.stringify(cursorData));
  };

  const handleMouseLeave = () => {
    if (!ws.current || ws.current.readyState !== WebSocket.OPEN) return;

    const cursorData = {
      id: userId.current,
      visible: false,
    };
    ws.current?.send(JSON.stringify(cursorData));
  };

  useEffect(() => {
    window.addEventListener("mousemove", sendCursorPosition);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", sendCursorPosition);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <>
      {Object.values(cursors).map((cursorData) => (
        <Cursor key={cursorData.id} data={cursorData} />
      ))}
      {children}
    </>
  );
}
