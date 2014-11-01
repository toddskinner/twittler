$(document).ready(function(){
  var $body = $('.tweets');          //people sometimes use a $ with jQuery-specific variables is that it helps them remember that the variable contains the result of a call to the $() function in jQuery. 
  $body.html('');

  var stream = streams.home;

  var showTweets = function(){
    var index = stream.length - 1;      //streams.home is an array of all tweets from all users you are following
    while(index >= 0){
      var tweet = stream[index];
      var $tweet = $('<div class="singleTweet"></div>');          //$('<div></div> will create a div element but won't add it to your HTML doc. Need to appeand later.)
      //$tweet.text('@' + tweet.user + ': ' + tweet.message + ": " + tweet.created_at);
      //$tweet.appendTo('.tweets');
      var name = '<b>' + tweet.user + '</b>';
      var msg = ' <small><a class="user" data-user="'+ tweet.user +'" href="#">@' + tweet.user + '</a></small>: ' + tweet.message;
      var time = '<br>' + '<small>' + tweet.created_at + '</small>';
      $tweet.html(name + msg + time);
      $tweet.appendTo('.tweets');
      index -= 1;
    }
  }

  showTweets();

  setInterval(function(){
    showTweets();
  }, 5000);

  var changeStream = function(newStream){
    $('.tweets').html('');
    stream = newStream;
    showTweets();
  }

  $('.backHome').click(function(){
    changeStream(streams.home);
    $('h1').html('Home');
  });
    
  $('.tweets').on('click', 'a.user', function(event){
    event.preventDefault();
    var username = $(this).data('user');
    $('h1').html(username);
    changeStream(streams.users[username]);
  });

});
