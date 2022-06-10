// @vitest-environment jsdom

import "vi-fetch/setup";
import { describe, it, expect } from "vitest";
import GCS from "../lib/gcs.js";
import ToolKit from "../lib/toolkit.js";
const toolKit = new ToolKit();
import crypto from "crypto";

("use strict");

describe("[GCS] getAccessToken VALID TEST", () => {
  const params = {
    clientId: "clientId",
    redirectUrl: "http://localhost:3000",
    scope: "https://www.googleapis.com/auth/devstorage.read_only",
  };
  const gcs = new GCS(toolKit);
  gcs.setCred(params);

  it("location has hash and access_token", () => {
    //location mock
    global.window = Object.create(window);
    const url = "http://localhost";
    const dummyToken = crypto
      .randomBytes(160)
      .toString("hex")
      .substring(0, 160);
    const dummyJoint = crypto.randomBytes(4).toString("hex").substring(0, 4);
    Object.defineProperty(window, "location", {
      value: {
        href: `${url}/#state=pass-through%20value&access_token=${dummyJoint}.${dummyToken}&token_type=Bearer&expires_in=1000&scope=https://www.googleapis.com/auth/devstorage.read_only`,
        hash: `#state=pass-through%20value&access_token=${dummyJoint}.${dummyToken}&token_type=Bearer&expires_in=1000&scope=https://www.googleapis.com/auth/devstorage.read_only`,
        configurable: true,
      },
      configurable: true,
    });
    const actual = gcs.getAccessToken(window.location);
    expect(actual).toStrictEqual({ token: `${dummyJoint}.${dummyToken}` });
  });

  it("location has hash but it does not have access_token", () => {
    //location mock
    delete window.location.href;
    delete window.location.hash;
    const url = "http://localhost";
    Object.defineProperty(window, "location", {
      value: {
        href: `${url}/#state=pass-through%20value`,
        hash: "#state=pass-through%20value",
        configurable: true,
      },
      configurable: true,
    });
    const actual = gcs.getAccessToken(window.location);
    expect(actual).toStrictEqual({
      token: null,
      message: "This location has no access token info.",
    });
  });

  it("location does not have hash", () => {
    //location mock
    delete window.location.href;
    delete window.location.hash;
    const url = "http://localhost";
    Object.defineProperty(window, "location", {
      value: {
        href: url,
        configurable: true,
      },
      configurable: true,
    });
    const actual = gcs.getAccessToken(window.location);
    expect(actual).toStrictEqual({
      token: null,
      message: "This location has no access token info.",
    });
  });

  it("location is an empty Object", () => {
    delete window.location.href;
    delete window.location.hash;
    delete window.location.token;
    delete window.location.configurable;
    const actual = gcs.getAccessToken(window.location);
    expect(actual).toStrictEqual({
      token: null,
      message: "This location has no access token info.",
    });
  });
});

describe("[GCS] getAccessToken INVALID TEST", () => {
  const params = {
    clientId: "clientId",
    redirectUrl: "http://localhost:3000",
    scope: "https://www.googleapis.com/auth/devstorage.read_only",
  };
  const gcs = new GCS(params, toolKit);
  it("Invalid argument is number", () => {
    expect(() => {
      const actual = gcs.getAccessToken(3333);
    }).toThrow(/^You must input location which is Object.$/);
  });

  it("Invalid argument is Boolean", () => {
    expect(() => {
      const actual = gcs.getAccessToken(true);
    }).toThrow(/^You must input location which is Object.$/);
  });

  it("Invalid argument is null", () => {
    expect(() => {
      const actual = gcs.getAccessToken(null);
    }).toThrow(
      /^The argument is null.You must input location which is Object, not null.$/
    );
  });

  it("Invalid argument is undefined", () => {
    let val;
    expect(() => {
      const actual = gcs.getAccessToken(val);
    }).toThrow(/^You must input location which is Object.$/);
  });

  it("Invalid argument is BigInt", () => {
    expect(() => {
      const actual = gcs.getAccessToken(BigInt(84728102837495n));
    }).toThrow(/^You must input location which is Object.$/);
  });

  it("Invalid argument is Symbol", () => {
    expect(() => {
      const actual = gcs.getAccessToken(Symbol("hoge"));
    }).toThrow(/^You must input location which is Object.$/);
  });

  it("Invalid argument is String", () => {
    expect(() => {
      const actual = gcs.getAccessToken("hogehoge");
    }).toThrow(/^You must input location which is Object.$/);
  });
});
