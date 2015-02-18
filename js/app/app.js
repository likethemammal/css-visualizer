define(['app/visualizers/base', 'underscore', 'bean', 'app/models/DesktopQueue', 'app/view'], function (Base, _, Bean, DesktopQueue, view) {

    var App = {

        init: function() {

            var onLoadFunc = function () {
                Bean.off(document, 'onload');

                DesktopQueue.init();
                view.init();
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