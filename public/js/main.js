// Load Questions
var questions = [].concat.apply([], categories.map(function (category) {
    return category.questions;
}));

// Buzzer & Chaching sounds
var buzzer = document.getElementById('buzzer');
var chaching = document.getElementById('chaching');

// Global variables
var score = 0;
var currentQuestion = -1;

// Submit Question Answer
function submit() {
    var $modal = $('#questionModal').modal('hide');
    var $button = $('button[data-question=' + currentQuestion + ']');
    var answered = $button.hasClass('answered');
    if (answered) {
        return;
    }

    var selected = $modal.find('.modal-body input:checked').val();
    var $score = $('#score1');
    var prize = questions[currentQuestion].cashPrize;
    // Determine if correct answer was chosen and alert prize
    if (selected === questions[currentQuestion].correctAnswer) {
        chaching.play();
        score += prize;
        $button.addClass('answered correct');
        if (score >= 0) {
            $score.removeClass('negative');
        }
    } else {
        buzzer.play();
        score -= prize;
        $button.addClass('answered wrong');
        if (score < 0) {
            $score.addClass('negative');
        }
    }
    $score.html('$' + score);
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
function showQuestion($button) {
    var $modal = $('#questionModal').modal('show')
    var questionIndex = parseInt($button.data('question'), 10);
    var question = questions[questionIndex];
    currentQuestion = questionIndex;
    $modal.find('.modal-title').text(question.prompt);

    var $options = getOptions(question);
    $modal.find('.modal-body').empty().append($options);

    var answered = $button.hasClass('answered');
    var $submitButton = $modal.find('#closesubmit')
    if (answered) {
        $submitButton.prop('disabled', false).text('Close');
    } else {
        $submitButton.prop('disabled', true).text('Submit');
        $options.find('input').change(function () {
            $submitButton.prop('disabled', false);
        })
    }
}

$(function () {
    var $categories = $('#categories');
    var $questions = $('#questions');
    var questionIndex = 0;
    for (var i = 0; i < categories.length; i++) {
        $categories.append('<div class="qcategory-title text-center"><h3>' + categories[i].name + '</h3></div>');

        for (var j = 0; j < categories[i].questions.length; j++) {
            var dollarValue = '$' + categories[i].questions[j].cashPrize;
            var column = i + 1;
            $questions.append('<div class="question" style="grid-column: ' + column + '"><button type="button" class="btn btn-info gridbtn" data-question="' + questionIndex + '"> ' + dollarValue + ' </button ></div>')
            questionIndex++
        }
    }

    // Remove Element after click
    $('.gridbtn').click(function () {
        showQuestion($(this));
    });
});