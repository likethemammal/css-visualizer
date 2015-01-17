var Queue = {
    fps: 30,
    audioData: [],
    visfired: false,

    init: function() {
        Bean.on(window, 'audio.data', this.onAudioData.bind(this));
    },

    onAudioData: function(compressedData) {

        if (!this.visfired) {
            Bars.run();
            this.visfired = true;
        }

//        this.audioData.push(compressedData.split('|'));
        console.log(compressedData)
        this.audioData.push(compressedData);
    }

};