define(['app/options', 'bean', 'app/models/Queue', 'chromecast'], function (Options, Bean, Queue) {

    var Sender = {

        chromecastBtn: document.getElementById('chromecast'),
        session: '',
        currentMediaUrl: '',
        currentMedia: '',
        chromeLibTimer: '',

        init: function() {
            Bean.on(this.chromecastBtn, 'click', this.requestSession.bind(this));
            Bean.on(window, 'sender.loadMedia', this.loadMedia.bind(this));
            Bean.on(window, 'sender.stop', this.stopSession);
            Bean.on(window, 'sender.message', this.sendMessage.bind(this));

            if (!window.chromecastLoaded) {
                window['__onGCastApiAvailable'] = function(loaded, errorInfo) {
                    if (loaded) {
                        this.initializeCastApi();
                    } else {
                        console.log(errorInfo);
                    }
                }.bind(this);
            } else {
                this.initializeCastApi();
            }

        },

        initializeCastApi: function() {
            if (this.initialized) {
                return false;
            }

            this.initialized = true;
            console.log('cast api trying to initialize');
            var sessionRequest = new chrome.cast.SessionRequest(Options.chromecastAppID);
            var apiConfig = new chrome.cast.ApiConfig(sessionRequest, this.sessionListener.bind(this), this.receiverListener);

            chrome.cast.initialize(apiConfig, function() {
                console.log('success');
            }, function() {
                console.log('on error');
            });
        },

        sessionListener: function(ev) {
            console.log('session listener fired');

            this.onSession(ev);
        },

        receiverListener: function(ev) {
            if (ev === chrome.cast.ReceiverAvailability.AVAILABLE) {
                console.log('receiver available');
            } else {
                console.log('receiver unavailable', ev);
            }
        },

        requestSession: function() {
            if (!this.session) {
                chrome.cast.requestSession(function(e) {
                    this.onSession(e);
                    console.log('request session success')
                }.bind(this), function(e) {
                    console.log('request session error', e)
                });
            } else {
                console.log('Attempting to disconnect chromecast');
            }
        },

        onSession: function(session) {
            this.session = session;

            this.session.removeMessageListener(Options.chromecastNamespace, this.onMessage.bind(this));
            this.session.addMessageListener(Options.chromecastNamespace, this.onMessage.bind(this));

            Bean.fire(window, 'socket.connect');

            console.log('on session')


            //Browser was reloaded and media was grabbed again.
            if (this.session.media.length != 0) {
                this.onMediaLoaded('onRequestSessionSuccess', session.media[0]);
            } else {
                if (this.currentMediaUrl) {
                    this.loadMedia(this.currentMediaUrl);
                }
            }

        },

        onMessage: function(namespace, message) {
            console.log(namespace, message);
            Bean.fire(window, message);
        },

        loadMedia: function(mediaUrl) {
            this.currentMediaUrl = mediaUrl;

            var mediaInfo = new chrome.cast.media.MediaInfo(mediaUrl, "audio/mpeg");
            var request = new chrome.cast.media.LoadRequest(mediaInfo);

            this.session.loadMedia(request, this.onMediaLoaded.bind(this, 'loadMedia'), function(err) {
                console.log('media load error', err);
            });
        },

        onMediaLoaded: function(how, media) {
            console.log('media loaded success', media)
            media.addUpdateListener(function() {
                console.log('media updated');
            });
            this.currentMedia = media;

            var song = Queue.getCurrentSong();
            this.sendMessage({
                event: 'queue.metadata',
                value: song.getMetadata(true)
            });
        },

        stopSession: function() {
            this.session.stop(function() {
                console.log('stop successful');
            }, function(err) {
                console.log('stop error', err);
            });
        },

        sendMessage: function(message) {
            this.session.sendMessage(Options.chromecastNamespace, message, function() {
                console.log('message sent success');
            }, function(err) {
                console.log('message sent error');
            })
        }

    };

    return Sender;
});