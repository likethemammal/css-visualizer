export const sampleArray = (arrayToSample, numOfSamples, modifier, decimalDigits) => {
    var arrayMiddle = arrayToSample.length/ 2,
        sampleLength = Math.floor((arrayMiddle) / numOfSamples),
        sampleAvgs = [],
        precision,
        sample;

    modifier = modifier || 1;
    decimalDigits = decimalDigits || 10;

    precision = Math.pow(10, decimalDigits);

    for (var j = 0; j < numOfSamples; j++) {
        sample = 0;

        for (var i = 0; i < sampleLength; i++) {
            sample += Math.abs(arrayToSample[(j * sampleLength) + i]);
            sample += Math.abs(arrayToSample[(j * sampleLength) + i + (arrayMiddle)]);
        }

        sample /= sampleLength*2;

        sampleAvgs.push(Math.round(sample * modifier * precision) / precision);
    }

    return sampleAvgs;
}

export const float32ToArray = (array) => {
    return Array.prototype.slice.call(array);
}
