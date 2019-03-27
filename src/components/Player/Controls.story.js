import React from 'react'
import { storiesOf, addDecorator } from '@storybook/react'
import { withProvider } from '../../../.storybook/decorators'
import addons from '@storybook/addons'
// import { withColors } from 'storybook-colors-addon'

import Controls from './Controls'
import colors from '../../constants/colors'
import { styles, localColors } from './Controls.component'

storiesOf('Player/Controls', module)
    // .addDecorator(withColors(colors, localColors, styles)(addons))
    .addDecorator(withProvider)
    .add('default', () => {
        return <Controls />
    })

