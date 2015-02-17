define(['app/options', 'bean', 'app/models/audio-data-packet'], function(Options, Bean, AudioDataPacket) {

    var Queue = {

        audioDataPacket: new AudioDataPacket(),

        init: function() {
            Bean.on(window, 'queue.audiodata', this.onAudiodata.bind(this));
            Bean.on(window, 'queue.showdata', this.showData.bind(this));
        },

        onAudiodata: function(data) {
            if (data.songChanged) {
                this.audioDataPacket.emptyPackets();
            }

            //Parse fake audioDataPacket from string into simple obj with seconds data.
            var audioDataPacket = JSON.parse(data.audioDataPacket);

            this.audioDataPacket.mergePackets(audioDataPacket);
            Bean.fire(window, 'queue.showData');
        },

        showData: function() {
            console.log(this.audioDataPacket);
        }
    };

    return Queue;
});
