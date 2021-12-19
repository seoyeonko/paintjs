const canvas = document.getElementById('jsCanvas');
const ctx = canvas.getContext('2d'); // 캔버스에 그림그리는 도구를 얻어내기
const colors = document.getElementsByClassName('jsColor');
const range = document.getElementById('jsRange');
const mode = document.getElementById('jsMode');
const saveBtn = document.getElementById('jsSave');

const INITAL_COLOR = '#2c2c2c';
const CANVAS_SIZE = 700;

// canvas size
canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

// set default background-color
ctx.fillStyle = 'white';
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

ctx.strokeStyle = INITAL_COLOR;
ctx.fillStyle = INITAL_COLOR;
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;

function stopPainting() {
  painting = false;
}

function startPainting() {
  painting = true;
}

function onMouseMove(evnet) {
  const x = event.offsetX;
  const y = event.offsetY;

  if (!painting) {
    // painting === false; 클릭하지 않고 마우스를 움직이기만 했을 때
    ctx.beginPath(); // 1) 새로운 빈 경로 생성
    ctx.moveTo(x, y); // 2) 시작점 설정
  } else {
    // mousedown 이벤트 발생 (startPainting) > painting === true > else문 실행
    ctx.lineTo(x, y); // 3) 끝점 설정
    ctx.stroke(); // 4) 경로를 그리기 (외곽선)
  }
}

function handleColorClick(event) {
  const color = event.target.style.backgroundColor;
  // console.log(color);
  ctx.strokeStyle = color; // 색 변경
  ctx.fillStyle = color; // 색 채우기 색 변경
}

function handleRangeChange(event) {
  const size = event.target.value;
  console.log(event.target.value);
  ctx.lineWidth = size;
}

function handleModeClick() {
  if (filling === true) {
    filling = false;
    mode.innerText = 'Fill';
  } else {
    filling = true;
    mode.innerText = 'Paint';
  }
}

function handleCanvasClick() {
  if (filling) {
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
  }
}

function handleCM(event) {
  event.preventDefault(); // 우클릭 막음
}

function handleSaveClick(event) {
  const image = canvas.toDataURL('image/png');
  // console.log(image);
  const link = document.createElement('a');
  link.href = canvas.toDataURL();
  link.download = 'PaintJS[🎨]'; // 저장시 파일명
  // console.log(link);
  link.click();
}

if (canvas) {
  // mousemove: 마우스 움직였을 때
  canvas.addEventListener('mousemove', onMouseMove);

  // canvas click; start painting
  // mousedown: 마우스 누르고 있을 때
  canvas.addEventListener('mousedown', startPainting);

  // mouseup: 마우스 땔 떄
  canvas.addEventListener('mouseup', stopPainting);

  // mouseleave: 마우스가 벗어남
  canvas.addEventListener('mouseleave', stopPainting);

  canvas.addEventListener('click', handleCanvasClick);

  canvas.addEventListener('contextmenu', handleCM);
}

// Array.from: object로 부터 array를 만듦
Array.from(colors).forEach((color) =>
  color.addEventListener('click', handleColorClick)
);

if (range) {
  range.addEventListener('input', handleRangeChange);
}

if (mode) {
  mode.addEventListener('click', handleModeClick);
}

if (saveBtn) {
  saveBtn.addEventListener('click', handleSaveClick);
}
