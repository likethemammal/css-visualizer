import Bars from "../components/Visualizer/Bars";
import Hexagons from "../components/Visualizer/Hexagons";
import _ from "lodash";
import {visualizerLabels} from "./app";

export const visualizers = {
    Bars,
    Hexagons
}

export const visualizerLabelsOrdered = visualizerLabels.filter((visualizerKey, index) => {
    return visualizers[visualizerKey]
})

export const visualizersOrdered = visualizerLabelsOrdered.map((visualizerKey, index) => {
    return visualizers[visualizerKey]
})
