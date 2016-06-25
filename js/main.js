require.config({

    baseUrl: 'js',

    paths: {
        bean: 'libs/bean.min',
        underscore: 'libs/underscore-min',
        backbone: 'libs/backbone',
        jquery: 'libs/jquery-2.1.3.min',
        soundcloud: 'libs/soundcloud-sdk',
        q: 'libs/q.min'
    },

    shim: {
        'bean': {
            exports: 'bean'
        },
        'soundcloud': {
            exports: 'SC'
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
        }
    }


});

require([
    'app/app',
    'app/models/player',
    'soundcloud'
], function (app, PlayerModel, SC) {
    clientID = '587aa2d384f7333a886010d5f52f302a';

    SC.initialize({
        client_id: clientID
    });

    window.PlayerModel = PlayerModel;
    
    PlayerModel.init();
    app.init();

});