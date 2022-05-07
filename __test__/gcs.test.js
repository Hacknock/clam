// @vitest-environment jsdom

import "vi-fetch/setup";
import { describe, it, expect } from "vitest";
import GCS from "../lib/gcs.js";
import ToolKit from "../lib/toolkit.js";
const toolKit = new ToolKit();
import crypto from "crypto";
import { mockFetch, mockPost } from "vi-fetch";

("use strict");

describe("[GCS] CONSTRUCTOR VALID TEST", () => {
  it("Assumed valid parameter", () => {
    const params = {
      clientId: "clientId",
      redirectUrl: "http://localhost:3000",
      scope: "https://www.googleapis.com/auth/devstorage.read_only",
    };
    const gcs = new GCS(params, toolKit);
    expect(typeof gcs.oauthSignIn).toBe("function");
    expect(typeof gcs.uploadFiles).toBe("function");
    expect(typeof gcs.getAccessToken).toBe("function");
    expect(gcs.info).toBe(params);
    expect(gcs.accessToken).toBeNull();
  });
});

describe("[GCS] CONSTRUCTOR INVALID TEST", () => {
  it("Invalid input parameter, params.clientId is number", () => {
    const params = {
      clientId: 3000,
      redirectUrl: "http://localhost:3000",
      scope: "https://www.googleapis.com/auth/devstorage.read_only",
    };
    expect(() => {
      const gcs = new GCS(params, toolKit);
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
      const gcs = new GCS(params, toolKit);
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
      const gcs = new GCS(params, toolKit);
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
      const gcs = new GCS(params, toolKit);
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
      const gcs = new GCS(params, toolKit);
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
      const gcs = new GCS(params, toolKit);
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
      const gcs = new GCS(params, toolKit);
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
      const gcs = new GCS(params, toolKit);
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
      const gcs = new GCS(params, toolKit);
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
      const gcs = new GCS(params, toolKit);
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
      const gcs = new GCS(params, toolKit);
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
      const gcs = new GCS(params, toolKit);
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
      const gcs = new GCS(params, toolKit);
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
      const gcs = new GCS(params, toolKit);
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
      const gcs = new GCS(params, toolKit);
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
      const gcs = new GCS(params, toolKit);
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
      const gcs = new GCS(params, toolKit);
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
      const gcs = new GCS(params, toolKit);
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
      const gcs = new GCS(params, toolKit);
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
      const gcs = new GCS(params, toolKit);
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
      const gcs = new GCS(params, toolKit);
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
      const gcs = new GCS(params, toolKit);
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
      const gcs = new GCS(params, toolKit);
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
      const gcs = new GCS(params, toolKit);
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
      const gcs = new GCS(params, toolKit);
    }).toThrow(
      /^params.scope is invalid value. You must set string value which is a URL in scopes. A list of scopes is in https:\/\/cloud.google.com\/storage\/docs\/authentication.$/
    );
  });

  describe("[GCS] getAccessToken VALID TEST", () => {
    const params = {
      clientId: "clientId",
      redirectUrl: "http://localhost:3000",
      scope: "https://www.googleapis.com/auth/devstorage.read_only",
    };
    const gcs = new GCS(params, toolKit);
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
      const result = gcs.getAccessToken(window.location);
      expect(result).toStrictEqual({ token: `${dummyJoint}.${dummyToken}` });
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
      const result = gcs.getAccessToken(window.location);
      expect(result).toStrictEqual({
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
      const result = gcs.getAccessToken(window.location);
      expect(result).toStrictEqual({
        token: null,
        message: "This location has no access token info.",
      });
    });

    it("location is an empty Object", () => {
      delete window.location.href;
      delete window.location.hash;
      delete window.location.token;
      delete window.location.configurable;
      const result = gcs.getAccessToken(window.location);
      expect(result).toStrictEqual({
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
        const result = gcs.getAccessToken(3333);
      }).toThrow(/^You must input location which is Object.$/);
    });

    it("Invalid argument is Boolean", () => {
      expect(() => {
        const result = gcs.getAccessToken(true);
      }).toThrow(/^You must input location which is Object.$/);
    });

    it("Invalid argument is null", () => {
      expect(() => {
        const result = gcs.getAccessToken(null);
      }).toThrow(
        /^The argument is null.You must input location which is Object, not null.$/
      );
    });

    it("Invalid argument is undefined", () => {
      let val;
      expect(() => {
        const result = gcs.getAccessToken(val);
      }).toThrow(/^You must input location which is Object.$/);
    });

    it("Invalid argument is BigInt", () => {
      expect(() => {
        const result = gcs.getAccessToken(BigInt(84728102837495n));
      }).toThrow(/^You must input location which is Object.$/);
    });

    it("Invalid argument is Symbol", () => {
      expect(() => {
        const result = gcs.getAccessToken(Symbol("hoge"));
      }).toThrow(/^You must input location which is Object.$/);
    });

    it("Invalid argument is String", () => {
      expect(() => {
        const result = gcs.getAccessToken("hogehoge");
      }).toThrow(/^You must input location which is Object.$/);
    });
  });

  describe("[GCS] uploadFile VALID TEST", () => {
    const params = {
      clientId: "clientId",
      redirectUrl: "http://localhost:3000",
      scope: "https://www.googleapis.com/auth/devstorage.read_only",
    };
    const gcs = new GCS(params, toolKit);

    it("All parameters are fine", async () => {
      // Mock File
      const file = new File(["foo"], "foo.txt", {
        type: "text/plain",
      });
      /**
       *  Mock fetch
       */
      const bucketName = "hogehoge";
      const fileName = "foo.txt";
      const token = "j30f23jf023f";

      const mock = mockPost(
        `https://storage.googleapis.com/upload/storage/v1/b/${bucketName}/o?uploadType=media&name=${fileName}`
      ).willResolveOnce(
        Promise.resolve({
          bucket: bucketName,
          mediaLink: "hogehoge",
        })
      );

      const inst = gcs.uploadFile.bind({
        bucketName: bucketName,
        file: file,
        token: token,
        callback: (err, fileName) => {
          expect(err).toBeNull();
          expect(fileName).toBe("foo.txt");
          if (err) {
            console.error("failure: " + fileName);
            console.error(err);
          } else {
            console.log("success: " + fileName);
          }
        },
      });
      const event = { target: { result: "hogehoge" } };
      await inst(event);
      mock.clear();
    });

    it("fetch is failed", async () => {
      // Mock File
      const file = new File(["foo"], "foo.txt", {
        type: "text/plain",
      });
      /**
       *  Mock fetch
       */
      const bucketName = "hogehoge";
      const fileName = "foo.txt";
      const token = "j30f23jf023f";

      const mock = mockPost(
        `https://storage.googleapis.com/upload/storage/v1/b/${bucketName}/o?uploadType=media&name=${fileName}`
      ).willFailOnce({ error: "Not Fount" }, 404);

      const inst = gcs.uploadFile.bind({
        bucketName: bucketName,
        file: file,
        token: token,
        callback: (err, fileName) => {
          expect(err).toBe("404 Error occurred by fetch.");
          expect(fileName).toBe("foo.txt");
          if (err) {
            console.error("failure: " + fileName);
            console.error(err);
          } else {
            console.log("success: " + fileName);
          }
        },
      });
      const event = { target: { result: "hogehoge" } };
      await inst(event);
      mock.clear();
    });

    it("fetch result does not include mediaLink", async () => {
      // Mock File
      const file = new File(["foo"], "foo.txt", {
        type: "text/plain",
      });
      /**
       *  Mock fetch
       */
      const bucketName = "hogehoge";
      const fileName = "foo.txt";
      const token = "j30f23jf023f";

      const mock = mockPost(
        `https://storage.googleapis.com/upload/storage/v1/b/${bucketName}/o?uploadType=media&name=${fileName}`
      ).willResolveOnce(
        Promise.resolve({
          bucket: bucketName,
        })
      );

      const inst = gcs.uploadFile.bind({
        bucketName: bucketName,
        file: file,
        token: token,
        callback: (err, fileName) => {
          expect(err).toBe("No mediaLink");
          expect(fileName).toBe("foo.txt");
          if (err) {
            console.error("failure: " + fileName);
            console.error(err);
          } else {
            console.log("success: " + fileName);
          }
        },
      });
      const event = { target: { result: "hogehoge" } };
      await inst(event);
      mock.clear();
    });
  });

  describe("[GCS] uploadFile INVALID TEST", () => {
    const params = {
      clientId: "clientId",
      redirectUrl: "http://localhost:3000",
      scope: "https://www.googleapis.com/auth/devstorage.read_only",
    };
    const gcs = new GCS(params, toolKit);
    it("event.target.result is not set", async () => {
      // Mock File
      const file = new File(["foo"], "foo.txt", {
        type: "text/plain",
      });
      /**
       *  Mock fetch
       */
      const bucketName = "hogehoge";
      const fileName = "foo.txt";
      const token = "j30f23jf023f";

      const mock = mockPost(
        `https://storage.googleapis.com/upload/storage/v1/b/${bucketName}/o?uploadType=media&name=${fileName}`
      ).willResolveOnce(
        Promise.resolve({
          bucket: bucketName,
        })
      );

      const inst = gcs.uploadFile.bind({
        bucketName: bucketName,
        file: file,
        token: token,
        callback: (err, fileName) => {
          expect(err).toBe(
            "The argument is empty or the event does not include 'event.target.result.'"
          );
          expect(fileName).toBe("foo.txt");
          if (err) {
            console.error("failure: " + fileName);
            console.error(err);
          } else {
            console.log("success: " + fileName);
          }
        },
      });
      const event = { target: "hogehoge" };
      await inst(event);
      mock.clear();
    });

    it("event.target is not set", async () => {
      // Mock File
      const file = new File(["foo"], "foo.txt", {
        type: "text/plain",
      });
      /**
       *  Mock fetch
       */
      const bucketName = "hogehoge";
      const fileName = "foo.txt";
      const token = "j30f23jf023f";

      const mock = mockPost(
        `https://storage.googleapis.com/upload/storage/v1/b/${bucketName}/o?uploadType=media&name=${fileName}`
      ).willResolveOnce(
        Promise.resolve({
          bucket: bucketName,
        })
      );

      const inst = gcs.uploadFile.bind({
        bucketName: bucketName,
        file: file,
        token: token,
        callback: (err, fileName) => {
          expect(err).toBe(
            "The argument is empty or the event does not include 'event.target.result.'"
          );
          expect(fileName).toBe("foo.txt");
          if (err) {
            console.error("failure: " + fileName);
            console.error(err);
          } else {
            console.log("success: " + fileName);
          }
        },
      });
      const event = "hogehoge";
      await inst(event);
      mock.clear();
    });

    it("event is not set", async () => {
      // Mock File
      const file = new File(["foo"], "foo.txt", {
        type: "text/plain",
      });
      /**
       *  Mock fetch
       */
      const bucketName = "hogehoge";
      const fileName = "foo.txt";
      const token = "j30f23jf023f";

      const mock = mockPost(
        `https://storage.googleapis.com/upload/storage/v1/b/${bucketName}/o?uploadType=media&name=${fileName}`
      ).willResolveOnce(
        Promise.resolve({
          bucket: bucketName,
        })
      );

      const inst = gcs.uploadFile.bind({
        bucketName: bucketName,
        file: file,
        token: token,
        callback: (err, fileName) => {
          expect(err).toBe(
            "The argument is empty or the event does not include 'event.target.result.'"
          );
          expect(fileName).toBe("foo.txt");
          if (err) {
            console.error("failure: " + fileName);
            console.error(err);
          } else {
            console.log("success: " + fileName);
          }
        },
      });
      await inst();
      mock.clear();
    });

    it("this.bucketName is not set", async () => {
      // Mock File
      const file = new File(["foo"], "foo.txt", {
        type: "text/plain",
      });
      /**
       *  Mock fetch
       */
      const bucketName = "hogehoge";
      const fileName = "foo.txt";
      const token = "j30f23jf023f";

      const mock = mockPost(
        `https://storage.googleapis.com/upload/storage/v1/b/${bucketName}/o?uploadType=media&name=${fileName}`
      ).willResolveOnce(
        Promise.resolve({
          bucket: bucketName,
          mediaLink: "hogehoge",
        })
      );

      const inst = gcs.uploadFile.bind({
        file: file,
        token: token,
        callback: (err, fileName) => {
          expect(err).toBe("bucketName is not binded. Please set bucketName.");
          expect(fileName).toBe("foo.txt");
          if (err) {
            console.error("failure: " + fileName);
            console.error(err);
          } else {
            console.log("success: " + fileName);
          }
        },
      });
      const event = { target: { result: "hogehoge" } };
      await inst(event);
      mock.clear();
    });

    it("this.file is not set", async () => {
      /**
       *  Mock fetch
       */
      const bucketName = "hogehoge";
      const fileName = "foo.txt";
      const token = "j30f23jf023f";

      const mock = mockPost(
        `https://storage.googleapis.com/upload/storage/v1/b/${bucketName}/o?uploadType=media&name=${fileName}`
      ).willResolveOnce(
        Promise.resolve({
          bucket: bucketName,
          mediaLink: "hogehoge",
        })
      );

      const inst = gcs.uploadFile.bind({
        bucketName: bucketName,
        token: token,
        callback: (err, fileName) => {
          expect(err).toBe("file is not set. Please bind file.");
          expect(fileName).toBeNull();
          if (err) {
            console.error("failure: " + fileName);
            console.error(err);
          } else {
            console.log("success: " + fileName);
          }
        },
      });
      const event = { target: { result: "hogehoge" } };
      await inst(event);
      mock.clear();
    });

    it("this.token is not set", async () => {
      // Mock File
      const file = new File(["foo"], "foo.txt", {
        type: "text/plain",
      });
      /**
       *  Mock fetch
       */
      const bucketName = "hogehoge";
      const fileName = "foo.txt";

      const mock = mockPost(
        `https://storage.googleapis.com/upload/storage/v1/b/${bucketName}/o?uploadType=media&name=${fileName}`
      ).willResolveOnce(
        Promise.resolve({
          bucket: bucketName,
          mediaLink: "hogehoge",
        })
      );

      const inst = gcs.uploadFile.bind({
        bucketName: bucketName,
        file: file,
        callback: (err, fileName) => {
          expect(err).toBe("token is not set. Please bind token");
          expect(fileName).toBe("foo.txt");
          if (err) {
            console.error("failure: " + fileName);
            console.error(err);
          } else {
            console.log("success: " + fileName);
          }
        },
      });
      const event = { target: { result: "hogehoge" } };
      await inst(event);
      mock.clear();
    });
  });
});
