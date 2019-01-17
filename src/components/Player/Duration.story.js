import React from 'react'
import { storiesOf, addDecorator } from '@storybook/react'
import { withProvider } from '../../../.storybook/decorators'
import { number } from '@storybook/addon-knobs'

import Duration from './Duration.component'

storiesOf('Player/Duration', module)
    .addDecorator(withProvider)
    .add('default', () => {
        return <div style={{
            width: 150,
            height: 50,
        }}>
        <Duration percentComplete={number('percentComplete', 30)}/>
    </div>
    })

