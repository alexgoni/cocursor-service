import { ReactNode, useCallback, useEffect, useRef, useState } from "react";
import Cursor from "./Cursor";
import throttle from "../utils/throttle";

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
  blockInfoSend?: boolean;
  quality?: "high" | "middle" | "low";
}

export default function CoCursorProvider({
  children,
  channel,
  myName,
  blockInfoSend = false,
  quality = "high",
}: Props) {
  const [cursors, setCursors] = useState<Record<string, CursorData>>({});
  const ws = useRef<WebSocket | null>(null);
  const userId = useRef(`user-${Math.random().toString(36).substring(2, 11)}`);
  const userName = useRef(myName || `anonymous`);

  // 웹소켓 연결 및 설정
  useEffect(() => {
    let wsURL = `ws://localhost:8080`;
    if (channel) {
      wsURL = `ws://localhost:8080?channel=${channel}`;
    }

    // 웹소켓 연결
    ws.current = new WebSocket(wsURL, [import.meta.env.VITE_COCURSOR_API_KEY]);

    // 웹소켓 메시지 수신
    ws.current.onmessage = (event) => {
      const cursorData: CursorData = JSON.parse(event.data);
      setCursors((prev) => ({ ...prev, [cursorData.id]: cursorData }));
    };

    return () => {
      // 웹소켓 연결 종료
      ws.current?.close();
    };
  }, [channel]);

  const sendCursorPosition = useCallback(
    (e: MouseEvent) => {
      if (
        !ws.current ||
        ws.current.readyState !== WebSocket.OPEN ||
        blockInfoSend
      ) {
        return;
      }

      const cursorData: CursorData = {
        id: userId.current,
        x: e.pageX,
        y: e.pageY,
        visible: true,
        name: userName.current,
      };
      ws.current?.send(JSON.stringify(cursorData));
    },
    [blockInfoSend]
  );
  const throttleMS = (() => {
    if (quality === "high") return 0;
    if (quality === "middle") return 10;
    if (quality === "low") return 30;
    return 0;
  })();
  const throttledSendCursorPosition = throttle(sendCursorPosition, throttleMS);

  const sendCursorOff = () => {
    if (!ws.current || ws.current.readyState !== WebSocket.OPEN) {
      return;
    }

    const cursorData = {
      id: userId.current,
      visible: false,
    };
    ws.current?.send(JSON.stringify(cursorData));
  };

  // 마우스 움직임에 따른 메시지 송신
  useEffect(() => {
    window.addEventListener("mousemove", throttledSendCursorPosition);
    document.addEventListener("mouseleave", sendCursorOff);

    return () => {
      window.removeEventListener("mousemove", throttledSendCursorPosition);
      document.removeEventListener("mouseleave", sendCursorOff);
    };
  }, [throttledSendCursorPosition]);

  // 정보 송신 거부 시 커서 삭제
  useEffect(() => {
    if (blockInfoSend) {
      sendCursorOff();
    }
  }, [blockInfoSend]);

  return (
    <>
      {Object.values(cursors).map((cursorData) => (
        <Cursor key={cursorData.id} data={cursorData} />
      ))}
      {children}
    </>
  );
}
