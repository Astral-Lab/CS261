// junction constants
export const MIN_ARRIVAL_RATE = 0;
export const MAX_ARRIVAL_RATE = 3600;
export const DEFAULT_VPH = 500;

// vehicle constants
export const CAR_LENGTH = 4;                // meters
export const CAR_GAP = 1;                   // meters
export const VEHICLE_DEPATURE_RATE = 1;     // 1 per second

// styles
export const CANVAS_STYLES = {
    background: "#F0F0F0"
}

// workaround to runtime dynamic tailwind classes
// tailwind compiles so has to know beforehand which 
// utility classes to create, this overcomes that
export const MENU_CLASSES = {
    "create": "group-[:has(#create:checked)]/parent:right-0",
    "score": "group-[:has(#score:checked)]/parent:right-0",
    "save": "group-[:has(#save:checked)]/parent:right-0"
}

export const HANDLE_STYLES = {
    width: 20,
    height: 20,
    right: 0,
    border: "2px solid white",
    background: "#60A5FA"
}

export const DEFAULT_ICON_SIZE = 20;

// node layout 
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
    [{ x: -850, y: -1200 }, { x: -280, y: -1200 }, { x: 280, y: -1200 }, { x: 850, y: -1200 }],
    [{ x: 1400, y: -600 }, { x: 1400, y: -200 }, { x: 1400, y: 200 }, { x: 1400, y: 600 }],
    [{ x: -850, y: 1200 }, { x: -280, y: 1200 }, { x: 280, y: 1200 }, { x: 850, y: 1200 }],
    [{ x: -1400, y: -600 }, { x: -1400, y: -200 }, { x: -1400, y: 200 }, { x: -1400, y: 600 }]
];

// default junction
export const DEFAULT_JUNCTION = {
    name: "Junction 1",
    score: 0,
    laneCount: 2,
    lightDuration: 60,
    lightPriority: [1, 1, 1, 1],    // north, east, south, west
    lanes: [
        {
            vph: DEFAULT_VPH,
            label: "Northbound 1"
        },
        {
            vph: DEFAULT_VPH,
            label: "Northbound 2"
        },
        {
            vph: DEFAULT_VPH,
            label: "Eastbound 1"
        },
        {
            vph: DEFAULT_VPH,
            label: "Eastbound 2"
        },
        {
            vph: DEFAULT_VPH,
            label: "Southbound 1"
        },
        {
            vph: DEFAULT_VPH,
            label: "Southbound 2"
        },
        {
            vph: DEFAULT_VPH,
            label: "Westbound 1"
        },
        {
            vph: DEFAULT_VPH,
            label: "Westbound 2"
        }
    ]
}

// simulation default state
export const DEFAULT_SIMULATION = {
    activeSideIndex: 1,
    seconds: 0,
    runSim: false,
    queues: [
        {
            size: 0,
            departed: false,
            label: "Northbound 1"
        },
        {
            size: 0,
            departed: false,
            label: "Northbound 2"
        },
        {
            size: 0,
            departed: false,
            label: "Eastbound 1"
        },
        {
            size: 0,
            departed: false,
            label: "Eastbound 2"
        },
        {
            size: 0,
            departed: false,
            label: "Southbound 1"
        },
        {
            size: 0,
            departed: false,
            label: "Southbound 2"
        },
        {
            size: 0,
            departed: false,
            label: "Westbound 1"
        },
        {
            size: 0,
            departed: false,
            label: "Westbound 2"
        }
    ]
}