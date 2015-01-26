define(['app/options', 'bean'], function(Options, Bean) {

    var Queue = {

        audiodata: {},

        init: function() {
            Bean.on(window, 'queue.audiodata', this.onAudiodata.bind(this));
        },

        onAudiodata: function(data) {
            if (data.songChanged) {
                this.audiodata = {};
            }
            this.audiodata = _.extend(data.audiodata, this.audiodata);
        }
    };

    return Queue;
});
