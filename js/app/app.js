define(['app/visualizers/base', 'underscore', 'bean'], function (Base, _, Bean) {

    var App = {

        init: function() {
            Bean.fire(window, 'playerView.setupVolume');

            var onLoadFunc = function () {
                Bean.fire(window, 'view.setupFullscreen');
                Bean.fire(window, 'view.loadVis');
                Bean.fire(window, 'playerView.setupVolume');
                Bean.fire(window, 'pageLoaded');
                Bean.fire(window, 'model.setupMusic');
            };

            if (document.readyState === "complete") {
                onLoadFunc();
            } else {
                Bean.on(document, 'onload', onLoadFunc);
            }
        }

    };

    return App;

});