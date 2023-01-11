$(document).ready(function(){
    const key = window.location.href.split('=')[1];
    let ans = ""
    $.ajax({
        type: "GET",
        url: "/getQuiz?quizKey="+key,
        data: {},
        success: function (response) {
            ans = response['ans']
            $('.loadCanvas img').attr('src','../static/image/'+ans+'.png')
        }
    })

    const solve = document.getElementById('solve')
    const showAnswer = document.getElementById('showAnswer')

    solve.addEventListener("click", (event)=> {
        const value = document.getElementById('input').value
        if (value == ans){
            $(location).attr('href','/happy')
        }else {
            alert("땡!")
            $('#input').focus()
        }
    })

    showAnswer.addEventListener("click", () => {
        location.href = "/sad?1"
    })
});