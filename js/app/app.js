define(['app/visualizers/base', 'underscore', 'bean'], function (Base, _, Bean) {

    var App = {

        init: function() {
            Bean.fire(window, 'view.setVolume');

            var onLoadFunc = _.bind(function () {
                Bean.fire(window, 'setupFullscreen');
                Bean.fire(window, 'view.loadVis');
                Bean.fire(window, 'view.setVolume');
                Bean.fire(window, 'pageLoaded');
                Bean.fire(window, 'setupMusic');
            }, this);

            if (document.readyState === "complete") {
                onLoadFunc();
            } else {
                Bean.on(document, 'onload', onLoadFunc);
            }
        }

    };

    return App;

});