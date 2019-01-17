import React from 'react'
import DurationChecker from "./DurationChecker";

const Duration = ({ percentComplete }) => {
    return <div style={{
        width: '100%',
        height: '100%',
        background: 'green'
    }}>
        <div style={{
            width: `${percentComplete}%`,
            background: 'red',
            height: '100%'
        }}/>
        <DurationChecker/>
    </div>
}

export default Duration
