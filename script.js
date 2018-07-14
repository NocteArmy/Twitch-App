$(document).ready(() => {
  const streamers = ['noctearmy', 'freecodecamp', 'beyondthesummit', 'bobross', 'esl_csgo', 'purgegamers', 'shroud', 'mrllamasc', 'joshog', 'drdisrespectlive'];
  var streamersInfo = [];
  
  streamers.forEach((streamer) => {
    var streamInfo;
    $.when(getChannelInfo(), getStreamStatus()).done((channel, stream) => {
      if(stream[0].stream) {
        streamInfo = '<div class="col-4"><strong>LIVE</strong> playing ' + stream[0].stream.game + '</div>';
      } else {
        streamInfo = '<div class="col-4"><em>offline</em></div>';
      }
      streamersInfo.push(['<div class="row streamer-info justify-content-center align-items-center"><div class="col-2 col-lg-1"><img src="' + channel[0].logo + '" class="stream-logo" title="' + streamer + ' logo" alt="' + streamer + ' logo"></div><div class="col-3 col-lg-2"><a href="' + channel[0].url + '" target="_blank" rel="noopener">' + channel[0].display_name + '</a></div>' + streamInfo + '</div>', stream[0].stream]);
      $("#streamer-list").append(streamersInfo[streamersInfo.length - 1][0]);
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
  $("#all").on('click', () => {
    $("#all").addClass("selected");
    $("#online").removeClass("selected");
    $("#offline").removeClass("selected");
    $("#streamer-list").html("");
    streamersInfo.forEach((streamer) => $("#streamer-list").append(streamer[0]));
  });
  $("#online").on('click', () => {
    $("#all").removeClass("selected");
    $("#online").addClass("selected");
    $("#offline").removeClass("selected");
    let onlineStreamers = streamersInfo.filter((streamer) => streamer[1]);
    $("#streamer-list").html("");
    onlineStreamers.forEach((streamer) => $("#streamer-list").append(streamer[0]));
  });
  $("#offline").on('click', () => {
    $("#all").removeClass("selected");
    $("#online").removeClass("selected");
    $("#offline").addClass("selected");
    let offlineStreamers = streamersInfo.filter((streamer) => !streamer[1]);
    $("#streamer-list").html("");
    offlineStreamers.forEach((streamer) => $("#streamer-list").append(streamer[0]));
  });
});