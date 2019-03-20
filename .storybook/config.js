import { configure, addDecorator } from '@storybook/react'

import { withOptions } from '@storybook/addon-options';
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

addDecorator(
    withOptions({
        url: '#',
        goFullScreen: true,
        showStoriesPanel: false,
        showAddonPanel: false,
        showSearchBox: false,
        enableShortcuts: false,
    })
)

configure(loadStories, module)

import './general.css'
