define(['app/options', '../../.', 'bean'], function (Options, chrome, Bean) {

    var Sender = {

        chromecastBtn: document.getElementById('chromecast'),
        session: '',
        currentMediaUrl: '',
        currentMedia: '',

        init: function() {
            Bean.on(this.chromecastBtn, 'click', this.requestSession);
            Bean.on(window, 'sender.loadMedia', this.loadMedia);
            Bean.on(window, 'sender.stop', this.stopSession);
            Bean.on(window, 'sender.message', this.sendMessage);

            if (!chrome.cast || !chrome.cast.isAvailable) {
                setTimeout(this.initializeCastApi.bind(this), 1000);
            }
        },

        initializeCastApi: function() {
            var sessionRequest = new chrome.cast.SessionRequest(Options.chromecastAppID);
            var apiConfig = new chrome.cast.ApiConfig(sessionRequest, this.sessionListener.bind(this), this.receiverListener);

            chrome.cast.initialize(apiConfig, function() {
                console.log('success');
            }, function() {
                console.log('on error');
            });
        },

        sessionListener: function(ev) {
            this.session = ev;

            //Browser was reloaded and media was grabbed again.
            if (this.session.media.length != 0) {
                this.onMediaLoaded('onRequestSessionSuccess', session.media[0]);
            }
        },

        receiverListener: function(ev) {
            if (ev === chrome.cast.ReceiverAvailability.AVAILABLE) {
                console.log('receiver available');
            } else {
                console.log('receiver unavailable');
            }
        },

        requestSession: function() {
            if (!this.session) {
                chrome.cast.requestSession(function(e) {
                    this.session = e;
                    this.loadMedia();
                    console.log('request session success')
                }.bind(this), function() {
                    console.log('request session error')
                });
            } else {
                console.log('Attempting to disconnect chromecast');
            }
        },

        loadMedia: function(mediaUrl) {
            mediaUrl = mediaUrl || this.currentMediaUrl;
            this.currentMediaUrl = mediaUrl;

            var mediaInfo = new chrome.cast.media.MediaInfo(mediaURL);
            var request = new chrome.cast.media.LoadRequest(mediaInfo);

            this.session.loadMedia(request, this.onMediaLoaded.bind(this, 'loadMedia'), function() {
                console.log('media load error');
            });
        },

        onMediaLoaded: function(how, media) {
            media.addUpdateListener(function() {
                console.log('media updated');
            });
            this.currentMedia = media;
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