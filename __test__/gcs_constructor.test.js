// @vitest-environment jsdom

import "vi-fetch/setup";
import { describe, it, expect } from "vitest";
import GCS from "../lib/gcs.js";
import ToolKit from "../lib/toolkit.js";
const toolKit = new ToolKit();

("use strict");

describe("[GCS] CONSTRUCTOR VALID TEST", () => {
  it("Assumed valid parameter, Check instance variables", () => {
    const params = {
      clientId: "clientId",
      redirectUrl: "http://localhost:3000",
      scope: "https://www.googleapis.com/auth/devstorage.read_only",
    };
    const gcs = new GCS(toolKit);
    expect(typeof gcs.oauthSignIn).toBe("function");
    expect(typeof gcs.uploadFiles).toBe("function");
    expect(typeof gcs.getAccessToken).toBe("function");
    expect(typeof gcs.setCred).toBe("function");
    expect(typeof gcs.uploadFile).toBe("function");

    expect(gcs.info).toBeNull();
    expect(gcs.accessToken).toBeNull();
    expect(gcs.toolKit).toBe(toolKit);
  });
});
