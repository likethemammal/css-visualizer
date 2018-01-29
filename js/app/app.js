define(['app/visualizers/base', 'underscore', 'bean', 'app/models/DesktopQueue', 'app/view', 'jquery'], function (Base, _, Bean, DesktopQueue, view, $) {

    var App = {

        init: function() {


            $(document).ready(function(){
                DesktopQueue.init();
                view.init();
            });

        }

    };

    return App;

});