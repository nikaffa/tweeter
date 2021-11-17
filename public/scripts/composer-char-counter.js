//Tweet character counter using JQuery

$( document ).ready(function() {
  $("#tweet-text").on("input", function() {
    let numChars = $(this).val().length; //this refers to the DOM element with id #tweet-text, val = get the value of a textarea (input form) (string)
    let counter = $(this).parent().find("output").val(140 - numChars);
    if (numChars > 140) {
      counter.css({"color": "red"});
    }
  });
});