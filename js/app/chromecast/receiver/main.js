require.config({

    baseUrl: '/js',

    paths: {
        bean: 'libs/bean.min',
        underscore: 'libs/underscore-min',
        q: 'libs/q.min',
        socketio: '//cdnjs.cloudflare.com/ajax/libs/socket.io/1.2.1/socket.io.min'
    },

    shim: {
        'bean': {
            exports: 'bean'
        },
        'underscore': {
            exports: '_'
        },
        'q': {
            exports: 'q'
        },
        'socketio': {
            exports: 'io'
        }
    }

});

require([
    'app/chromecast/receiver/receiver',
    'app/chromecast/receiver/socket',
    'app/chromecast/receiver/queue',
    'app/chromecast/receiver/player',
    'app/chromecast/receiver/view'
], function (receiver, socket, queue, player, view) {
    view.init();
    player.init();
    queue.init();
    socket.init();
    receiver.init();
});