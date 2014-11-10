$(document).ready(function(){        //people sometimes use a $ with jQuery-specific variables is that it helps them remember that the variable contains the result of a call to the $() function in jQuery. 
  var $body = $('.tweets');          // Assign the contents of the node with class "tweets" to the $body variable.  Selects all elements with the given class.
  $body.html('');                    // modify the $body element's html contents to be empty

  var stream = streams.home;         //streams.home is an array of all tweets from all users you are following

  $("time.timeago").timeago();      // http://timeago.yarp.com/

  var showTweets = function(){
    var index = stream.length - 1;      
    while(index >= 0){
      var tweet = stream[index];        //assigns stream[index] to the varaible "tweet". Remember streams is an array of all tweets. And each tweet has a .user, .message, and .created_at property
      var $tweet = $('<div class="singleTweet"></div>');          //$('<div></div> will create a div element but won't add it to your HTML doc. Need to appeand later.)
      var name = '<b>' + tweet.user + '</b>';                   // Bold font for the user name
      var msg = ' <small><a class="user" data-user="'+ tweet.user +'" href="#">@' + tweet.user + '</a></small>: ' + tweet.message;  // assign data-user attribute the value of tweet.user so can grab stream.users.username
                                                                                                    // use href attribute to specify @tweet.user as a link. 
      var time = '<br>' + '<small>' + jQuery.timeago(tweet.created_at) + '</small>';        // include break to split to next line.  Wrap in <small> to decrease text size.
      $tweet.html(name + msg + time);           // modify the html contents of $tweet to include "name", "msg", and "time"
      $tweet.appendTo('.tweets');               // append $tweet to the elements in the class ".tweets" 
      index -= 1;
    }
  }

  showTweets();                             // Call the showTweets function

  setInterval(function(){                   // JavaScript timing event. Will wait a specified number of milliseconds, and then execute a specified function, and it will continue to execute the function, once at every given time-interval.
    showTweets();
  }, 8000);

  var changeStream = function(newStream){     
    $('.tweets').html('');                 // Clear the elements in the .tweets class
    stream = newStream;                    
    showTweets();                           // Call showTweets on the new stream
  }

  $('.backHome').click(function(){          // If click on the button with class backHome, call changStream on the Home stream
    changeStream(streams.home);             // Modify the h2 element to be "Home"
    $('h2').html('Home');
  });

  $('.tweets').on('click', 'a.user', function(event){     //  // We will fetch the nodes that have the ".tweets" class and then call “on”, we want to listen for “click” events,
                                                          //   and then we will specify a.user elements inside the .tweets class we want to listen for.  
    event.preventDefault();                               // Cancel the link's default action
    var username = $(this).data('user');                  // Assigns the variable username the value of the data-user attribute of the clicked element
    $('h2').html(username);                      // Modify the h2 element to be the username 
    changeStream(streams.users[username]);       //why does this only work with bracket notation and not dot notation such as "streams.users.username"?
  });

});
