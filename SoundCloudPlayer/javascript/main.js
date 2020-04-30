var UI = {};
UI.enterPressed = function(){

	var input = document.querySelector('.js-search').value;
	soundCloudAPI.getTrack(input);
	var container = document.querySelector('.cards');
	container.innerHTML = '';

}

var btn = document.querySelector('.js-submit');
btn.addEventListener('click', UI.enterPressed);


var inputagain = document.querySelector('.js-search');
inputagain.addEventListener('keyup', function(event){
	if(event.keyCode === 13){
		UI.enterPressed();
	}
});


var soundCloudAPI = {};

soundCloudAPI.init = function () {

    SC.initialize({
        client_id: 'cd9be64eeb32d1741c17cb39e41d254d'
    });

}


soundCloudAPI.init();

soundCloudAPI.getTrack = function (inputValue) {

    // find all sounds of buskers licensed under 'creative commons share alike'
    SC.get('/tracks', {
        q: inputValue
    }).then(function (tracks) {
        // console.log(tracks);
        soundCloudAPI.renderTracks(tracks);

    });

}



soundCloudAPI.renderTracks = function (tracks) {


    tracks.forEach(function (track) {

        // var trac = JSON.parse(track);

        var placeimg = 'https://i.picsum.photos/id/49/200/200.jpg';

        console.log('tracks rendered');


        var card = document.createElement('div');
        card.classList.add('card');

        //image
        var imageDiv = document.createElement('div');
        imageDiv.classList.add('image');

        var image_img = document.createElement('img');
        image_img.classList.add('image_img');
        image_img.src = track.artwork_url || placeimg;

        imageDiv.appendChild(image_img);


        //content
        var content = document.createElement('div');
        content.classList.add('content');

        var header = document.createElement('div');
        header.classList.add('header');
        header.innerHTML = '<a href= ' + track.permalink_url + ' target="_blank">' + track.title + '</a>';


        //button
        var button = document.createElement('div');
        button.classList.add('ui', 'bottom', 'attached', 'button', 'js-button');

        var icon = document.createElement('i');
        icon.classList.add('add', 'icon');

        var buttonText = document.createElement('span');
        buttonText.innerHTML = 'Add to playlist';

        button.addEventListener('click',function () {
            soundCloudAPI.getEmbed(track.permalink_url);
        })


        //appendChild
        content.appendChild(header);

        button.appendChild(icon);
        button.appendChild(buttonText);

        card.appendChild(imageDiv);
        card.appendChild(content);
        card.appendChild(button);

        var searchResults = document.querySelector('.js-search-results');
        searchResults.appendChild(card);

    });

}

soundCloudAPI.getEmbed = function (url) {
    SC.oEmbed(url, {
        auto_play: true
    }).then(function (embed) {
        // console.log('oEmbed response: ', embed);
        var sidebar = document.querySelector('.js-playlist');

        var box = document.createElement('div');
        box.innerHTML = embed.html;
        sidebar.insertBefore(box, sidebar.firstChild);
        localStorage.setItem("key", sidebar.innerHTML);
    });

}


var sidebar = document.querySelector('.js-playlist');
sidebar.innerHTML = localStorage.getItem('key');


document.querySelector('.reset').addEventListener('click',function(){

	localStorage.clear();
	document.querySelector('.js-playlist').innerHTML = '';
})