const canvas = document.getElementById('jsCanvas');

let painting = false;

function stopPainting() {
  painting = false;
}

function onMouseMove(evnet) {
  // console.log(event);
  // clientX, Y: 윈도우 전체 범위에서의 마우스 위치 값
  // offsetX, Y: 캔버스 태의 좌표값 (= clientX, Y)

  const x = event.offsetX;
  const y = event.offsetY;
  console.log(x, y);
}

function onMouseDown(event) {
  console.log(event);
  painting = true;
}

function onMouseUp(event) {
  stopPainting();
}

if (canvas) {
  // mousemove: 마우스 움직였을 때
  canvas.addEventListener('mousemove', onMouseMove);

  // canvas click; start painting
  // mousedown: 마우스 누르고 있을 때
  canvas.addEventListener('mousedown', onMouseDown);

  // mouseup: 마우스 땔 떄
  canvas.addEventListener('mouseup', onMouseUp);

  // mouseleave: 마우스가 벗어남
  canvas.addEventListener('mouseleave', stopPainting);
}
