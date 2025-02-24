import { LANE_SIDE_OPTIONS } from "./config";

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

/**
 * 
 * @param {*} laneCount 
 * @returns 
 */
export function generateJunctionNodesAndEdges(laneCount) {
    const nodes = [];

    // each side of the junction
    for(let i = 0; i < 4; i++) {
        for(let j = 0; j < laneCount; j++) {
            nodes.push({
                id: `node-${i + 1}:${j + 1}`,
                type: "junctionLane",
                position: { x: 0, y: 0 },
                draggable: false,
                data: {
                    handleLocation: LANE_SIDE_OPTIONS[i + 1].handleLocation,
                    label: `${LANE_SIDE_OPTIONS[i + 1].label} ${j + 1}`
                }
            });
        }
    }

    return nodes;
}

/**
 * 
 * @param {*} laneCount 
 * @returns 
 */
export function generateJunctionEdges(laneCount) {
    const edges = [];

    return edges;
}