$(document).ready(function(){
    const testArray = ['a', 'b', 'c'];

    for (let i = 1; i <= testArray.length ; i++) {
        $('.quizList > ul').append(`<a href = "{{ url_for('quiz') }}"><li></li></a>`);
    }; 
});