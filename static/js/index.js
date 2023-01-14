$(document).ready(function(){
    $.ajax({
        type: "GET",
        url: "/quizList",
        data: {},
        success: function (response) {

            const rows = response['quizList']
            if (rows.length === 0) {
                return
            }
            for (let i = rows.length - 1; i >= 0; i--) {

                const image = rows[i]['img']
                const key = rows[i]['quiz_key']

                $('.quizList > ul').append(`<a id="${key}" href = "/quizSolve?quizKey=${key}"><li>
                                                                    <img src="../static/image/${image}.png">
                                                                    </li></a>`);
            }
        }
    })
});