import React from 'react'
import { storiesOf } from '@storybook/react'
import {withProvider} from "../../../.storybook/decorators"

import Visualizer from './'
import Audio from '../Audio/'

import './Bars/Bars.css'

storiesOf('Visualizer', module)
    .addDecorator(withProvider)
    .add('default', () => {
        return <Audio><Visualizer /></Audio>
    })
