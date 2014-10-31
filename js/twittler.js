$(document).ready(function(){
  var $body = $('.tweets');          //people sometimes use a $ with jQuery-specific variables is that it helps them remember that the variable contains the result of a call to the $() function in jQuery. 
  $body.html('');

  var showTweets = function(){
    var index = streams.home.length - 1;      //streams.home is an array of all tweets from all users you are following
    while(index >= 0){
      var tweet = streams.home[index];
      var $tweet = $('<div></div>');          //$('<div></div> will create a div element but won't add it to your HTML doc. Need to appeand later.)
      $tweet.text('@' + tweet.user + ': ' + tweet.message + ": " + tweet.created_at);
      $tweet.appendTo('.tweets');
      index -= 1;
    }
  }

  showTweets();

  setInterval(function(){
    showTweets();
  }, 2000);

  var changeStream = function(newStream){
    $('tweets').html('');
    stream = newStream;
    showTweets();
  }

    
});
