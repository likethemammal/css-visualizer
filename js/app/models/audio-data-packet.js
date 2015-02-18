define(['underscore', 'backbone'], function (_, Backbone) {
    var AudioDataPacket = Backbone.Model.extend({

        seconds: {},
        secondNums: [],
        lastCompleteSecond: 0,

        emptyPackets: function() {
            //Get any partial that might not have been sent between intervals
            var partialSecondNum = this.lastCompleteSecond + 1;
            var partialSecond = this.seconds[partialSecondNum];

            //Empty data
            this.seconds = {};
            this.secondNums = [];

            //Replace partial second.
            this.seconds[partialSecondNum] = partialSecond;
            this.secondNums.push(partialSecondNum);
        },

        mergePackets: function(packet) {
            packet = this.deserializeData(packet);

            for (var i = 0; i < packet.secondNums.length; i++) {
                var secondNumber = packet.secondNums[i];
                var packetFrames = this.smartParse(packet.seconds[secondNumber]);
                var localFrames = this.seconds[secondNumber] || [];

                //Get frame string from frames array, convert to array, and add to local stack.
                for (var j = 0; j < packetFrames.length; j++) {
                    var frame = this.smartParse(packetFrames[j]);
                    localFrames.push(frame);
                }

                //Reset the local stack whether its empty or not.
                this.seconds[i] = localFrames;
            }
        },

        getFrame: function(second, frame) {
            var frames = this.seconds[second] || []; //get all the frames at a particular second

            return frames[frame] || [];
        },

        packFrame: function(frame, second) {
            //Set the frame to the position in the seconds obj that's specified
            var frames = this.smartParse(this.seconds[second]);

            //Add record that the second has been added
            if (_.indexOf(this.secondNums, second) < 0) {
                this.secondNums.push(second);
            }

            //Stringify value to make it easier to send
            frames.push(JSON.stringify(frame));

            //Stringify the whole frames array and reassign back as the correct second.
            this.seconds[second] = JSON.stringify(frames);

            //Set the last completed second
            if (second > this.lastCompleteSecond) {
                this.lastCompleteSecond = second - 1;
            }
        },

        smartParse: function(array) {
            return array ? JSON.parse(array) : []
        },

        serializeData: function() {
            //Complex objects can be sent through the socket so we just send the data.
            return {
                seconds: JSON.stringify(this.seconds),
                secondNums: JSON.stringify(this.secondNums)
            };
        },

        deserializeData: function(packet) {
            return {
                seconds: this.smartParse(packet.seconds),
                secondNums: this.smartParse(packet.secondNums)
            };
        }
    });

    return AudioDataPacket;
});