import { 
  DEFAULT_VPH,
  FOUR_LANE_COORDS, 
  ONE_LANE_COORDS, 
  THREE_LANE_COORDS, 
  TWO_LANE_COORDS 
} from "./config";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function computeAverageQueueTime() {
  return 1000;
}

export function computeMaxQueueTime() {
  return 1000;
}

export function computeAverageQueueLength() {
  return 1000;
}

export function computeMaxQueueLength() {
  return 1000;
}

export function computeJunctionScore() {
  return 10000;
}

export function computeTotalAverageQueueTime() {
  return 100;
}

export function computeTotalMaxQueueTime() {
  return 100;
}

export function computeTotalAverageQueueLength() {
  return 100;
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
              targetHandle: `handle-${i + 1}:${j + 1}`,
              label: "active"
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
  const url = `http://localhost:5173/?data=${data}`; // update...

  navigator.clipboard.writeText(url);
}

export function createDefaultLanes(laneCount) {
  return Array(laneCount * 4).fill(true).map(_ => ({
    vph: DEFAULT_VPH,
    label: "testing", // update...
    leftTurn: false
  }));
}

export function decodeSharedURL(data) {
  return JSON.parse(atob(data));
}