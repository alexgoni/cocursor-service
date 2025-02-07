const WebSocket = require("ws");

const wss = new WebSocket.Server({ port: 8080 });

wss.on("connection", (ws) => {
  console.log("새로운 사용자가 연결됨");

  // 수신
  ws.on("message", (data) => {
    const cursorData = JSON.parse(data);

    wss.clients.forEach((client) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        // 송신
        client.send(JSON.stringify(cursorData));
      }
    });
  });

  ws.on("close", () => {
    console.log("사용자가 연결을 종료함");
  });
});

console.log("웹소켓 서버가 8080번 포트에서 실행 중...");
