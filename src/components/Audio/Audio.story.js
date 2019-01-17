import React from 'react'
import { storiesOf, addDecorator } from '@storybook/react'
import { withProvider, dispatch } from '../../../.storybook/decorators'

import _Audio from './'

import { actions } from './Audio.actions'

storiesOf('Audio', module)
    .addDecorator(withProvider)
    .add('default', () => {

        return <div>
            <button onClick={() => dispatch(actions.onPlayFaked())}>Play</button>
            <_Audio />
        </div>
    })

