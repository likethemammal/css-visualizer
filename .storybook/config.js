import { configure } from '@storybook/react';

function loadStories() {
    require('../src/components/Audio/Audio.story');
    require('../src/components/Player/Player.story');
    require('../src/components/Visualizer/Visualizer.story');
}

configure(loadStories, module);
