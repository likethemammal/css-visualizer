define(['app/options', 'bean'], function(Options, Bean) {

    var Receiver = {

        castReceiverManager: window.castReceiverManager,

        init: function() {
            this.customMessageBus = castReceiverManager.getCastMessageBus(Options.chromecastNamespace);
            this.customMessageBus.onMessage = this.onMessage;

            this.castReceiverManager.onSenderDisconnected = this.onSenderDisconnected.bind(this);
            this.castReceiverManager.onSenderConnected = this.onSenderConnected.bind(this);
            this.castReceiverManager.start();
            this.senders = this.castReceiverManager.getSenders();


            for (var i = 0; i < this.senders.length; i++) {
                var sender = this.senders[i];

                this.onSenderConnected(sender);

                console.log(this.senders, 'sending message')
            }
        },

        onMessage: function(ev) {
            var data = JSON.parse(ev.data);
            Bean.fire(window, data.event, data.value);
        },

        onSenderConnected: function(sender) {
            this.sender = sender.senderId;

            console.log(this.sender)

            this.customMessageBus.broadcast('socket.sendRoom');
        },

        onSenderDisconnected: function(ev) {
            if(this.castReceiverManager.getSenders().length == 0 &&
                ev.reason == cast.receiver.system.DisconnectReason.REQUESTED_BY_SENDER) {
                window.close();
            }
        }
    };

    return Receiver;
});
