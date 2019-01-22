import React from 'react'
import { storiesOf, addDecorator } from '@storybook/react'
import { withProvider } from '../../../.storybook/decorators'

import Controls from './Controls'

storiesOf('Player/Controls', module)
    .addDecorator(withProvider)
    .add('default', () => {
        return <Controls />
    })

