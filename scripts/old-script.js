var win = $(window);
var songUrl = "./songs/";
var selectedSong;
var songs = [
	{
		title: "Don't Worry, be Happy",
		author: "Bobby McFerrin",
		file: "dont-worry.txt"
	},
	{
		title: "Jingle Bells",
		author: "James Lord Pierpont",
		file: "jingle-bells.txt"
	},
	{
		title: "I'm yours",
		author: "Jason Mraz",
		file: "im-yours.txt"
	}
];


createNavigation(header_navigation);
var songList = new SongList(songs);
displaySongList("demo_song-list");

if (!selectedSong) {
	var elem = $(".demo_song-list_item");
	highlightSelectedSong(elem[0]);
	loadSong(songs[0].file);
}



$(".content_section_heading").on("click", function() {
	var elemPosition = $(this).offset().top;
	$("html, body").scrollTop(elemPosition);
});

$("#demo_song-list").on("click", function(event) {
	var target = event.target;

	while (target != this) {
	var file = $(target).attr("data-url");
		if (file != null) {
			loadSong(file);
			highlightSelectedSong(target);
			return;
		}
		target = target.parentNode;
	}
});



function createNavigation(elem) {
	var self = this;
	
	function scrollToSection(scrollingPoint) {
		var elem = $("#" + scrollingPoint);
		var elemPosition = elem.offset().top;

		$("html, body").animate({
			scrollTop: elemPosition
		}, 400);
	}
	
	$(elem).on("click", function(event) {
		var target = event.target;
		
		while (target != this) {
		var scrollingPoint = $(target).attr("data-scroll");
			if (scrollingPoint != null) {
				scrollToSection(scrollingPoint);
				return;
			}
			target = target.parentNode;
		}
	});
}

function SongList(songs) {
	var songList = "<ul>";
	
	function createList() {
		for (var i = 0; i < songs.length; i++) {
			songList += 
			"<li data-url='" + songs[i].file + "' class='demo_song-list_item'>" +
				songs[i].title + " ⎯ " + songs[i].author +
			"</li>";
		}
		songList += "</ul>";
	}
	
	this.get = function() {
		createList();
		return songList;
	}
}

function displaySongList(where) {
	var elem = $("#" + where);
	elem.addClass("demo_song-list").html(songList.get());
}

function loadSong(url) {
	$.ajax({
		url: songUrl + url,
		success: function(data) {
			$("#demo_song").text(data);
			Singer();
		}
	});
}

function highlightSelectedSong(elem) {
	if (selectedSong) {
		$(selectedSong).removeClass("demo_song-list_item_active");
	}

	selectedSong = elem;
	$(selectedSong).addClass("demo_song-list_item_active");
}
