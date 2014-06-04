var Visualizers = Visualizers || {},
    chooser,
    Timer,
    IdleTimer,
    ui,
    dancer,
    a,
    
chooser = document.getElementById('chooser');
chooser.onchange = function(ev) {
    Visualizers[ev.target.value].run();
}

document.body.onload = function() {
    Visualizers[chooser.firstElementChild.value].run();
};

ui = document.getElementById('ui');
document.body.onmousemove = _.throttle(function() {
    ui.style.opacity = 1;
    clearInterval(IdleTimer);
    IdleTimer = setInterval(function() {
        ui.style.opacity = 0;
    }, 2000)
});

dancer = new Dancer();
a = new Audio();
a.src = 'https:api.soundcloud.com/tracks/150431004/download?client_id=b45b1aa10f1ac2941910a7f0d10f8e28&oauth_token=1-16343-49735712-69955a658d6fa5b';
// a.src = 'https:api.soundcloud.com/tracks/130504908/download?client_id=b45b1aa10f1ac2941910a7f0d10f8e28&oauth_token=1-16343-49735712-69955a658d6fa5b';
// a.src = '../Ludovico Einaudi Fly2.wav';
// a.src = 'https:www.dropbox.com/meta_dl/eyJzdWJfcGF0aCI6ICIiLCAidGVzdF9saW5rIjogZmFsc2UsICJzZXJ2ZXIiOiAiZGwuZHJvcGJveHVzZXJjb250ZW50LmNvbSIsICJpdGVtX2lkIjogbnVsbCwgImlzX2RpciI6IGZhbHNlLCAidGtleSI6ICJsNHp3Y3FnN2FyYnF2d3UifQ/AAJLDGi7mwiHsD0sYqnpqnFw002twFjlKlagMFXB-cFAJw?dl=1';
dancer.load(a);
dancer.play();