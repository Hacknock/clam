// @vitest-environment jsdom

import "vi-fetch/setup";
import { describe, it, expect } from "vitest";
import { mockGet } from "vi-fetch";
import { getCount } from "./getCount";

describe("sample", () => {
  it("hello", async () => {
    const mock = mockGet("https://hogehoge.hogehoge.hogehoge").willResolve({
      count: 33,
    });
    const result = await getCount();
    expect(result).toBe(33);
  });
});
