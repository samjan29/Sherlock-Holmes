const canvas = document.getElementById("drawingCanvasId");
const colors = document.querySelector('input[name="colorPalette"]:checked');
const ctx = canvas.getContext("2d");
const range = document.getElementById("strokeValue");
const present = document.getElementById("present");

const INITIAL_COLOR = colors;
const CANVAS_SIZE_W = 736;
const CANVAS_SIZE_H = 490;

canvas.width = CANVAS_SIZE_W;
canvas.height = CANVAS_SIZE_H;

ctx.fillStyle = "white";
ctx.fillRect(0, 0, CANVAS_SIZE_W, CANVAS_SIZE_H);

ctx.strokeStyle = INITIAL_COLOR;
ctx.lineWidth = range.value;

let painting = false;

function stopPainting() {
    painting = false;
}

function startPainting() {
    painting = true;
}

function onMouseMove(event) {
    const x = event.offsetX;
    const y = event.offsetY;
    if (!painting) {
        ctx.beginPath();
        ctx.moveTo(x, y);
    } else {
        ctx.lineTo(x, y);
        ctx.stroke();
    }
}

console.log(colors.value);

function handleColorClick(event) {
    const color = event.target.value;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}

addEventListener("click", handleColorClick);

function handleRangeChange(event) {
    const size = event.target.value;
    ctx.lineWidth = size;
}

if (range) {
    range.addEventListener("input", handleRangeChange);
}

if (canvas) {
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
}

function handleSaveClick() {
    const image = canvas.toDataURL("image/png");
    const answer = document.getElementById("answer").value;

    $.ajax({
        type: "POST",
        url: "/presentForm",
        data: {"quiz_img": image, "quiz_ans": answer},
        success: function (response) {
            $(location).attr('href', '/');
        }
    })
}

if (present) {
    present.addEventListener("click", handleSaveClick);
}

