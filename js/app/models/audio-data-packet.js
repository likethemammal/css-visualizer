define(['underscore', 'backbone'], function (_, Backbone) {
    var AudioDataPacket = Backbone.Model.extend({

        seconds: {},
        lastCompleteSecond: 0,

        emptyPackets: function() {
            //Get any partial that might not have been sent between intervals
            var partialSecond = this.seconds[this.lastCompleteSecond + 1];

            this.seconds = {};
            this.seconds[this.lastCompleteSecond + 1] = partialSecond;
        },

        mergePackets: function(packet) {
            this.seconds = _.extend(this.seconds, packet.seconds);
        },

        getFrame: function(second) {
            var frames = this.seconds[second] || []; //get all the frame at a particular second
            var currentFrame = frames.shift(); //take first frame from frames

            this.seconds[second] = frames;

            return currentFrame || [];
        },

        packFrame: function(frame, second) {
            //Set the frame to the position in the seconds obj that's specified
            var frames = this.seconds[second] || [];

            frames.push(frame);

            this.seconds[second] = frames;

            if (second > this.lastCompleteSecond) {
                this.lastCompleteSecond = second - 1;
            }
        }
    });

    return AudioDataPacket;
});