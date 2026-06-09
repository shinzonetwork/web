import { afterEach, describe, expect, it } from "vitest";
import {
  blockFixture,
  hashFixture,
  mockShinzoHubApi,
  restoreShinzoHubApiMock,
  shinzoHubTestClient,
} from "../internal/test-utils.js";
import {
  getBlock,
  getBlockTimestamp,
  getLatestBlock,
  getLatestBlockHeight,
  listBlocks,
} from "./index.js";

const blockHash = hashFixture("44");
const latestBlockHash = hashFixture("66");
const parentHash = hashFixture("33");

afterEach(restoreShinzoHubApiMock);

describe("block queries", () => {
  it("supports block feeds, detail pages, and timestamp enrichment", async () => {
    const api = mockShinzoHubApi({
      latestBlockHeight: 25,
      blocks: [
        blockFixture({
          hash: blockHash,
          parentHash,
          height: 20,
          transactionCount: 3,
        }),
        blockFixture({
          hash: latestBlockHash,
          parentHash: blockHash,
          height: 25,
          transactionCount: 2,
        }),
      ],
    });

    const listed = await listBlocks(shinzoHubTestClient, {
      minHeight: 16,
      maxHeight: 20,
    });
    const latest = await getLatestBlock(shinzoHubTestClient);
    const selected = await getBlock(shinzoHubTestClient, { height: 20 });
    const latestHeight = await getLatestBlockHeight(shinzoHubTestClient);
    const timestamp = await getBlockTimestamp(shinzoHubTestClient, {
      height: 20,
    });

    expect(listed).toMatchObject({
      latestHeight: 25n,
      blocks: [
        {
          hash: blockHash,
          parentHash,
          height: 20n,
          transactionCount: 3,
          size: 806n,
        },
      ],
    });
    expect(latest).toMatchObject({
      height: 25n,
      transactionCount: 2,
      size: null,
    });
    expect(selected.height).toBe(20n);
    expect(latestHeight).toBe(25n);
    expect(timestamp).toBe("2026-06-09T12:00:00Z");
    api.expectRequestCount(5);
  });
});
