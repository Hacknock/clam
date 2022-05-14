// @vitest-environment jsdom

import "vi-fetch/setup";
import { describe, it, expect } from "vitest";
import GCS from "../lib/gcs.js";
import ToolKit from "../lib/toolkit.js";
const toolKit = new ToolKit();

("use strict");

describe("[GCS] setCred VALID TEST", () => {
  const gcs = new GCS(toolKit);

  it("Assumed valid parameter", () => {
    const params = {
      clientId: "clientId",
      redirectUrl: "http://localhost:3000",
      scope: "https://www.googleapis.com/auth/devstorage.read_only",
    };
    gcs.setCred(params);
    expect(gcs.info).toBe(params);
    expect(gcs.accessToken).toBeNull();
  });
});

describe("[GCS] setCred INVALID TEST", () => {
  const gcs = new GCS(toolKit);

  it("Invalid input parameter, params.clientId is number", () => {
    const params = {
      clientId: 3000,
      redirectUrl: "http://localhost:3000",
      scope: "https://www.googleapis.com/auth/devstorage.read_only",
    };
    expect(() => {
      gcs.setCred(params);
    }).toThrow(
      /^params.clientId is invalid value. You must set String value.$/
    );
  });

  it("Invalid input parameter, params.clientId is Boolean", () => {
    const params = {
      clientId: true,
      redirectUrl: "http://localhost:3000",
      scope: "https://www.googleapis.com/auth/devstorage.read_only",
    };
    expect(() => {
      gcs.setCred(params);
    }).toThrow(
      /^params.clientId is invalid value. You must set String value.$/
    );
  });

  it("Invalid input parameter, params.clientId is null", () => {
    const params = {
      clientId: null,
      redirectUrl: "http://localhost:3000",
      scope: "https://www.googleapis.com/auth/devstorage.read_only",
    };
    expect(() => {
      gcs.setCred(params);
    }).toThrow(
      /^params.clientId is invalid value. You must set String value.$/
    );
  });

  it("Invalid input parameter, params.clientId is undefined", () => {
    const params = {};
    params.clientId;
    params.redirectUrl = "http://localhost:3000";
    params.scope = "https://www.googleapis.com/auth/devstorage.read_only";

    expect(() => {
      gcs.setCred(params);
    }).toThrow(
      /^params.clientId is invalid value. You must set String value.$/
    );
  });

  it("Invalid input parameter, params.clientId is BigInt", () => {
    const params = {
      clientId: BigInt(238298749019823849n),
      redirectUrl: "http://localhost:3000",
      scope: "https://www.googleapis.com/auth/devstorage.read_only",
    };

    expect(() => {
      gcs.setCred(params);
    }).toThrow(
      /^params.clientId is invalid value. You must set String value.$/
    );
  });

  it("Invalid input parameter, params.clientId is Symbol", () => {
    const params = {
      clientId: Symbol("hogehoge"),
      redirectUrl: "http://localhost:3000",
      scope: "https://www.googleapis.com/auth/devstorage.read_only",
    };
    expect(() => {
      gcs.setCred(params);
    }).toThrow(
      /^params.clientId is invalid value. You must set String value.$/
    );
  });

  it("Invalid input parameter, params.clientId is Object", () => {
    const params = {
      clientId: { hoge: "hogehoge" },
      redirectUrl: "http://localhost:3000",
      scope: "https://www.googleapis.com/auth/devstorage.read_only",
    };
    expect(() => {
      gcs.setCred(params);
    }).toThrow(
      /^params.clientId is invalid value. You must set String value.$/
    );
  });

  it("Invalid input parameter, params.redirectUrl is number", () => {
    const params = {
      clientId: "clientId",
      redirectUrl: 2000,
      scope: "https://www.googleapis.com/auth/devstorage.read_only",
    };

    expect(() => {
      gcs.setCred(params);
    }).toThrow(
      /^params.redirectUrl is invalid value. You must set string value which is an URL.$/
    );
  });

  it("Invalid input parameter, params.redirectUrl is Boolean", () => {
    const params = {
      clientId: "clientId",
      redirectUrl: true,
      scope: "https://www.googleapis.com/auth/devstorage.read_only",
    };

    expect(() => {
      gcs.setCred(params);
    }).toThrow(
      /^params.redirectUrl is invalid value. You must set string value which is an URL.$/
    );
  });

  it("Invalid input parameter, params.redirectUrl is null", () => {
    const params = {
      clientId: "clientId",
      redirectUrl: null,
      scope: "https://www.googleapis.com/auth/devstorage.read_only",
    };

    expect(() => {
      gcs.setCred(params);
    }).toThrow(
      /^params.redirectUrl is invalid value. You must set string value which is an URL.$/
    );
  });

  it("Invalid input parameter, params.redirectUrl is undefined", () => {
    const params = {};
    params.clientId = "clientId";
    params.redirectUrl;
    params.scope = "https://www.googleapis.com/auth/devstorage.read_only";

    expect(() => {
      gcs.setCred(params);
    }).toThrow(
      /^params.redirectUrl is invalid value. You must set string value which is an URL.$/
    );
  });

  it("Invalid input parameter, params.redirectUrl is BigInt", () => {
    const params = {
      clientId: "clientId",
      redirectUrl: BigInt(38263749083234n),
      scope: "https://www.googleapis.com/auth/devstorage.read_only",
    };

    expect(() => {
      gcs.setCred(params);
    }).toThrow(
      /^params.redirectUrl is invalid value. You must set string value which is an URL.$/
    );
  });

  it("Invalid input parameter, params.redirectUrl is Symbol", () => {
    const params = {
      clientId: "clientId",
      redirectUrl: Symbol("hogehoge"),
      scope: "https://www.googleapis.com/auth/devstorage.read_only",
    };

    expect(() => {
      gcs.setCred(params);
    }).toThrow(
      /^params.redirectUrl is invalid value. You must set string value which is an URL.$/
    );
  });

  it("Invalid input parameter, params.redirectUrl is String(not URL)", () => {
    const params = {
      clientId: "clientId",
      redirectUrl: "http://hogehoge",
      scope: "https://www.googleapis.com/auth/devstorage.read_only",
    };

    expect(() => {
      gcs.setCred(params);
    }).toThrow(
      /^params.redirectUrl is invalid value. You must set string value which is an URL.$/
    );
  });

  it("Invalid input parameter, params.redirectUrl is String(not URL)", () => {
    const params = {
      clientId: "clientId",
      redirectUrl: "http://hogehoge",
      scope: "https://www.googleapis.com/auth/devstorage.read_only",
    };

    expect(() => {
      gcs.setCred(params);
    }).toThrow(
      /^params.redirectUrl is invalid value. You must set string value which is an URL.$/
    );
  });

  it("Invalid input parameter, params.redirectUrl is Object", () => {
    const params = {
      clientId: "clientId",
      redirectUrl: { hoge: "hoge" },
      scope: "https://www.googleapis.com/auth/devstorage.read_only",
    };

    expect(() => {
      gcs.setCred(params);
    }).toThrow(
      /^params.redirectUrl is invalid value. You must set string value which is an URL.$/
    );
  });

  it("Invalid input parameter, params.scope is number", () => {
    const params = {
      clientId: "clientId",
      redirectUrl: "http://localhost:3000",
      scope: 300,
    };
    expect(() => {
      gcs.setCred(params);
    }).toThrow(
      /^params.scope is invalid value. You must set string value which is a URL in scopes. A list of scopes is in https:\/\/cloud.google.com\/storage\/docs\/authentication.$/
    );
  });

  it("Invalid input parameter, params.scope is Boolean", () => {
    const params = {
      clientId: "clientId",
      redirectUrl: "http://localhost:3000",
      scope: false,
    };
    expect(() => {
      gcs.setCred(params);
    }).toThrow(
      /^params.scope is invalid value. You must set string value which is a URL in scopes. A list of scopes is in https:\/\/cloud.google.com\/storage\/docs\/authentication.$/
    );
  });

  it("Invalid input parameter, params.scope is null", () => {
    const params = {
      clientId: "clientId",
      redirectUrl: "http://localhost:3000",
      scope: null,
    };
    expect(() => {
      gcs.setCred(params);
    }).toThrow(
      /^params.scope is invalid value. You must set string value which is a URL in scopes. A list of scopes is in https:\/\/cloud.google.com\/storage\/docs\/authentication.$/
    );
  });

  it("Invalid input parameter, params.scope is undefined", () => {
    const params = {};
    params.clientId = "clientId";
    params.redirectUrl = "http://localhost:3000";
    params.scope;
    expect(() => {
      gcs.setCred(params);
    }).toThrow(
      /^params.scope is invalid value. You must set string value which is a URL in scopes. A list of scopes is in https:\/\/cloud.google.com\/storage\/docs\/authentication.$/
    );
  });

  it("Invalid input parameter, params.scope is BigInt", () => {
    const params = {
      clientId: "clientId",
      redirectUrl: "http://localhost:3000",
      scope: BigInt(92736382910384n),
    };
    expect(() => {
      gcs.setCred(params);
    }).toThrow(
      /^params.scope is invalid value. You must set string value which is a URL in scopes. A list of scopes is in https:\/\/cloud.google.com\/storage\/docs\/authentication.$/
    );
  });

  it("Invalid input parameter, params.scope is Symbol", () => {
    const params = {
      clientId: "clientId",
      redirectUrl: "http://localhost:3000",
      scope: Symbol("hoge"),
    };
    expect(() => {
      gcs.setCred(params);
    }).toThrow(
      /^params.scope is invalid value. You must set string value which is a URL in scopes. A list of scopes is in https:\/\/cloud.google.com\/storage\/docs\/authentication.$/
    );
  });

  it("Invalid input parameter, params.scope is String(not scope URL)", () => {
    const params = {
      clientId: "clientId",
      redirectUrl: "http://localhost:3000",
      scope: "https://hacknock.com",
    };
    expect(() => {
      gcs.setCred(params);
    }).toThrow(
      /^params.scope is invalid value. You must set string value which is a URL in scopes. A list of scopes is in https:\/\/cloud.google.com\/storage\/docs\/authentication.$/
    );
  });

  it("Invalid input parameter, params.scope is String(not URL)", () => {
    const params = {
      clientId: "clientId",
      redirectUrl: "http://localhost:3000",
      scope: "https://hacknock",
    };
    expect(() => {
      gcs.setCred(params);
    }).toThrow(
      /^params.scope is invalid value. You must set string value which is a URL in scopes. A list of scopes is in https:\/\/cloud.google.com\/storage\/docs\/authentication.$/
    );
  });

  it("Invalid input parameter, params.scope is Object", () => {
    const params = {
      clientId: "clientId",
      redirectUrl: "http://localhost:3000",
      scope: { hoge: 8888 },
    };
    expect(() => {
      gcs.setCred(params);
    }).toThrow(
      /^params.scope is invalid value. You must set string value which is a URL in scopes. A list of scopes is in https:\/\/cloud.google.com\/storage\/docs\/authentication.$/
    );
  });
});
