/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$( document ).ready(function() {

  //CORS: Preventing XSS with Escaping
  const escape = (str) => {
    let p = document.createElement("p");
    p.appendChild(document.createTextNode(str));
    return p.innerHTML;
  };

  const createTweetElement = (tweet) => {
    const $tweet = $(`
      <article class="created-tweets">
        <header>
          <span class="username"><img src='${tweet.user.avatars}'</img> ${tweet.user.name}</span>
          <span class="userid">${tweet.user.handle}</span>
        </header>
        
        <p>${escape(tweet.content.text)}</p>

        <footer>
          <span>${timeago.format(tweet.created_at)}</span>
          <span><i class="fas fa-flag"></i> <i class="fas fa-retweet"></i> <i class="fas fa-heart"></i></span>
        </footer>
      </article>
    `);
    return $tweet;
  };

  //Takes in an array of tweet objects and then appends each one to the .tweets-container
  const renderTweets = (tweets) => {
    $('.tweets-container').empty(); //clear previous tweets before rendering the new one
    tweets.forEach(el => {
      const $tweet = createTweetElement(el); //calls createTweetElement for each tweet
      $('.tweets-container').prepend($tweet); //appends returned value to the .tweets-container
    });
  };

  //Fetches tweets from the /tweets page - makes a request to /tweets and receive the array of tweets as JSON
  const loadTweets = function() {
    $.ajax({
      url: "/tweets",
      method: "GET"
    })
      .then(res => renderTweets(res));
  };
  loadTweets();

  //adds event lestener to the form
  $("form").on("submit", function(event) {
    event.preventDefault();
    console.log($(".counter").val());
    if ($(".counter").val() > 139) {
      alert("Empty tweet");
    } if ($(".counter").val() < 0) {
      alert("Maximum characters exceeded");
    } else {
      //submits an AJAXPOST request that sends the serialized data to the server as a query string
      $.ajax({
        url: "/tweets",
        method: "POST",
        data: $(this).serialize(), // sterialize() turns a form input data into a query string
        success: () => loadTweets()
      });
    }
    //let url = $(this).attr("action"); // /tweets

    
  });
});
