// Load Questions
var questions = [].concat.apply([], categories.map(function (category) {
    return category.questions;
}));
// Submit Question Answer
function submit(a, b) {
    var selected = $(".modal-body input:checked").val();
    var $score = $("#score1");
    var $button = $("button[data-num=" + window.currentQuestion + "]");
    var prize = questions[window.currentQuestion].cashPrize;
    // Determine if correct answer was chosen and alert prize
    if (selected === questions[window.currentQuestion].correctAnswer) {
        chaching.play();   
        score += prize;
        $button.addClass("correct");
        if (score > 0) {
            $score.removeClass("negative");
        }
    } else {
        buzzer.play();
        score -= prize;
        $button.addClass("wrong");
        if (score < 0) {
            $score.addClass("negative");
        }
    }
    $score.html("  $" + score);
}
// Get question info from array, prepare
function getOptions(question) {
    var $buttonDiv = $('<div>');
    question.options.forEach(function (opt) {
        var $div = $('<div class="radio">');
        var $label = $('<label>');
        var $input = $('<input type="radio" name="opts" value="' + opt + '" />');
        $label.append($input);
        $label.append(opt);
        $div.append($label);
        $buttonDiv.append($div);
    });
    return $buttonDiv;
}
// Populate modal window with specific question
function showQuestion(button) {
    var $modal = $('#myModal').modal('show')
    var num = parseInt(button.data('num'));
    var question = questions[num];
    window.currentQuestion = num;
    $modal.find('.modal-title').text(question.prompt);
    $modal.find('.modal-body').empty().append(getOptions(question));
}

var $categories = $("#categories");
var $questions = $("#questions");
var questionNum = 0;
for (var i = 0; i < categories.length; i++) {
    $categories.append('<div class="qcategory-title text-center"><h3>' + categories[i].name + '</h3></div>');

    for (var j = 0; j < categories[i].questions.length; j++) {
        var dollarValue = "$" + categories[i].questions[j].cashPrize;
        var column = i + 1;
        $questions.append('<div class="question" style="grid-column: ' + column + '"><button type="button" class="btn btn-info gridbtn" data-num="' + questionNum + '"> ' + dollarValue + ' </button ></div>')
        questionNum++
    }
}

// Buzzer & Chaching sounds
var buzzer = document.getElementById("buzzer");
buzzer = window.buzzer;
function playbuzzer() {
    buzzer.play();
}
function pausebuzzer() {
    buzzer.pause();
}
var chaching = document.getElementById("chaching");
chaching = window.chaching;
function playchaching() {
    chaching.play();
}
function pausechaching() {
    chaching.pause();
}

// Global variable score...
var score = 0;

$(function () {
    // Hide the Modal after submit
    $("#closesubmit").click(function () {
        $("#myModal").modal("hide");
    });
});
$(function () {
    // Remove Element after click
    $(".gridbtn").click(function () {
        var $btn = $(this).addClass("disabled").prop("disabled", true);
        showQuestion($btn);
    });
});