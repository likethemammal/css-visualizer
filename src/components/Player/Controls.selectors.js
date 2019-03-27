import {
    createSelectorWithDependencies as createSelector
} from 'reselect-tools'

import {
    Controls,
    colors as _colors,
    visualizerIndex as _visualizerIndex,
    genreIndex as _genreIndex,
    numColors as _numColors,
    color1 as _color1,
    color2 as _color2,
    color3 as _color3,
    idle as _idle,
    hovered as _hovered,
    currentGenre as _currentGenre,
    currentGenreFormatted as _currentGenreFormatted,
} from './Controls.units'

export const idle = createSelector(
    Controls,
    _idle,
)

export const colors = createSelector(
    Controls,
    _colors,
)

export const hovered = createSelector(
    Controls,
    _hovered,
)

export const visualizerIndex = createSelector(
    Controls,
    _visualizerIndex,
)

export const genreIndex = createSelector(
    Controls,
    _genreIndex,
)

export const currentGenre = createSelector(
    genreIndex,
    _currentGenre,
)

export const currentGenreFormatted = createSelector(
    currentGenre,
    _currentGenreFormatted,
)

export const numColors = createSelector(
    Controls,
    _numColors,
)

export const color1 = createSelector(
    colors,
    _color1,
)

export const color2 = createSelector(
    colors,
    _color2,
)

export const color3 = createSelector(
    colors,
    _color3,
)
