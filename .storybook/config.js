import { configure, addDecorator } from '@storybook/react'

import { withKnobs } from '@storybook/addon-knobs'

addDecorator(
    withKnobs
)

function loadStories() {
    require('../src/components/Audio/Audio.story');
    require('../src/components/Player/Duration.story');
    require('../src/components/Player/Player.story');
    require('../src/components/Visualizer/Visualizer.story');
}

configure(loadStories, module);
