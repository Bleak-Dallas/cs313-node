'use strict';
var ERROR = {"message": "The request failed!"};


$(function() {

  // get the values from form.html.
  var mathButton = $('#button'),
      mathOperation = $('#mathOperation'),
      num1 = $('#num1'),
      num2 = $('#num2'),
      output = $('#results');

  // Listen for the click of the mathButton in form.html
  mathButton.on('click', function(e) {

    // prevent the form from submitting.
    e.preventDefault();

    // send the information to /math_service within index.js.
    var target = '/math_service?mathOperation=' + mathOperation.val() + '&num1=' + num1.val() + '&num2=' + num2.val();

    // Perform an AJAX request using the get() method.
    // If the request was successful, append the response.
    // If not, append an error.
    $.get(target, function(response) {
      output.append('<div>' + JSON.stringify(response) + '</div>');
    }).fail(function() {
      output.append('<div>' + JSON.stringify(ERROR) + '</div>');
    });
  });
});