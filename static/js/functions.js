

let songElements = document.getElementsByClassName('song');

for (var i = 0; i < songElements.length; i++) {

	songElements[i].addEventListener('mouseover', function () {
		this.style.backgroundColor = '#00A0FF';

		this.querySelectorAll('.song-meta-data .song-title')[0].style.color = '#FFFFFF';
		this.querySelectorAll('.song-meta-data .song-artist')[0].style.color = '#FFFFFF';

		if (!this.classList.contains('amplitude-active-song-container')) {
			this.querySelectorAll('.play-button-container')[0].style.display = 'block';
		}

		this.querySelectorAll('img.bandcamp-grey')[0].style.display = 'none';
		this.querySelectorAll('img.bandcamp-white')[0].style.display = 'block';
		this.querySelectorAll('.song-duration')[0].style.color = '#FFFFFF';
	});

	/*
		Ensure that on mouseout, CSS styles don't get messed up for active songs.
	*/
	songElements[i].addEventListener('mouseout', function () {
		this.style.backgroundColor = '#FFFFFF';
		this.querySelectorAll('.song-meta-data .song-title')[0].style.color = '#272726';
		this.querySelectorAll('.song-meta-data .song-artist')[0].style.color = '#607D8B';
		this.querySelectorAll('.play-button-container')[0].style.display = 'none';
		this.querySelectorAll('img.bandcamp-grey')[0].style.display = 'block';
		this.querySelectorAll('img.bandcamp-white')[0].style.display = 'none';
		this.querySelectorAll('.song-duration')[0].style.color = '#607D8B';
	});

	/*
		Show and hide the play button container on the song when the song is clicked.
	*/
	songElements[i].addEventListener('click', function () {
		this.querySelectorAll('.play-button-container')[0].style.display = 'none';
	});
}

/*
	Initializes AmplitudeJS
*/



Amplitude.init({
	"songs": [
		{
			// "name": "Heroe (feat. Sesi)",
			// "artist": "Gabriel Aguiñaga",
			// "album": "Cristo Vive",
			"url": "https://musikcolab.s3.amazonaws.com/01_Heroe+(feat.+Sesi).mp3",
			// "cover_art_url": "https://musikcolab.s3.amazonaws.com/img_covers/gabe-album.jpg"
		},
		{
			"name": "Mi Historia",
			"artist": "Gabriel Aguiñaga",
			"album": "Cristo Vive",
			"url": "https://musikcolab.s3.amazonaws.com/02_Mi_Historia.mp3",
			"cover_art_url": "img/gabe-album.jpg"
		},
		{
			"name": "Soy Feliz",
			"artist": "Gabriel Aguiñaga",
			"album": "Cristo Vive",
			"url": "https://musikcolab.s3.amazonaws.com/03_Soy_Feliz.mp3",
			"cover_art_url": "img/gabe-album.jpg"
		},
		{
			"name": "I Came Running",
			"artist": "Ancient Astronauts",
			"album": "We Are to Answer",
			"url": "../songs/ICameRunning-AncientAstronauts.mp3",
			"cover_art_url": "../album-art/we-are-to-answer.jpg"
		},
		{
			"name": "First Snow",
			"artist": "Emancipator",
			"album": "Soon It Will Be Cold Enough",
			"url": "../songs/FirstSnow-Emancipator.mp3",
			"cover_art_url": "../album-art/soon-it-will-be-cold-enough.jpg"
		},
		{
			"name": "Terrain",
			"artist": "pg.lost",
			"album": "Key",
			"url": "../songs/Terrain-pglost.mp3",
			"cover_art_url": "../album-art/key.jpg"
		},
		{
			"name": "Vorel",
			"artist": "Russian Circles",
			"album": "Guidance",
			"url": "../songs/Vorel-RussianCircles.mp3",
			"cover_art_url": "../album-art/guidance.jpg"
		},
		{
			"name": "Intro / Sweet Glory",
			"artist": "Jimkata",
			"album": "Die Digital",
			"url": "../songs/IntroSweetGlory-Jimkata.mp3",
			"cover_art_url": "../album-art/die-digital.jpg"
		},
		{
			"name": "Offcut #6",
			"artist": "Little People",
			"album": "We Are But Hunks of Wood Remixes",
			"url": "../songs/Offcut6-LittlePeople.mp3",
			"cover_art_url": "../album-art/we-are-but-hunks-of-wood.jpg"
		},
		{
			"name": "Dusk To Dawn",
			"artist": "Emancipator",
			"album": "Dusk To Dawn",
			"url": "../songs/DuskToDawn-Emancipator.mp3",
			"cover_art_url": "../album-art/from-dusk-to-dawn.jpg"
		},
		{
			"name": "Anthem",
			"artist": "Emancipator",
			"album": "Soon It Will Be Cold Enough",
			"url": "../songs/Anthem-Emancipator.mp3",
			"cover_art_url": "../album-art/soon-it-will-be-cold-enough.jpg"
		}
	]
});