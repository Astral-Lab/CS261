import { DEFAULT_JUNCTION } from "../lib/config";
import {
  computeAverageQueueTime,
  computeMaxQueueTime,
  computeMaxQueueLength,
  computeLanePerformance,
  computeJunctionScore,
  convertVphToVps,
  extractPriorityIndexFromLabel,
  decodeSharedURL
} from "../lib/utils";

describe("util functions", () => {
    test("computes average queue time for a single lane", () => {
      expect(Number(computeAverageQueueTime(DEFAULT_JUNCTION.lanes[0], DEFAULT_JUNCTION))).toBe(23.0);
    });

    test("computes max queue time for a single lane", () => {
      expect(Number(computeMaxQueueTime(DEFAULT_JUNCTION.lanes[0], DEFAULT_JUNCTION))).toBe(48.4);
    });

    test("computes max queue length for a single lane", () => {
      expect(Number(computeMaxQueueLength(DEFAULT_JUNCTION.lanes[0], DEFAULT_JUNCTION))).toBe(40);
    });

    test("computes lane performance for a single lane", () => {
      expect(Number(computeLanePerformance(DEFAULT_JUNCTION.lanes[0]))).toBe(0.06944444444444445);
    });

    test("computes the junction score", () => {
      expect(Number(computeJunctionScore(DEFAULT_JUNCTION))).toBe(1000);
    });
    
    test("converts the vph to vps", () => {
      expect(Number(convertVphToVps(3600))).toBe(1);
    });

    // bounds checking unit conversion
    test("converts the vph to vps (max bound)", () => {
      expect(Number(convertVphToVps(5000))).toBe(1.3888888888888888);
    });
    
    test("converts the vph to vps (min bound)", () => {
      expect(Number(convertVphToVps(0))).toBe(0);
    });

    test("extracts the cardinal direction for a lane", () => {
      expect(Number(extractPriorityIndexFromLabel(DEFAULT_JUNCTION.lanes[0]))).toBe(0);
    });

    test("decodes a junction configuration for link sharing", () => {
      expect(decodeSharedURL("eyJuYW1lIjoiQ1NTIEpVTkNUSU9OIDopIiwic2NvcmUiOjAsImxhbmVDb3VudCI6MSwibGlnaHREdXJhdGlvbiI6NjAsImxpZ2h0UHJpb3JpdHkiOlsxLDEsMSwxXSwibGFuZXMiOlt7InZwaCI6NTAwLCJsYWJlbCI6Ik5vcnRoYm91bmQgMSJ9LHsidnBoIjo1MDAsImxhYmVsIjoiRWFzdGJvdW5kIDEifSx7InZwaCI6NTAwLCJsYWJlbCI6IlNvdXRoYm91bmQgMSJ9LHsidnBoIjo1MDAsImxhYmVsIjoiV2VzdGJvdW5kIDEifV19")).toEqual({
        "name": "CSS JUNCTION :)",
        "score": 0,
        "laneCount": 1,
        "lightDuration": 60,
        "lightPriority": [
            1,
            1,
            1,
            1
        ],
        "lanes": [
            {
                "vph": 500,
                "label": "Northbound 1"
            },
            {
                "vph": 500,
                "label": "Eastbound 1"
            },
            {
                "vph": 500,
                "label": "Southbound 1"
            },
            {
                "vph": 500,
                "label": "Westbound 1"
            }
        ]
      });
    });
});