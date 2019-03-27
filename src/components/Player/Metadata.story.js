import React from 'react'
import { storiesOf, addDecorator } from '@storybook/react'
import { withProvider } from '../../../.storybook/decorators'

import Metadata from './Metadata.component'
import {withKnobs, text, boolean, number} from "@storybook/addon-knobs";

storiesOf('Player/Metadata', module)
    .addDecorator(withKnobs)
    .addDecorator(withProvider)
    .add('default', () => {
        return <Metadata
            ratioComplete={number('ratioComplete', 0.8)}
            timeLeft={number('timeLeft', 10000)}
            albumSrc={text('albumSrc', 'https://i1.sndcdn.com/artworks-000090489647-ikjbwo-crop.jpg')}
            artist={text('artist', 'Some artist name')}
            title={text('title', 'Some song title')}
        />
    })

