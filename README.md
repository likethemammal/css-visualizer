# CSS Music Visualizer

## About

This is a set of visualizers that are made entirely using DOM elements and CSS3 Animations and Transforms. **There is no SVG, Canvas, WebGL, or visual plug-in used.** It takes quite a bit of tweaking to reduce compositing and optimze rendering layers but this is the kind of stuff CSS can do now a days.

[**Live Demo**](http://likethemammal.github.io/css-visualizer)


*(Everything you see is made from div tags!)*

![CSS Visualizer - Hexagon Mode](http://i.imgur.com/E6PfK3j.png?1)

It uses [Dancer.js](https://github.com/jsantell/dancer.js) a small Web Audio library to get `spectrum` and `waveform` data using the HTML5 audio tag.

![CSS Visualizer - Bars Mode](http://i.imgur.com/hBcYVJ9.png?1)

There are currently two types of visualizer:

 * The Hexagonal one, which utilize spectrum data and uses `before` and `after` psudeo-elements to create the six-sided shape.
 * And Bars, which projects the waveform data and uses the CSS3 transform `skew` to create the 3D column shape.

![CSS Visualizer - Hexagon Mode](http://i.imgur.com/R1MpAA6.png)

It has a relatively simple ui but the plan is to connect it to the [SoundCloud](http://SoundCloud.com) API to visualizer any song on their service.

There is a a few other visualizer ideas I'm toying with. I've restricting myself to only using traditional DOM elements like `div`, `li`, etc.

![CSS Visualizer - Bars Mode](http://i.imgur.com/WkTcNR5.png)
