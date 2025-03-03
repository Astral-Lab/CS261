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

  const [green, red] = getSideLightDurationTimes(lane, junction);

  return ((red + green * computeLanePerformance(lane)) / 2).toFixed(1);
}

export function computeMaxQueueTime(lane, junction) {
  if(lane.vph === 0) return 0;

  const [_, red] = getSideLightDurationTimes(lane, junction);

  return (red + ((convertVphToVps(lane.vph) * red) / (VEHICLE_DEPATURE_RATE - convertVphToVps(lane.vph)))).toFixed(1);
}

export function computeMaxQueueLength(lane, junction) {
  const [green, red] = getSideLightDurationTimes(lane, junction);

  return Math.ceil((convertVphToVps(lane.vph) * red * (VEHICLE_DEPATURE_RATE * green + convertVphToVps(lane.vph) * red)) / 
    (VEHICLE_DEPATURE_RATE * green)) * (CAR_LENGTH + CAR_GAP);
}

export function computeJunctionScore() {
  return 10000;
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

export function generateJunctionEdges(laneCount) {
  const edges = [];

  // each side of the junction
  for(let i = 0; i < 4; i++) {
      for(let j = 0; j < laneCount; j++) {
          edges.push({
              id: `edge-${i + 1}:${j + 1}`,
              source: `node-${i + 1}:${j + 1}`,
              target: "i-1",
              targetHandle: `handle-${i + 1}:${j + 1}`
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
    "https://cs261-dev.pages.dev/"}
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