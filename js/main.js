require.config({

    baseUrl: 'js',

    paths: {
        bean: 'libs/bean.min',
        underscore: 'libs/underscore-min',
        Dancer: 'libs/dancer',
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
        'Dancer': {
            exports: 'Dancer'
        },
        'underscore': {
            exports: '_'
        },
        'q': {
            exports: 'q'
        }
    }


});

require(['app/app', 'app/model', 'app/view', 'Dancer', 'soundcloud'], function (app, model, view, Dancer, SC) {
    clientID = '587aa2d384f7333a886010d5f52f302a';

    SC.initialize({
        client_id: clientID
    });

    dancer = new Dancer();

    model.init();
    view.init();
    app.init();

});