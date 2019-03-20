import { configure, addDecorator, addParameters } from '@storybook/react'

import { withKnobs } from '@storybook/addon-knobs'

addDecorator(
    withKnobs
)

function loadStories() {
    require('../src/components/Visualizer/Visualizer.story');
    require('../src/components/Audio/Audio.story');
    require('../src/components/Player/Duration.story');
    require('../src/components/Player/Player.story');
    require('../src/components/Player/Metadata.story');
    require('../src/components/Player/Controls.story');
}

addParameters({
    options: {
        url: '#',
        goFullScreen: true,
        showStoriesPanel: false,
        showAddonPanel: false,
        showSearchBox: false,
        enableShortcuts: false,
    }
})

configure(loadStories, module)

import './general.css'
