var songListElem = $("#demo_song-list"),
    songDir = "./songs/",
    demoSong = $("#demo_song"),
    selectedSong,
    songs = [
    {
        title: "Imagine",
        author: "John Lennon",
        file: "imagine.txt"
    },
    {
        title: "Don't Worry, be Happy",
        author: "Bobby McFerrin",
        file: "dont-worry.txt"
    },
    {
        title: "Knockin On Heavens Door",
        author: "Bob Dylan",
        file: "knockin-on-heavens-door.txt"
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

$( document ).ready(function() {
    var songList = new SongList(songs);
    displaySongList.call( songListElem, songList.get() );
    loadInitialSong( songs[0] );
});


songListElem.on("click", selectSong);


function SongList (songs) {
    var songList = "<ul>";
    
    function createList () {
        for (var i = 0; i < songs.length; i++) {
            songList += 
            "<li data-url='" + songs[i].file + "' class='demo_song-list_item'>" +
                songs[i].title + " (" + songs[i].author + ")" +
            "</li>";
        }
        songList += "</ul>";
    }
    
    this.get = function () {
        createList();
        return songList;
    };
}

function displaySongList (songList) {
    this.addClass("demo_song-list").html(songList);
}

function selectSong(event) {
    var target = event.target;
    while (target != this) {
    if ( target.hasAttribute("data-url") ) {
        var file = target.getAttribute("data-url");
        highlightSelectedSong(target);
        loadSong(file);
        return;
    }
    target = target.parentNode;
    }
}

function highlightSelectedSong(elem) {
    if (selectedSong) {
        $(selectedSong).removeClass("demo_song-list_item_active");
    }

    selectedSong = elem;
    $(selectedSong).addClass("demo_song-list_item_active");
}

function loadSong (file) {
    $.ajax({
        url: songDir + file,
        success: function (data) {
            demoSong.text(data);
        },
        error: function(xhr, status, errorThrown) {
            console.log( "Error: " + errorThrown);
            console.log("Status: " + status);
            console.dir(xhr);
            return;
        },
        complete: function( xhr, status ) {
            var songs = document.querySelectorAll("pre.singer_song");

            for (var i = 0; i < songs.length; i++) {
                var singer = new Singer(songs[i]);
                singer.init();
            }
        }
    });
}

function loadInitialSong (song) {
    var elem = $("[data-url]");
    highlightSelectedSong(elem[0]);
    loadSong(song.file);
}

// Smooth scrolling from www.learningjquery.com
$(function() {
    $('a[href*=#]:not([href=#])').click(function() {
        if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
            if (target.length) {
                $('html,body').animate({
                    scrollTop: target.offset().top
                }, 300);
                return false;
            }
        }
    });
});