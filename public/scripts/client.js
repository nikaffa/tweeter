/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$( document ).ready(function() {

  const createTweetElement = (tweet) => {
    const $tweet = $(`
      <article class="created-tweets">
        <header>
          <span class="username"><img src='${tweet.user.avatars}'</img> ${tweet.user.name}</span>
          <span class="userid">${tweet.user.handle}</span>
        </header>
        
        <p>${tweet.content.text}</p>

        <footer>
          <span>${timeago.format(tweet.created_at)}</span>
          <span><i class="fas fa-flag"></i> <i class="fas fa-retweet"></i> <i class="fas fa-heart"></i></span>
        </footer>
      </article>
    `);
    return $tweet;
  };

  const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png"
        ,
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ];

  //Takes in an array of tweet objects and then appends each one to the .tweets-container
  const renderTweets = (tweets) => {
    tweets.forEach(el => {
      const $tweet = createTweetElement(el); //calls createTweetElement for each tweet
      $('.tweets-container').append($tweet); //appends returned value to the .tweets-container
    });
  };
  renderTweets(data);

  //adds event lestener to the form
  $("form").on("submit", function(event) {
    event.preventDefault();
    // creates an AJAX POST request and sends serialized data to the server as a query string
    let url = $(this).attr("action"); // /tweets
    console.log($(this).serialize());
    //submits a POST request that sends the serialized data to the server
    $.ajax({url, method: "POST", data: $(this).serialize()});// sterialize() turns a form input data into a query string
  });

 
});
