define(['app/options', 'bean', 'app/chromecast/receiver/visualizers/bars'], function(Options, Bean, Bars) {

    var View = {

        init: function() {
            Bean.on(window, 'view.visStart', this.startVisualizer.bind(this));
        },

        startVisualizer: function() {
            if (!this.visualizer) {
                this.visualizer = Bars;
                this.visualizer.run();
            }
        }
    };

    return View;
});
