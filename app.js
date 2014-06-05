var Visualizers = Visualizers || {},
    visualizerContainer,
    chooser,
    Timer,
    IdleTimer,
    ui,
    dancer,
    a,
    fullscreen;
    
chooser = document.getElementById('chooser');
chooser.onchange = function(ev) {
    if (Visualizers.currentVisualizer) {
        Visualizers.currentVisualizer.destroy();
    }
    Visualizers[ev.target.value].run();
}

setTimeout(function() {
    Visualizers[chooser.firstElementChild.value].run();
}, 10);

visualizerContainer = document.getElementById('visualizer-container');
ui = document.getElementById('ui');
document.body.onmousemove = _.throttle(function() {
    visualizerContainer.style.cursor = 'auto';
    ui.style.opacity = 1;
    clearInterval(IdleTimer);
    IdleTimer = setInterval(function() {
        ui.style.opacity = 0;
        visualizerContainer.style.cursor = 'none';
    }, 2000);
});

dancer = new Dancer();
a = new Audio();
// a.src = 'https:api.soundcloud.com/tracks/150431004/download?client_id=b45b1aa10f1ac2941910a7f0d10f8e28&oauth_token=1-16343-49735712-69955a658d6fa5b';
// a.src = 'https:api.soundcloud.com/tracks/130504908/download?client_id=b45b1aa10f1ac2941910a7f0d10f8e28&oauth_token=1-16343-49735712-69955a658d6fa5b';
a.src = '../Ludovico Einaudi Fly2.wav';
// a.src = 'https:api.soundcloud.com/tracks/149098250/download?client_id=b45b1aa10f1ac2941910a7f0d10f8e28&oauth_token=1-16343-49735712-69955a658d6fa5b'
// a.src = 'https:www.dropbox.com/meta_dl/eyJzdWJfcGF0aCI6ICIiLCAidGVzdF9saW5rIjogZmFsc2UsICJzZXJ2ZXIiOiAiZGwuZHJvcGJveHVzZXJjb250ZW50LmNvbSIsICJpdGVtX2lkIjogbnVsbCwgImlzX2RpciI6IGZhbHNlLCAidGtleSI6ICJsNHp3Y3FnN2FyYnF2d3UifQ/AAJLDGi7mwiHsD0sYqnpqnFw002twFjlKlagMFXB-cFAJw?dl=1';
dancer.load(a);
dancer.play();


fullscreen = document.getElementById('fullscreen');

if (
    document.fullscreenEnabled || 
    document.webkitFullscreenEnabled || 
    document.mozFullScreenEnabled ||
    document.msFullscreenEnabled
) {
    fullscreen.onclick = function() {
        toggleFullscreen(visualizerContainer);
    }
} else {
    fullscreen.style.display = 'none';
}