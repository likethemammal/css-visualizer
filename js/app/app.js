define(['app/visualizers/base', 'underscore', 'bean', 'app/models/queue', 'app/view'], function (Base, _, Bean, queue, view) {

    var App = {

        init: function() {

            var onLoadFunc = function () {
                Bean.off(document, 'onload');

                queue.init();
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