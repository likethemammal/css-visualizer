import React from 'react'
import { storiesOf, addDecorator } from '@storybook/react'
import { withProvider } from '../../../.storybook/decorators'

import Player from './'

storiesOf('Player', module)
    .addDecorator(withProvider)
    .add('default', () => {
        return <Player />
    })

