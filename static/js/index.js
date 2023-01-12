$(document).ready(function(){
    $.ajax({
        type: "GET",
        url: "/quizList",
        data: {},
        success: function (response) {

            const rows = response['quizList']

            for (let i = 0; i < rows.length; i++) {
                const image = rows[i]['quiz_ans']
                const key = rows[i]['quiz_key']

                $('.quizList > ul').append(`<a id="${key}" href = "/quizSolve?quizKey=${key}"><li>
                                                                    <img src="../static/image/${image}.png">
                                                                    </li></a>`);
            }
        }
    })
});