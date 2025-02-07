const ws = new WebSocket("ws://localhost:8080");

ws.onopen = () => {
  console.log("서버에 연결됨");
};

// 사용자 고유 ID 생성
const userId = "user-" + Math.random().toString(36).substr(2, 9);
const userName = "User " + userId.slice(-3);
const cursors = {};

// 문자열을 색상으로 변환하는 함수
const stringToColor = (str) => {
  let hash = 0;

  for (let i = 0; i < str.length; i += 1) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";
  const BRIGHTNESS_LIMIT = 180;

  for (let i = 0; i < 3; i += 1) {
    let value = (hash >> (i * 8)) & 0xff;
    value = Math.min(value, BRIGHTNESS_LIMIT);
    color += `00${value.toString(16)}`.slice(-2);
  }

  return color;
};

// SVG 화살표를 불러와서 사용자 커서로 설정
const loadArrowSVG = async (id, color) => {
  const response = await fetch("arrow.svg");
  const svgText = await response.text();

  // SVG를 div에 추가
  const wrapper = document.createElement("div");
  wrapper.className = "cursor";
  wrapper.id = id;
  wrapper.innerHTML = svgText;

  // 색상 변경
  const path = wrapper.querySelector("path");
  if (path) path.setAttribute("fill", color);

  // 라벨 추가
  const label = document.createElement("div");
  label.className = "cursor-label";
  label.innerText = id.slice(-3);
  label.style.background = color;
  wrapper.appendChild(label);

  document.body.appendChild(wrapper);
};

// 수신 (다른 사용자 커서 업데이트)
ws.onmessage = async (event) => {
  const { id, x, y, visible } = JSON.parse(event.data);
  let cursor = document.getElementById(id);

  if (!cursor) {
    const color = stringToColor(id);
    await loadArrowSVG(id, color);
    cursor = document.getElementById(id);
  }

  if (!visible) {
    cursor.style.display = "none";
  } else {
    cursor.style.display = "block";
    cursor.style.left = `${x}px`;
    cursor.style.top = `${y}px`;
  }
};

// 커서 위치 전송
const sendMyCursorData = (e) => {
  const cursorData = {
    id: userId,
    x: e.clientX,
    y: e.clientY,
    visible: true,
  };

  ws.send(JSON.stringify(cursorData));
};

// 화면 밖으로 나가면 숨기기
const handleMouseLeave = () => {
  const cursorData = {
    id: userId,
    visible: false,
  };

  ws.send(JSON.stringify(cursorData));
};

document.addEventListener("mousemove", sendMyCursorData);
document.addEventListener("mouseleave", handleMouseLeave);

// TODO: 이름뿐만 아니라 아이디도 포함해서 색상 변경
