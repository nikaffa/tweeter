//Client-side JS logic goes here
 
$( document ).ready(function() {
  $("#error").hide();

  //CORS: Preventing XSS with Escaping
  const escape = (str) => {
    let p = document.createElement("p");
    p.appendChild(document.createTextNode(str));
    return p.innerHTML;
  };
  
  //Renders a template with a tweet into the DOM
  const createTweetElement = (tweet) => {
    const $tweet = $(`
      <article class="created-tweets">
        <header>
        <div>
          <img src='${tweet.user.avatars}'</img>
          <span> ${tweet.user.name}</span>
        </div>
        <span class="user-id">${tweet.user.handle}</span>
        </header>
        
        <p id="text">${escape(tweet.content.text)}</p>

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
    $('.tweets-container').empty(); //clears previous tweets before rendering the new one
    tweets.forEach(el => {
      const $tweet = createTweetElement(el);
      $('.tweets-container').prepend($tweet); //appends returned value to the .tweets-container

    });
  };

  //Fetches tweets from the /tweets page - makes a request to /tweets and receive the array of tweets as JSON
  const loadTweets = function() {
    $.ajax({
      url: "/tweets",
      method: "GET"
    })
      .then(res => {
        renderTweets(res);
      });
  };
  loadTweets();

  //Adds event lestener to the form
  $("form").on("submit", function(event) {
    event.preventDefault();

    if ($(".counter").val() > 139) {
      $("#error").slideDown("slow");
      $("#error p").text("⚠️ No empty tweet ⚠️");
    } else if ($(".counter").val() < 0) {
      $("#error").slideDown("slow");
      $("#error p").text("⚠️ Too many chars ⚠️");
    } else {
      $("#error").slideUp("slow");

      //submits an AJAXPOST request that sends the serialized data to the server as a query string
      $.ajax({
        url: "/tweets",
        method: "POST",
        data: $(this).serialize(), // sterialize() turns a form input data into a query string
        success: () => loadTweets()
      });
      $("textarea").val('');
      $("output").val(140);

    }
  });
});
