import { 
  CAR_GAP,
  CAR_LENGTH,
  DEFAULT_VPH,
  FOUR_LANE_COORDS, 
  ONE_LANE_COORDS, 
  THREE_LANE_COORDS, 
  TWO_LANE_COORDS, 
  VEHICLE_DEPATURE_RATE
} from "./config";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function computeAverageQueueTime(lane, junction) {
  if(lane.vph === 0) return 0;

  if(computeLanePerformance(lane) >= 1) return undefined;

  const [green, red] = getSideLightDurationTimes(lane, junction);

  return ((red + green * computeLanePerformance(lane)) / 2).toFixed(1);
}

export function computeMaxQueueTime(lane, junction) {
  if(lane.vph === 0) return 0;

  if(computeLanePerformance(lane) >= 1) return undefined;

  const [_, red] = getSideLightDurationTimes(lane, junction);

  return (red + ((convertVphToVps(lane.vph) * red) / (VEHICLE_DEPATURE_RATE - convertVphToVps(lane.vph)))).toFixed(1);
}

export function computeMaxQueueLength(lane, junction) {
  if(computeLanePerformance(lane) >= 1) return undefined;

  const [green, red] = getSideLightDurationTimes(lane, junction);

  return Math.ceil((convertVphToVps(lane.vph) * red * (VEHICLE_DEPATURE_RATE * green + convertVphToVps(lane.vph) * red)) / 
    (VEHICLE_DEPATURE_RATE * green)) * (CAR_LENGTH + CAR_GAP);
}

export function computeJunctionScore(junction) {
  let totalFlow = junction.lanes.reduce((accumulator, currentValue) => accumulator + convertVphToVps(currentValue.vph), 0);
  let normalisedLaneCount = junction.laneCount / 5;
  let totalLanePerformance = 0;

  for(let i = 0; i < junction.lanes.length; i++) {
    let [green, red] = getSideLightDurationTimes(junction.lanes[i], junction);
    totalLanePerformance += computeLanePerformance(junction.lanes[i]) / (green / (green + red));
  }

  if(totalFlow === 0) return 0;
  
  // multiplying by 100 to provide "score inflation" for more of an impact
  return Math.round((totalFlow) / ((totalLanePerformance / junction.lanes.length) * normalisedLaneCount)) * 100;
}

export function generateJunctionNodes(laneCount) {
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

export function generateJunctionEdges(laneCount, activeSideIndex) {
  const edges = [];

  // each side of the junction
  for(let i = 0; i < 4; i++) {
      for(let j = 0; j < laneCount; j++) {
          edges.push({
              id: `edge-${i + 1}:${j + 1}`,
              source: `node-${i + 1}:${j + 1}`,
              target: "i-1",
              targetHandle: `handle-${i + 1}:${j + 1}`,
              ...(activeSideIndex === i && { type: "animatedEdge" })
          });
      }
  }

  return edges;
}

export function getJunctionCoords(laneCount) {
  if(laneCount === 1) {
      return ONE_LANE_COORDS;

  } else if(laneCount === 2) {
      return TWO_LANE_COORDS;

  } else if(laneCount === 3) {
      return THREE_LANE_COORDS;

  } else {
      return FOUR_LANE_COORDS;

  }
}

export function copyJunctionURL(junction) {
  const data = btoa(JSON.stringify(junction));
  const url = `${process.env.NODE_ENV === "development" ? 
    "http://localhost:5173" : 
    "https://cs261-dev.pages.dev"}
    /?data=${data}`;

  navigator.clipboard.writeText(url);
}

export function createDefaultLanes(laneCount) {
  const defaultLanes = [];

  for(let i = 0; i < 4; i++) {
    for(let j = 0; j < laneCount; j++) {
      defaultLanes.push({
        vph: DEFAULT_VPH,
        label: `${["Northbound", "Eastbound", "Southbound", "Westbound"][i]} ${j + 1}`
      });
    }
  }

  return defaultLanes;
}

export function decodeSharedURL(data) {
  return JSON.parse(atob(data));
}

export function getLightPriorityPercentage(priorities, sideIndex) {
  const weightSum = priorities.reduce((accumulator, currentValue) => accumulator + currentValue, 0);

  return Math.ceil((priorities[sideIndex] / weightSum) * 100);
}

export function convertVphToVps(vph) {
  return vph / 3600;
}

export function getSideLightDurationTimes(lane, junction) {
  const green = junction.lightDuration * (junction.lightPriority[extractPriorityIndexFromLabel(lane)] / 
    junction.lightPriority.reduce((accumulator, currentValue) => accumulator + currentValue, 0));
  const red = junction.lightDuration - green;

  return [green, red];
}

export function extractPriorityIndexFromLabel(lane) {
  let index = 0;

  switch(lane[0]) {
    case "N": {
      index = 0;
      break;
    }
    case "E": {
      index = 1;
      break;
    }
    case "S": {
      index = 2;
      break;
    }
    case "W": {
      index = 3;
    }
  }

  return index;
}

export function computeLanePerformance(lane) {
  return convertVphToVps(lane.vph) / VEHICLE_DEPATURE_RATE
}

export function getSimluationLaneQueues(junction, simulation) {
  const laneQueues = [];

  for(let i = 0; i < 4; i++) {
    for(let j = 0; j < (junction.lanes.length / 4); j++) {
      laneQueues.push(computeSimluationLaneQueue(junction.lanes[i + j], simulation.activeSideIndex === i, simulation.queues[i + j].queueSize));
    }
  }

  return simulation.queues.map((s, i) => ({
    queueSize: laneQueues[i],
    label: s.label
  }));
}

export function computeSimluationLaneQueue(lane, active, oldQueueSize) {
  let newQueueSize;
  let vps = convertVphToVps(lane.vph);

  // green light and enough vehicles in queue to depart
  if(active && (oldQueueSize + vps >= VEHICLE_DEPATURE_RATE)) {
    newQueueSize = Math.max(0, (oldQueueSize - VEHICLE_DEPATURE_RATE + vps));

  // red light
  } else {
    newQueueSize = oldQueueSize + vps;
  }

  return  newQueueSize;
}

export function generateSimulationLaneQueues(laneCount) {
  const laneQueues = [];

  for(let i = 0; i < 4; i++) {
    for(let j = 0; j < laneCount; j++) {
      laneQueues.push({
        queueSize: 0,
        label: `${["Northbound", "Eastbound", "Southbound", "Westbound"][i]} ${j + 1}`
      });
    }
  }

  return laneQueues;
}

export function computeNodeSideMidpoint(nodes, alignAxis) {
  let x = nodes[0].position.x;
  let y = nodes[0].position.y;

  if(alignAxis === "x") {
    x = nodes.reduce((accumulator, currentValue) => accumulator + currentValue.position.x, 0) / nodes.length;

  } else if(alignAxis === "y") {
    y = nodes.reduce((accumulator, currentValue) => accumulator + currentValue.position.y, 0) / nodes.length;

  }

  return [x, y];
}

export function computeSimulationSideBreakpoints(junction) {
  const durations = Array(4)
    .fill(junction.lightDuration)
    .map((value, i) => Math.floor(value * (junction.lightPriority[i]/junction.lightPriority.reduce((accumulator, currentValue) => accumulator + currentValue, 0))))
    
  const breakpoints = durations.map((_, i) => durations.slice(0, i + 1).reduce((accumulator, currentValue) => accumulator + currentValue, 0));

  return breakpoints;
}