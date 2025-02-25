import { FIVE_LANE_COORDS, FOUR_LANE_COORDS, ONE_LANE_COORDS, THREE_LANE_COORDS, TWO_LANE_COORDS } from "./config";

/**
 * 
 */
export function computeAverageQueueTime() {
    
}

/**
 * 
 */
export function computeMaxQueueTime(arrivalRate, departureRate, redLightDuration) {
    return redLightDuration + (arrivalRate * redLightDuration) / (departureRate - arrivalRate);
}

/**
 * 
 */
export function computeAverageQueueLength() {

}

/**
 * 
 */
export function computeMaxQueueLength() {

}

/**
 * 
 */
export function computeJunctionScore() {

}

export function generateJunctionNodesAndEdges(laneCount) {
    const nodes = [{
        id: 'i-1',
        type: 'junctionIntersection',
        position: { x: 0, y: 0 },
        draggable: false,
        data: { laneCount }
    }];
    const labels = ["Northbound", "Eastbound", "Southbound", "Westbound"];
    const handleLocation = ["Bottom", "Left", "Top", "Right"];
    const coords = getJunctionCoords(laneCount);

    // each side of the junction
    for(let i = 0; i < 4; i++) {
        for(let j = 0; j < laneCount; j++) {
            nodes.push({
                id: `node-${i + 1}:${j + 1}`,
                type: "junctionLane",
                position: coords[i][j],
                draggable: false,
                data: {
                    handleLocation: handleLocation[i],
                    label: `${labels[i]} ${j + 1}`
                }
            });
        }
    }

    return nodes;
}

export function generateJunctionEdges(laneCount) {
    const edges = [];

    return edges;
}

export function getJunctionCoords(laneCount) {
    if(laneCount === 1) {
        return ONE_LANE_COORDS;

    } else if(laneCount === 2) {
        return TWO_LANE_COORDS;

    } else if(laneCount === 3) {
        return THREE_LANE_COORDS;

    } else if(laneCount === 4) {
        return FOUR_LANE_COORDS;

    } else {
        return FIVE_LANE_COORDS;
    }
}