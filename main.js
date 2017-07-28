$("#submitbtn").click(function(){																								
	  var userName = $("input").val();																							//checking input box for more than 2 characters while login
							if(userName.length > 2)
										{
													$("p.user-name").append(userName);											//showing the contents of input box to the main body as a welcome message
													$('#main').removeClass('hidden');
													$('.welcome').addClass('hidden');
										}
							else{
								$("#input-name").addClass("error");
								alert('Name should be more than 3 characters')					//if characters less than 3, shows error
							}
});

$("input").keyup(function(event){
    if(event.keyCode == 13){																															//hit enter to click the Go button 
        $("#submitbtn").click();
    }
});

$('#play-button').on('click',function() {
				var song = document.querySelector('audio');																														//functioning of play button, when the icon button is clicked
				if(song.paused == true) {
					console.log('Playing');
								$('.fa-play').removeClass('fa-play').addClass('fa-pause');
								song.play();
				}
				else {
					console.log('Pausing');
							$('.fa-pause').removeClass('fa-pause').addClass('fa-play');
							song.pause();
			}
});

//song info
var songs = [
	{
        'name': 'Humma Song',
        'artist': 'Badshah, Jubin Nautiyal, Shashaa Tirupati',
        'album': 'Ok Jaanu',
        'duration': '3:15',
        'fileName': 'song2.mp3',
        'image': 'song2.jpg'
    },
	
	{
        'name': 'Nashe Si Chadh Gayi',
        'artist': 'Arijit Singh',
        'album': 'Befikre',
        'duration': '2:34',
        'fileName': 'song3.mp3',
        'image': 'song3.jpg'
    },
	
	{
        'name': 'Tamma Tamma Once Again',
        'artist': 'Neha Kakkar, Monali Thakur, Ikka Singh, Dev Negi',
        'album': 'Badrinath ki Dulhania',
        'duration': '2:56',
        'fileName': 'song1.mp3',
        'image': 'song1.jpg'
    },
      
 {
        'name': 'The Breakup Song',
        'artist': 'Nakash Aziz, Arijit Singh, Badshah, Jonita Gandhi',
        'album': 'Ae Dil Hai Mushkil',
        'duration': '2:29',
        'fileName': 'song4.mp3',
        'image': 'song4.jpg'
    }
  ]
   
	window.onload = function (){
		changeCurrentSongDetails(songs[0]);
	 	for(var i = 0; i < songs.length; i++) {
	        var obj = songs[i];
	        var name = '#song' + (i+1);
	        var song = $(name);
	        song.find('.song-name').text(obj.name);										//finding song name from song object
	        song.find('.song-artist').text(obj.artist);						//finding artist name
	        song.find('.song-album').text(obj.album);								//finding album name
	        song.find('.song-length').text(obj.duration);				//find song length
	        addSongNameClickEvent(obj, i + 1);
    	}
    	$('#songs').DataTable({																														//search bar
    		paging: false,
    	});
	}
	
	function toggleSong() {
		var song = document.querySelector('audio'); 												//toggle song play/pause on click
		if(song.paused) {
			song.play();	
		} else {
			song.pause();
		}
	}

	function addSongNameClickEvent(songObj, id) {												//playing song from the song object
		var songName = songObj.name;
		var fileName = songObj.fileName
		var id = '#song' + id;
		
		function onClick(event){
			var song = document.querySelector('audio');
			var currentSong = song.src;
			if (currentSong.search(fileName) != -1) {
				toggleSong();
			} else {
				changeCurrentSongDetails(songObj);
				song.src = fileName; 
				song.play();	
			}
		}
		
$(id).on('click', onClick);
	}
	function changeCurrentSongDetails(songObj) {
		var songPath = 'img/' + songObj.image;
	    $('.current-song-image').attr('src', songPath)																				//changing the song clipart when new song is selected
	    $('.current-song-name').text(songObj.name)																								//changing song name
	    $('.current-song-album').text(songObj.album)																						//changing album name
	}

function addSongEventListener(songName, position){
	var id = '#song' + position;
	
	$(id).on('click', function(event){
		var song = document.querySelector('audio');																										//changing song source
		var currentSong = song.src;
		
		if(currentSong.search(songName) != -1){
			toggleSong();
		}else{ 
          song.src = songName;
			song.play();
		}
	});
}

$('body').on('keypress',function(event) {
								var target = event.target;
								if (event.keyCode == 32 && target.tagName != 'INPUT' )														//pausing the song when space bar is clicked from keyboard and 																																																																							removing the same when clicked in input search box
								{
											var song = document.querySelector('audio');
											if(song.paused == true) {
											console.log('Playing');
													$('.fa-play').removeClass('fa-pause').addClass('fa-pause');													
													song.play();
								}																																																																								//toggling the fontawesome icons on playing and pausing
								else {
								console.log('Pausing');
											$('.fa-pause').removeClass('fa-pause').addClass('fa-play');
											song.pause();
							}
				}
});
       

function fancyTimeFormat(time)
{   																																																																												//changing the time format to 1 second 
    // Hours, minutes and seconds
    var hrs = ~~(time / 3600);
    var mins = ~~((time % 3600) / 60);
    var secs = time % 60;

    // Output like "1:01" or "4:03:59" or "123:03:59"
    var ret = "";

    if (hrs > 0) {
        ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
    }

    ret += "" + mins + ":" + (secs < 10 ? "0" : "");
    ret += "" + secs;
    return ret;
}

function updateCurrentTime(){																																																				//shows the current duration of the song
    arr = $('.audio-song');
    time2 = arr[0].currentTime;
    time2 = fancyTimeFormat(time2);
    $('.current-time').text("Current duration : " + time2 + " seconds");
}

$('body').on('click',function(){
    setInterval(function(){																																																					//updates the song duration every second
        updateCurrentTime(); 
    }, 1000);
});


	//synthesizer/virtual piano

$('body').on('keypress',function(event){
				var target = event.target;
    if((event.keyCode == 97 || event.keyCode == 65) && target.tagName != 'INPUT'){														//when key 'a' is pressed
						var piano = Synth.createInstrument('piano');
						piano.play('C', 5, 3);		
				}
				if((event.keyCode == 98 || event.keyCode == 66) && target.tagName != 'INPUT'){														//when key 'b' is pressed
						var piano = Synth.createInstrument('piano');
						piano.play('E', 5, 3);		
				}
				if((event.keyCode == 99 || event.keyCode == 67) && target.tagName != 'INPUT'){															//when key 'c' is pressed
						var piano = Synth.createInstrument('piano');
						piano.play('C', 5, 3);		
				}
				if((event.keyCode == 100 || event.keyCode == 68) && target.tagName != 'INPUT'){														//when key 'd' is pressed
						var piano = Synth.createInstrument('piano');
						piano.play('D', 1, 3);		
				}
				if((event.keyCode == 101 || event.keyCode == 69) && target.tagName != 'INPUT'){														//when key 'e' is pressed
						var piano = Synth.createInstrument('piano');
						piano.play('E', 3, 3);		
				}
				if((event.keyCode == 102 || event.keyCode == 70) && target.tagName != 'INPUT'){														//when key 'f' is pressed
						var piano = Synth.createInstrument('piano');
						piano.play('F', 4, 3);		
				}
				if((event.keyCode == 103 || event.keyCode == 71) && target.tagName != 'INPUT'){														//when key 'g' is pressed
						var piano = Synth.createInstrument('piano');
						piano.play('G', 3, 3);		
				}
				if((event.keyCode == 104 || event.keyCode == 72) && target.tagName != 'INPUT'){														//when key 'h' is pressed
						var piano = Synth.createInstrument('piano');
						piano.play('A', 4, 3);		
				}
				if((event.keyCode == 105 || event.keyCode == 73) && target.tagName != 'INPUT'){														//when key 'i' is pressed
						var piano = Synth.createInstrument('piano');
						piano.play('C', 4, 3);		
				}
				if((event.keyCode == 106 || event.keyCode == 74) && target.tagName != 'INPUT'){														//when key 'j' is pressed
						var piano = Synth.createInstrument('piano');
						piano.play('C', 6, 3);		
				}
				if((event.keyCode == 107 || event.keyCode == 75) && target.tagName != 'INPUT'){														//when key 'k' is pressed
						var piano = Synth.createInstrument('piano');
						piano.play('D', 4, 3);		
				}
				if((event.keyCode == 108 || event.keyCode == 76) && target.tagName != 'INPUT'){														//when key 'l' is pressed
						var piano = Synth.createInstrument('piano');
						piano.play('E', 5, 3);		
				}
				if((event.keyCode == 109 || event.keyCode == 77) && target.tagName != 'INPUT'){														//when key 'm' is pressed
						var piano = Synth.createInstrument('piano');
						piano.play('G', 5, 3);		
				}
				if((event.keyCode == 110 || event.keyCode == 78) && target.tagName != 'INPUT'){														//when key 'n' is pressed
						var piano = Synth.createInstrument('piano');
						piano.play('F', 5, 3);		
				}
				if((event.keyCode == 111 || event.keyCode == 79) && target.tagName != 'INPUT'){														//when key 'o' is pressed
						var piano = Synth.createInstrument('piano');
						piano.play('D', 4, 3);		
				}
				if((event.keyCode == 112 || event.keyCode == 80) && target.tagName != 'INPUT'){														//when key 'p' is pressed
						var piano = Synth.createInstrument('piano');
						piano.play('E', 4, 3);		
				}
				if((event.keyCode == 113 || event.keyCode == 81) && target.tagName != 'INPUT'){														//when key 'q' is pressed
						var piano = Synth.createInstrument('piano');
						piano.play('C', 3, 3);		
				}
				if((event.keyCode == 114 || event.keyCode == 82) && target.tagName != 'INPUT'){														//when key 'r' is pressed
						var piano = Synth.createInstrument('piano');
						piano.play('F', 3, 3);		
				}
				if((event.keyCode == 115 || event.keyCode == 83) && target.tagName != 'INPUT'){														//when key 's' is pressed
						var piano = Synth.createInstrument('piano');
						piano.play('E', 3, 3);		
				}
				if((event.keyCode == 116 || event.keyCode == 84) && target.tagName != 'INPUT'){														//when key 't' is pressed
						var piano = Synth.createInstrument('piano');
						piano.play('G', 3, 3);		
				}
				if((event.keyCode == 117 || event.keyCode == 85) && target.tagName != 'INPUT'){														//when key 'u' is pressed
						var piano = Synth.createInstrument('piano');
						piano.play('B', 3, 3);		
				}
				if((event.keyCode == 118 || event.keyCode == 86) && target.tagName != 'INPUT'){														//when key 'v' is pressed
						var piano = Synth.createInstrument('piano');
						piano.play('D', 5, 3);		
				}
				if((event.keyCode == 119 || event.keyCode == 87) && target.tagName != 'INPUT'){														//when key 'w' is pressed
						var piano = Synth.createInstrument('piano');
						piano.play('D', 3, 3);		
				}
				if((event.keyCode == 120 || event.keyCode == 88) && target.tagName != 'INPUT'){														//when key 'x' is pressed
						var piano = Synth.createInstrument('piano');
						piano.play('B', 4, 3);		
				}
				if((event.keyCode == 121 || event.keyCode == 89) && target.tagName != 'INPUT'){														//when key 'y' is pressed
						var piano = Synth.createInstrument('piano');
						piano.play('A', 3, 3);		
				}
				if((event.keyCode == 122 || event.keyCode == 90) && target.tagName != 'INPUT'){														//when key 'z' is pressed
						var piano = Synth.createInstrument('piano');
						piano.play('A', 4, 3);		
				}
				
});
