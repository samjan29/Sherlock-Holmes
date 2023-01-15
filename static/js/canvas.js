const canvas = document.getElementById("drawingCanvasId");
const colors = document.querySelector('input[name="colorPalette"]:checked');
const ctx = canvas.getContext("2d");
const range = document.getElementById("strokeValue");
const present = document.getElementById("present");

const INITIAL_COLOR = colors;
const CANVAS_SIZE_W = 736;
const CANVAS_SIZE_H = 490;

let painting = false;
let isDown = false;
let mode = brush;

// let path = [];

canvas.width = CANVAS_SIZE_W;
canvas.height = CANVAS_SIZE_H;

ctx.fillStyle = "white";
ctx.fillRect(0, 0, CANVAS_SIZE_W, CANVAS_SIZE_H);

ctx.strokeStyle = INITIAL_COLOR;
ctx.lineWidth = range.value;

function startPainting(event) {
    painting = true;
    isDown = false;
}


function onMouseMove(event) {
    const x = event.offsetX;
    const y = event.offsetY;

    if (mode === brush) {
        if (!painting) {
            ctx.beginPath();
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
            ctx.stroke();
        }
    }  else if (mode === eraser) {
        if (painting) {
            ctx.clearRect(x-ctx.lineWidth, y-ctx.lineWidth, ctx.lineWidth * 2, ctx.lineWidth * 2);
        }
    }
}


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

function handleBrushClick(event) {
    mode = brush;
}

brush.addEventListener("click", handleBrushClick);

function handleEraserClick(event) {
    mode = eraser;
}

eraser.addEventListener("click", handleEraserClick);

// function handleUndoClick(event) {
//
// }
//
// undo.addEventListener("click", handleUndoClick);

function handleEraseAllClick(event) {
    ctx.reset();
}

eraseAll.addEventListener("click", handleEraseAllClick);


//---터치 구현 구간---//

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

//---터치 구현 구간---//
function stoptouchPainting(event) {
    painting = false;

}

function starttouchPainting(event) {
    new_xx = event.targetTouches[0].pageX - 120;
    new_yy = event.targetTouches[0].pageY - 185;
    ctx.moveTo(new_xx,new_yy)
    painting = true;
}

function onTouchMove(event) {

    xx = event.targetTouches[0].pageX - 120;
    yy = event.targetTouches[0].pageY - 185;

    if (!painting) {
        ctx.beginPath();
        ctx.moveTo(xx, yy);
    } else {
        ctx.lineTo(xx,yy);
        ctx.stroke();
    }
}

if (canvas) {
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", (event) => {
        painting = false;
        isDown = true;
    });
    canvas.addEventListener("mouseleave", (event) => {
        painting = false;
    });

    //---터치 구현 구간---//
    canvas.addEventListener("touchmove", onTouchMove);
    canvas.addEventListener("touchstart", starttouchPainting);
    canvas.addEventListener("touchend", stoptouchPainting);
    canvas.addEventListener("touchcancel", stoptouchPainting);
    //---터치 구현 구간---//
}