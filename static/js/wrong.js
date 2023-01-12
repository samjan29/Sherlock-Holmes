$(document).ready(function(){
    const key = window.location.href.split('?')[1];


    $.ajax({
        type: "GET",
        url: "/showAnswer?"+key,
        data: {},
        success: function (response) {
            ans = response['ans']
            $('.answer__thing').text(ans)
        }
    })


});