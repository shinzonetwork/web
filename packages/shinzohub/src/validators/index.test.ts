import { afterEach, describe, expect, it } from "vitest";
import { createShinzoHubClient } from "../index";
import {
  mockShinzoHubApi,
  restoreShinzoHubApiMock,
  shinzoHubTestClient,
  validatorFixture,
} from "../internal/test-utils";
import { listValidators } from "./index";

afterEach(restoreShinzoHubApiMock);

describe("validator queries", () => {
  it("lists validators with explicit Comet pagination parameters", async () => {
    const api = mockShinzoHubApi({
      validatorsBlockHeight: 123,
      validators: [
        validatorFixture({
          address: "0x0B556CFF4829C40773FDD05C44E0269CF22123F3",
          votingPower: 10,
          proposerPriority: -8,
        }),
      ],
    });

    const result = await listValidators(shinzoHubTestClient, {
      height: 123,
      page: 2,
      perPage: 50,
    });

    expect(result).toEqual({
      blockHeight: 123n,
      validators: [
        {
          address: "0x0b556cff4829c40773fdd05c44e0269cf22123f3",
          pubKey: {
            type: "tendermint/PubKeyEd25519",
            value: "A83lbqaRU8f+9Oi8pSnk2V2e17zggC/V+oLjDM9xC6k=",
          },
          votingPower: 10n,
          proposerPriority: -8n,
        },
      ],
      count: 1,
      total: 1,
    });
    api.expectRpcRequest(0, "validators", {
      height: "123",
      page: "2",
      per_page: "50",
    });
  });

  it("defaults to the first validator page and supports client actions", async () => {
    const api = mockShinzoHubApi({
      validatorsBlockHeight: 456,
      validators: [],
    });
    const client = createShinzoHubClient(shinzoHubTestClient);

    const result = await client.listValidators();

    expect(result).toEqual({
      blockHeight: 456n,
      validators: [],
      count: 0,
      total: 0,
    });
    api.expectRpcRequest(0, "validators", {
      page: "1",
      per_page: "100",
    });
  });
});
