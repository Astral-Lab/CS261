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
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

/**
 * Computes the average queue time for a lane for a 
 * specific junction configuration.
 * 
 * @param {*} lane the lane to compute average queue time on
 * @param {*} junction the junction the lane connects to
 * @returns the average queue time or undefined if infinite growth
 */
export function computeAverageQueueTime(lane, junction) {
  if(lane.vph === 0) return 0;

  if(computeLanePerformance(lane) >= 1) return undefined;

  const [green, red] = getSideLightDurationTimes(lane, junction);

  return ((red + green * computeLanePerformance(lane)) / 2).toFixed(1);
}

/**
 * Computes the max queue time for a lane for a 
 * specific junction configuration.
 * 
 * @param {*} lane the lane to compute max queue time on
 * @param {*} junction the junction the lane connects to
 * @returns the max queue time or undefined if infinite growth
 */
export function computeMaxQueueTime(lane, junction) {
  if(lane.vph === 0) return 0;

  if(computeLanePerformance(lane) >= 1) return undefined;

  const [_, red] = getSideLightDurationTimes(lane, junction);

  return (red + ((convertVphToVps(lane.vph) * red) / (VEHICLE_DEPATURE_RATE - convertVphToVps(lane.vph)))).toFixed(1);
}

/**
 * Computes the max queue length for a lane for a
 * specific junction configuration.
 * 
 * @param {*} lane the lane to compute max queue length on
 * @param {*} junction the junction the lane connects to
 * @returns the max queue length or undefined if infinite growth
 */
export function computeMaxQueueLength(lane, junction) {
  if(computeLanePerformance(lane) >= 1) return undefined;

  const [green, red] = getSideLightDurationTimes(lane, junction);

  return Math.ceil((convertVphToVps(lane.vph) * red * (VEHICLE_DEPATURE_RATE * green + convertVphToVps(lane.vph) * red)) / 
    (VEHICLE_DEPATURE_RATE * green)) * (CAR_LENGTH + CAR_GAP);
}

/**
 * Computes the score for a junction configuration.
 * 
 * @param {*} junction the junction to compute the score on
 * @returns the score of the junction
 */
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

/**
 * Creates the react flow node configs rendered to the canvas.
 * 
 * @param {*} laneCount the number of lanes on each side of the junction
 * @returns an array of node configs passed to react flow
 */
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

/**
 * Creates the react flow edge configs rendered to the canvas.
 * 
 * @param {*} laneCount the number of lanes on each side of the junction
 * @param {*} activeSideIndex the side of the junction with green lights
 * @param {*} queues the state of the lanes queues in the simulation
 * @returns an array of edge configs passed to react flow
 */
export function generateJunctionEdges(laneCount, activeSideIndex, queues) {
  const edges = [];

  // each side of the junction
  for(let i = 0; i < 4; i++) {
      for(let j = 0; j < laneCount; j++) {
          edges.push({
              id: `edge-${i + 1}:${j + 1}`,
              source: `node-${i + 1}:${j + 1}`,
              target: "i-1",
              targetHandle: `handle-${i + 1}:${j + 1}`,
              // conditionally apply the animated edge type if the side the edge is on is active (green light)
              ...((activeSideIndex === i && queues[i + j].queueSize >= 1) && { type: "animatedEdge" })
          });
      }
  }

  return edges;
}

/**
 * Returns the junction coordinates matching the lane count.
 * 
 * @param {*} laneCount the number of lanes on each side of the junction
 * @returns an array of coordinates
 */
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

/**
 * Encodes a junction config and copies the corresponding URL to
 * the browser clipboard for link sharing.
 * 
 * @param {*} junction the junction config to encode and share
 */
export function copyJunctionURL(junction) {
  // conver the junction config to JSON and then base64 encode
  const data = btoa(JSON.stringify(junction));
  const url = `${process.env.NODE_ENV === "development" ? 
    "http://localhost:5173" : 
    "https://cs261-dev.pages.dev"}
    /?data=${data}`;

  navigator.clipboard.writeText(url);
}

/**
 * Creates the default lane configs when either initialising a 
 * new junction or chaning the lanes.
 * 
 * @param {*} laneCount the number of lanes on each side of the junction
 * @returns an array of lane configs passed to the junction config
 */
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

/**
 * Decodes a shared URL junction config into its object literal format.
 * 
 * @param {*} data the param of the shared URL
 * @returns the config object of a junction
 */
export function decodeSharedURL(data) {
  // base64 decode the param and then convert to an object literal
  return JSON.parse(atob(data));
}

/**
 * Computes the percentage of time of a complete light cycle that
 * a specified side of the junction uses.
 * 
 * @param {*} priorities an array of light priorities
 * @param {*} sideIndex the side to compute the priority of
 * @returns the percentage the side of the junction has of a light cycle
 */
export function getLightPriorityPercentage(priorities, sideIndex) {
  const weightSum = priorities.reduce((accumulator, currentValue) => accumulator + currentValue, 0);

  return Math.ceil((priorities[sideIndex] / weightSum) * 100);
}

/**
 * Converts the (vehicle) units from per hour to per second
 * used in junction metric calculations for consistent units.
 * 
 * @param {*} vph the vph to convert
 * @returns the vps 
 */
export function convertVphToVps(vph) {
  // vehicles per second
  return vph / 3600;
}

/**
 * Computes the green and red light period a lane uses for
 * a particular junction config.
 * 
 * @param {*} lane the lane to compute the light periods on
 * @param {*} junction the junction the lane is connected to
 * @returns the green and red durations in seconds
 */
export function getSideLightDurationTimes(lane, junction) {
  const green = junction.lightDuration * (junction.lightPriority[extractPriorityIndexFromLabel(lane)] / 
    junction.lightPriority.reduce((accumulator, currentValue) => accumulator + currentValue, 0));
  const red = junction.lightDuration - green;

  // returns an array to enable destructuring 
  return [green, red];
}

/**
 * Maps lane labels i.e. "Northbound 1" to its matching
 * side index, which range from 0-3 (N-W).
 * 
 * @param {*} lane the lane to extract the index from
 * @returns an index representing the side of the junction
 */
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

/**
 * Computes a lanes individual performance.
 * 
 * @param {*} lane the lane to compute the performance on
 * @returns the performance of the lane
 */
export function computeLanePerformance(lane) {
  return convertVphToVps(lane.vph) / VEHICLE_DEPATURE_RATE;
}

/**
 * Computes the lane queues at a particular point in time for 
 * each lane in the junction.
 * 
 * @param {*} junction the junction the simulation is ran on
 * @param {*} simulation the simulation instance
 * @returns an array of new lane queues
 */
export function getSimluationLaneQueues(junction, simulation) {
  const laneQueues = [];

  for(let i = 0; i < 4; i++) {
    for(let j = 0; j < (junction.lanes.length / 4); j++) {
      laneQueues.push(computeSimluationLaneQueue(
        junction.lanes[i + j], 
        simulation.activeSideIndex - 1 === i, 
        simulation.queues[i + j].queueSize
      ));
    }
  }

  console.log("NORTHBOUND 1: ", laneQueues[0]);
  console.log("EASTBOUND 1: ", laneQueues[1]);
  console.log("SOUTHBOUND 1: ", laneQueues[2]);
  console.log("WESTBOUND 1: ", laneQueues[3]);

  return simulation.queues.map((s, i) => ({
    queueSize: laneQueues[i],
    label: s.label
  }));
}

/**
 * Computes the queue size for a particular lane during 
 * the simulation execution. 
 * 
 * @param {*} lane the lane queue to update
 * @param {*} active indicates if the lane is in its green period
 * @param {*} oldQueueSize the previous queue size of a lane
 * @returns the updated queue size
 */
export function computeSimluationLaneQueue(lane, active, oldQueueSize) {
  let newQueueSize;
  let vps = convertVphToVps(lane.vph);

  newQueueSize = oldQueueSize + vps;

  // only subtract if queue size is a non-fractional value
  // as cannot depart a fraction of a car
  if(active && (newQueueSize - VEHICLE_DEPATURE_RATE >= 0)) {
    newQueueSize = newQueueSize - VEHICLE_DEPATURE_RATE;
  }

  // green light and enough vehicles in queue to depart
  // if(active && (newQueueSize - VEHICLE_DEPATURE_RATE > 0)) {
  //   //newQueueSize = Math.max(0, (oldQueueSize - VEHICLE_DEPATURE_RATE + vps));
  //   //newQueueSize = Math.max(0, oldQueueSize - VEHICLE_DEPATURE_RATE);
  //   newQueueSize -= VEHICLE_DEPATURE_RATE;

  // // red light
  // } else {
  //   //newQueueSize = oldQueueSize + vps;
  // }

  return  newQueueSize;
}

/**
 * Creates the initial lane queues to be used for the simulation.
 * 
 * @param {*} laneCount the number of lanes on each side of the junction
 * @returns an array of lane queue configs for each lane
 */
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

/**
 * Computes the coordinates the canvas camera is to animate to.
 * The point calculated is the midpoint of all lane nodes for a
 * particular side. For example, if there are two nodes on the
 * Northbound side, the coorindates returned represent the small
 * gap between the two nodes.
 * 
 * @param {*} nodes the nodes on a side of the junction
 * @param {*} alignAxis the axis to align the camera on
 * @returns the cartesian coordinates for the midpoint along the axis
 */
export function computeNodeSideMidpoint(nodes, alignAxis) {
  let x = nodes[0].position.x;
  let y = nodes[0].position.y;

  if(alignAxis === "x") {
    // sums all the axis coords and takes the average to compute the midpoint
    x = nodes.reduce((accumulator, currentValue) => accumulator + currentValue.position.x, 0) / nodes.length;

  } else if(alignAxis === "y") {
    y = nodes.reduce((accumulator, currentValue) => accumulator + currentValue.position.y, 0) / nodes.length;

  }

  return [x, y];
}

/**
 * Computes the timing breakpoints for the traffic lights in a junction, 
 * where light priority is taken into account. For example, for a priority
 * of [1, 1, 1, 1] on a 60s light cycle, the array [15, 30, 45, 60] is returned.
 * Used for ensuring the simulation animations trigger at the correct time.
 * 
 * @param {*} junction the junction to compute the breakpoints on
 * @returns an array of breakpoints
 */
export function computeSimulationSideBreakpoints(junction) {
  const durations = Array(4)
    .fill(junction.lightDuration)
    .map((value, i) => Math.floor(value * (junction.lightPriority[i]/junction.lightPriority.reduce((accumulator, currentValue) => accumulator + currentValue, 0))))
    
  // sums the previous terms into the new term i.e. [1, 1, 1, 1] becomes [1, 2, 3, 4]
  const breakpoints = durations.map((_, i) => durations.slice(0, i + 1).reduce((accumulator, currentValue) => accumulator + currentValue, 0));

  return breakpoints;
}