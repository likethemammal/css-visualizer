

// define variables

var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
var source;

// use XHR to load an audio track, and
// decodeAudioData to decode it and stick it in a buffer.
// Then we put the buffer into the source

function getData() {
    source = audioCtx.createBufferSource();
    request = new XMLHttpRequest();

    request.open('GET', 'audio.mp3', true);

    request.responseType = 'arraybuffer';


    request.onload = function() {
        var audioData = request.response;

        console.log('audio loaded')

        audioCtx.decodeAudioData(audioData, function(buffer) {
            source.buffer = buffer;

                console.log(buffer)

            source.connect(audioCtx.destination);
            source.loop = true;
        },

        function(e){"Error with decoding audio data" + e.err});
    };

    request.send();
}

// wire up buttons to stop and play audio

$playBtn[0].onclick = function() {
    getData();
    source.start(0);
    $playBtn[0].setAttribute('disabled', 'disabled');
};

$stopBtn[0].onclick = function() {
    source.stop(0);
    $playBtn[0].removeAttribute('disabled');
};
