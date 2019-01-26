import React from 'react'
import { storiesOf } from '@storybook/react'
import {withProvider} from "../../../.storybook/decorators"

import Visualizer from './'
import Player from '../Player/'

import './Hexagons/Hexagons.css'
import './Bars/Bars.css'

storiesOf('Visualizer', module)
    .addDecorator(withProvider)
    .add('default', () => {
        return <div>
            <Player/>
            <Visualizer/>
        </div>
    })
