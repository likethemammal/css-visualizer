define(['app/options', 'bean', 'app/models/Queue'], function(Options, Bean, Queue) {

    var ChromecastQueue = _.extend({

        init: function() {
            Bean.on(window, 'queue.metadata', this.onMetadata.bind(this));
            Bean.on(window, 'queue.audiodata', this.onAudiodata.bind(this));
            Bean.on(window, 'queue.showdata', this.showData.bind(this));
        },

        onAudiodata: function(data) {
            //Parse fake audioDataPacket from string into simple obj with seconds data.
            var audioDataPacket = data.audioDataPacket;

            var song = this.getCurrentSong();

            song.audioDataPacket.mergePackets(audioDataPacket);

            this.setCurrentSong(song);
            Bean.fire(window, 'queue.showData');
        },

        getCurrentSongFrame: function(currentSecond, currentFrame) {
            var song = this.getCurrentSong();
            return song.audioDataPacket.getFrame(currentSecond, currentFrame);
        },

        onMetadata: function(metadata) {
            console.log('metadata received')
            this.addSongFromMetadata(metadata);
            Bean.fire(window, 'player.metadata');
        },

        showData: function() {
            console.log(this.audioDataPacket);
        }
    }, Queue);

    return ChromecastQueue;
});
