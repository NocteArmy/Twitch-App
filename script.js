var streamers = ['noctearmy', 'freecodecamp', 'beyondthesummit', 'bobross', 'esl_csgo', 'purgegamers', 'shroud', 'mrllamasc', 'joshog', 'drdisrespectlive'];

$(document).ready(() => {
  streamers.forEach((streamer) => {
    var streamInfo;
    $.when(getChannelInfo(), getStreamStatus()).done((channel, stream) => {
      if(stream[0].stream) {
        streamInfo = '<div class="col-4"><strong>LIVE</strong> playing ' + stream[0].stream.game + '</div>';
      } else {
        streamInfo = '<div class="col-4"><em>offline</em></div>';
      }
      $("#streamer-list").append('<div class="row streamer-info"><div class="col-4"><img src="' + channel[0].logo + '" class="stream-logo" title="' + streamer + ' logo" alt="' + streamer + ' logo"></div><div class="col-4"><a href="' + channel[0].url + '" target="_blank" rel="noopener">' + channel[0].display_name + '</a></div>' + streamInfo + '</div>');
    });
    function getChannelInfo() {
      return $.ajax( {
        type: 'GET',
        dataType: 'jsonp',
        url: "https://wind-bow.gomix.me/twitch-api/channels/" + streamer,
        success: (data) => {}
      });
    }
    function getStreamStatus() {
      return $.ajax( {
        type: 'GET',
        dataType: 'jsonp',
        url: "https://wind-bow.gomix.me/twitch-api/streams/" + streamer,
        success: (data) => {}
      });
    }
  });
  
});