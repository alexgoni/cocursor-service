import { ReactNode, useEffect, useRef, useState } from "react";
import Cursor from "./Cursor";

const WS_URL = "ws://localhost:8080";

export interface CursorData {
  id: string;
  x: number;
  y: number;
  visible: boolean;
  name: string;
}

export default function CoCursorProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [cursors, setCursors] = useState<Record<string, CursorData>>({});
  const ws = useRef<WebSocket | null>(null);
  const userId = useRef(`user-${Math.random().toString(36).substr(2, 9)}`);
  const userName = useRef(`User ${userId.current.slice(-3)}`);

  useEffect(() => {
    ws.current = new WebSocket(WS_URL);

    ws.current.onmessage = (event) => {
      const cursorData: CursorData = JSON.parse(event.data);
      setCursors((prev) => ({ ...prev, [cursorData.id]: cursorData }));
    };

    return () => {
      ws.current?.close();
    };
  }, []);

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
