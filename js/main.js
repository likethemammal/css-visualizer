require.config({

    baseUrl: 'js',

    paths: {
        bean: 'libs/bean.min',
        underscore: 'libs/underscore-min',
        backbone: 'libs/backbone',
        jquery: 'libs/jquery-2.1.3.min',
        Dancer: 'libs/dancer',
        soundcloud: 'libs/soundcloud-sdk',
        q: 'libs/q.min',
        chromecast: [
            '//www.gstatic.com/cv/js/sender/v1/cast_sender',
            'libs/cast_sender'
        ],
        socketio:[
            '//cdnjs.cloudflare.com/ajax/libs/socket.io/1.2.1/socket.io.min',
            'libs/socket.io.min'
        ]
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
        'jquery': {
            exports: '$'
        },
        backbone: {
            deps: ["underscore", "jquery"],
            exports: "Backbone"
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
    'app/models/player',
    'app/chromecast/sender/sender',
    'app/chromecast/sender/socket',
    'Dancer',
    'soundcloud'
], function (app, PlayerModel, sender, socket, Dancer, SC) {
    clientID = '587aa2d384f7333a886010d5f52f302a';

    SC.initialize({
        client_id: clientID
    });

    dancer = new Dancer();

    socket.init();
    sender.init();

    PlayerModel.init();
    app.init();

});