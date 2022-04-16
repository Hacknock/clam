import { describe, it, expect, vi } from "vitest";
import fetch from "node-fetch";
import { getCountNode } from "./getCountNode";

describe("sample", () => {
  it("hello", async () => {
    vi.mock("node-fetch");
    fetch.mockReturnValue(
      Promise.resolve({ json: () => Promise.resolve({ count: 33 }) })
    );
    const result = await getCountNode();
    expect(result).toBe(31);
  });
});
