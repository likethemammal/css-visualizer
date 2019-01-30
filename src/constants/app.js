import _ from 'lodash'

export const prefix = (function () {
    var styles = window.getComputedStyle(document.documentElement, ''),
        pre = (Array.prototype.slice
                .call(styles)
                .join('')
                .match(/-(moz|webkit|ms)-/) || (styles.OLink === '' && ['', 'o'])
        )[1],
        dom = ('WebKit|Moz|MS|O').match(new RegExp('(' + pre + ')', 'i'))[1];
    return {
        dom: dom,
        lowercase: pre,
        css: '-' + pre + '-',
        js: pre[0].toUpperCase() + pre.substr(1)
    };
})();


export const genres = ["Electro Pop", "Hip Hop", "Chillwave", "Classical", "Indie", "Jazz", "Folk", "Metal", "Latin", "Reggae", "World", "Piano", "Electronic", "Country", "Dance"]


export const visualizers = {
    HEXAGONS: 'Hexagons',
    CIRCLES: 'Circles',
    BARS: 'Bars',
}

export const visualizerLabels = _.map(
    visualizers,
    label => label,
)

export const GITHUB_LINK = 'http://github.com/likethemammal/css-visualizer'

export const SC_ID = '587aa2d384f7333a886010d5f52f302a'

export const SONG_BATCH_SIZE = 15
