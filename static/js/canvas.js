const canvas = document.getElementById("drawingCanvasId");
const colors = document.querySelector('input[name="colorPalette"]:checked');
const ctx = canvas.getContext('2d')
const range = document.getElementById("strokeValue");

const INITIAL_COLOR = colors;
const CANVAS_SIZE_W = 736;
const CANVAS_SIZE_H = 490;

canvas.width = CANVAS_SIZE_W;
canvas.height = CANVAS_SIZE_H;

ctx.fillStyle = "white";
ctx.fillRect(0, 0, CANVAS_SIZE_W, CANVAS_SIZE_H);

ctx.strokeStyle = INITIAL_COLOR;
ctx.lineWidth = range.value;

let painting = false

function stopPainting() {
    painting = false
}

function startPainting() {
    painting = true
}

function onMouseMove(event) {
    const x = event.offsetX;
    const y = event.offsetY;
    if (!painting) {
        ctx.beginPath();
        ctx.moveTo(x, y)
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

const saveBtn = document.getElementById("jsSave")

function handleSaveClick() {
    const image = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = image;
    link.download = "PaintJS[EXPORT]";
    link.click();
}

if (canvas) {
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
}


if (saveBtn) {
    saveBtn.addEventListener("click", handleSaveClick);
}

function staticSaveClick() {
    // let direct = "C:\\Users\\lhbs0\\Desktop\\항해99\\0주차 미니프로젝트\\static"
    const image = canvas.toDataURL("image/png");

    console.log(image)


}


const staticBtn = document.getElementById("prac_save")
if (staticBtn) {
    staticBtn.addEventListener("click", staticSaveClick);

}

// ----------- 이 밑에부터는 그린거 불러 오기 -------------

function getBase64Image() {
    var canvas = document.getElementById("jsCanvas");
    var dataURL = canvas.toDataURL("image/jpg");

    return dataURL;

}

function callimg() {
    document.getElementById("calledimg").src = getBase64Image()
    console.log(getBase64Image())
}

callimgbtn.addEventListener('click', () => {
    callimg()
})


//이미지 파일 txt로 저장하고 불러오기

uploadBtn.addEventListener('click', (event) => {
    save_this_question()

});

//지금까지 그린 그림과 정답 등 데이터를 json 끝에 저장하는 함수
function save_this_question() {
    const dataUrl = canvas.toDataURL('image/png');
    const answer_send = $('#answer').val();
    const subject_send = $('#subject').val();
    const hard_send = $('#hard').val();


    $.ajax({
        type: "POST",
        url: "/upload",
        data: {
            'data_url_give': dataUrl, 'answer_give': answer_send,
            'subject_give': subject_send, 'hard_give': hard_send
        },
        success: function (response) {
            console.log(response['msg']);
            console.log(response['ans']);
            console.log(response['sub']);
            console.log(response['hard']);
        }
    })
}



showBtn.addEventListener('click', () => {
    show_all_question()
});

//json 파일로 저장된 모든 문제들을 호출
function show_all_question() {

    $.ajax({
        type: "GET",
        url: "/image",
        data: {},
        success: function (response) {
            let rows = response['problem']['row']

            for (let i = rows.length-1; i >= 1; i-- ) {
            // for (let i = 1; i < rows.length; i++) {  //정방향 호출
                let answer = rows[i]['ans']
                let hard = rows[i]['hard']
                let subject = rows[i]['sub']
                let url = rows[i]['url']
                let temp_html = `<div class="card">
                                    <img id="call_pro_img" src="${url}" class="card-img-top">
                                    <div class="card-body">
                                      <h5 class="card-title">${subject}</h5>
                                      <p class="card-text">${answer}</p>
                                      <p class="card-text">${hard}</p>
                                    </div>
                                  </div>`
                $('#problem-list').append(temp_html)
            }
            console.log("끝났다")
        }
    })
}
