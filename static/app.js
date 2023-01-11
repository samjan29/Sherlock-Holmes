const container = document.querySelector('.container');
const canvas = document.getElementById('drawing-board');
const toolbar = document.getElementById('toolbar');
const uploadBtn = document.getElementById('upload-btn');
// const showBtn = document.getElementById('show-btn');
// canvas로 그림을 그리기 위해 꼭 가져 와야 하는 인터페이스
// 2D
const ctx = canvas.getContext('2d');

/*
    javascript에서의 좌표
    1. 창 기준
        : position:fixed와 유사하게 창(window) 맨 위 왼쪽 모서리를 기준으로 좌표를 계산
        - 이 좌표를 clientX/clientY
    2. 문서 기준
        : 문서(document) 최상단(root)에서 position:absolute를 사용하는 것과
          비슷하게 문서 맨 위 왼쪽 모서리를 기준으로 좌표를 계산
        - 이 좌표는 pageX/pageY

    내가 알고 싶은 것
        + stroke()를 호출할 때 좌표
 */
const canvasOffsetX = canvas.offsetLeft;
const canvasOffsetY = canvas.offsetTop;

canvas.width = window.innerWidth - canvasOffsetX;
canvas.height = window.innerHeight - canvasOffsetY;

let isPainting = false;
let lineWidth = 5;

toolbar.addEventListener('click', (event) => {
    if (event.target.id === 'clear') {
        // canvas에 사각형 영역을 지정해 지우는 함수
        // 시작점(0, 0)에서 (canvas.width, canvas.height)까지 직사각형 모양으로 지우는 것
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
});

toolbar.addEventListener('change', (event) => {
    if (event.target.id === 'stroke') {
        ctx.strokeStyle = event.target.value;
    }

    if (event.target.id === 'lineWidth') {
        lineWidth = event.target.value;
    }
});

canvas.addEventListener('mousedown', (event) => {
    isPainting = true;

    ctx.beginPath();    // 하위 경로 목
    // ctx.moveTo(event.clientX - canvasOffsetX, event.clientY);
    ctx.moveTo(event.offsetX, event.offsetY);
});

canvas.addEventListener('mouseup', (event) => {
    isPainting = false;
});

canvas.addEventListener('mousemove', (event) => {
    if (!isPainting) {
        return;
    }

    ctx.lineWidth = lineWidth;
    ctx.lineCap = 'round';

    // ctx.lineTo(event.clientX - canvasOffsetX, event.clientY);
    ctx.lineTo(event.offsetX, event.offsetY);
    ctx.stroke();
});

uploadBtn.addEventListener('click', (event) => {
    const dataUrl = canvas.toDataURL('image/png');

    $.ajax({
        type: "POST",
        url: "/upload",
        data: {'data_url_give': dataUrl},
        success: function (response) {
            console.log(response['msg']);
        }
    })
});

// showBtn.addEventListener('click', () => {
//     $.ajax({
//         type: "GET",
//         url: "/image",
//         data: {},
//         success: function (response) {
//             $('.container').empty();
//             let temp_html = `<img src="${response['image']}">`
//             $('.container').append(temp_html)
//         }
//     })
// });