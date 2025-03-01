// junction constants
export const LANE_WIDTH = 0;
export const MIN_ARRIVAL_RATE = 0;
export const MAX_ARRIVAL_RATE = 0;

// vehicle constants
export const CAR_LENGTH = 4;                // meters
export const CAR_GAP = 1;                   // meters
export const VEHICLE_DEPATURE_SPEED = 2;    // seconds

// styles
export const CANVAS_STYLES = {
    background: "#F0F0F0"
}

export const MENU_CLASSES = {
    "create": "group-[:has(#create:checked)]/parent:right-0",
    "score": "group-[:has(#score:checked)]/parent:right-0",
    "save": "group-[:has(#save:checked)]/parent:right-0"
}

export const DEFAULT_ICON_SIZE = 20;

// layout 
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

export const FOUR_LANE_COORDS = [
    [{ x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }],
    [{ x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }],
    [{ x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }],
    [{ x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }]
];