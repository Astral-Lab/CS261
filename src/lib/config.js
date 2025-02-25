// junction constants
export const MIN_SIDE_LANES = 1;
export const MAX_SIDE_LANES = 5;
export const LANE_WIDTH = 0;
export const MIN_ARRIVAL_RATE = 0;
export const MAX_ARRIVAL_RATE = 0;

// traffic light constants
export const TRAFFIC_LIGHT_DURATION = 0;
export const TRAFFIC_LIGHT_COUNT = 4;
export const MAX_TRAFFIC_LIGHT_DURATION = 0;
export const MIN_TRAFFIC_LIGHT_DURATION = 0;

// vehicle constants
export const CAR_LENGTH = 0;
export const CAR_GAP = 0;
export const VEHICLE_DEPATURE_SPEED = 0;

export const CANVAS_STYLES = {
    background: "#F0F0F0"
}

export const DEFAULT_ICON_SIZE = 20;

// layout 
export const JUNCTION_LAYOUTS = {

}

export const ONE_LANE_COORDS = [
    [{ x: 0, y: -650 }],
    [{ x: 750, y: 0 }],
    [{ x: 0, y: 650 }],
    [{ x: -750, y: 0 }]
];

export const TWO_LANE_COORDS = [
    [{ x: -275, y: -700 }, { x: 275, y: -700 }],
    [{ x: 800, y: -200 }, { x: 800, y: 200 }],
    [{ x: -275, y: 700 }, { x: 275, y: 700 }],
    [{ x: -800, y: -200 }, { x: -800, y: 200 }]
];

export const THREE_LANE_COORDS = [
    [{ x: -550, y: -900 }, { x: 0, y: -900 }, { x: 550, y: -900 }],
    [{ x: 1200, y: -400 }, { x: 1200, y: 0 }, { x: 1200, y: 400 }],
    [{ x: -550, y: 900 }, { x: 0, y: 900 }, { x: 550, y: 900 }],
    [{ x: -1200, y: -400 }, { x: -1200, y: 0 }, { x: -1200, y: 400 }]
];

// TODO
export const FOUR_LANE_COORDS = [
    [{ x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }],
    [{ x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }],
    [{ x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }],
    [{ x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }]
];

// TODO
export const FIVE_LANE_COORDS = [
    [{ x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }],
    [{ x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }],
    [{ x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }],
    [{ x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }]
];