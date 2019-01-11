import React from 'react'
import { storiesOf, addDecorator } from '@storybook/react'
import { withProvider } from '../../../.storybook/decorators'

import _Audio from './'

storiesOf('Audio', module)
    .addDecorator(withProvider)
    .add('default', () => {
        return <_Audio />
    })

