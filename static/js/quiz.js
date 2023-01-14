$(document).ready(function(){
    const key = window.location.href.split('=')[1];
    let ans = ""
    $.ajax({
        type: "GET",
        url: "/getQuiz?quizKey="+key,
        data: {},
        success: function (response) {
            quiz = response['quiz']
            $('.loadCanvas img').attr('src','../static/image/'+ quiz['img'] +'.png')
        }
    })

    const solve = document.getElementById('solve')
    const showAnswer = document.getElementById('showAnswer')

    solve.addEventListener("click", (event)=> {
        $('.incorrect').remove()
        const value = document.getElementById('input').value
        if (value == quiz['ans']){
            $(location).attr('href','/happy')
        }else {
            // incorrect가 있으면 false반환
            if ((document.getElementsByClassName('incorrect'))){
                $('.formClass__answer').append(`<div class="incorrect">오답입니다</div>`)
            }
            $('#input').focus()
        }
    })


    showAnswer.addEventListener("click", () => {
        location.href = "/sad?"+key;
    })
});

function empty() {
    document.getElementById("input").value ='';
}