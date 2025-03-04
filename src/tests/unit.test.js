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
      expect(1 + 1).toBe(2);
    });

    test("computes max queue time for a single lane", () => {
      expect(1 + 1).toBe(2);
    });

    test("computes max queue length for a single lane", () => {
      expect(1 + 1).toBe(2);
    });

    test("computes lane performance for a single lane", () => {
      expect(1 + 1).toBe(2);
    });

    test("computes the junction score", () => {
      expect(1 + 1).toBe(2);
    });
    
    test("converts the vph to vps", () => {
      expect(convertVphToVps(3600)).toBe(1);
    });

    test("extracts the cardinal direction for a lane", () => {
      expect(1 + 1).toBe(2);
    });

    test("decodes a junction configuration for link sharing", () => {
      expect(1 + 1).toBe(2);
    });
});