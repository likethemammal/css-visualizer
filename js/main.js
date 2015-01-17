require.config({

    baseUrl: 'js',

    paths: {
        bean: 'libs/bean.min',
        underscore: 'libs/underscore-min',
        Dancer: 'libs/dancer',
        soundcloud: 'libs/soundcloud-sdk',
        q: 'libs/q.min',
        chromecast: 'https://www.gstatic.com/cv/js/sender/v1/cast_sender.js',
        socketio: 'https://cdnjs.cloudflare.com/ajax/libs/socket.io/1.2.1/socket.io.min.js'
    },

    shim: {
        'bean': {
            exports: 'bean'
        },
        'soundcloud': {
            exports: 'SC'
        },
        'Dancer': {
            exports: 'Dancer'
        },
        'underscore': {
            exports: '_'
        },
        'q': {
            exports: 'q'
        },
        'chromecast': {
            exports: 'chrome'
        },
        'socketio': {
            exports: 'io'
        }
    }


});

require([
    'app/app',
    'app/model',
    'app/view',
    'app/chromecast/sender',
    'app/chromecast/socket',
    'Dancer',
    'soundcloud',
    'chromecast'
], function (app, model, view, sender, socket, Dancer, SC, chrome) {
    clientID = '587aa2d384f7333a886010d5f52f302a';

    SC.initialize({
        client_id: clientID
    });

    dancer = new Dancer();

    socket.init();
    sender.init();

    model.init();
    view.init();
    app.init();

});