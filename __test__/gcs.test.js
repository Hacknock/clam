import GCS from "../lib/gcs.js";

const params = {
  clientId: "clientId",
  redirectUrl: "http://localhost:3000",
  scope: "https://www.googleapis.com/auth/devstorage.read_only",
};

describe("[GCS] CONSTRUCTOR VALID TEST", () => {
  it("Assumed valid parameter", () => {
    const gcs = new GCS(params);
    expect(typeof gcs.oauthSignIn).toBe("function");
    expect(typeof gcs.uploadFiles).toBe("function");
    expect(typeof gcs.getAccessToken).toBe("function");
    expect(gcs.info).toBe(params);
    expect(gcs.accessToken).toBeNull();
  });
});

describe("[GCS] CONSTRUCTOR INVALID TEST", () => {
  it("Invalid input parameter, params.clientId is number", () => {
    params.clientId = 3000;
    expect(() => {
      const gcs = new GCS(params);
    }).toThrow(
      /^params.clientId is invalid value. You must set String value.$/
    );
  });

  it("Invalid input parameter, params.clientId is Boolean", () => {
    params.clientId = true;
    expect(() => {
      const gcs = new GCS(params);
    }).toThrow(
      /^params.clientId is invalid value. You must set String value.$/
    );
  });

  it("Invalid input parameter, params.clientId is null", () => {
    params.clientId = null;
    expect(() => {
      const gcs = new GCS(params);
    }).toThrow(
      /^params.clientId is invalid value. You must set String value.$/
    );
  });

  it("Invalid input parameter, params.clientId is undefined", () => {
    params.clientId;
    expect(() => {
      const gcs = new GCS(params);
    }).toThrow(
      /^params.clientId is invalid value. You must set String value.$/
    );
  });

  it("Invalid input parameter, params.clientId is BigInt", () => {
    params.clientId = BigInt(238298749019823849n);
    expect(() => {
      const gcs = new GCS(params);
    }).toThrow(
      /^params.clientId is invalid value. You must set String value.$/
    );
  });

  it("Invalid input parameter, params.clientId is Symbol", () => {
    params.clientId = Symbol("hogehoge");
    expect(() => {
      const gcs = new GCS(params);
    }).toThrow(
      /^params.clientId is invalid value. You must set String value.$/
    );
  });

  it("Invalid input parameter, params.clientId is Object", () => {
    params.clientId = { hoge: "hogehoge" };
    expect(() => {
      const gcs = new GCS(params);
    }).toThrow(
      /^params.clientId is invalid value. You must set String value.$/
    );
  });
  // it("Normal function test, only throw", () => {
  //   expect(() => {
  //     test.test();
  //   }).toThrow();
  // });
  // it("Normal function test, match a part of error message", () => {
  //   expect(() => {
  //     test.test();
  //   }).toThrow(/^Test.*/);
  // });
  // it("Normal function test, match a part of error message", () => {
  //   expect(() => {
  //     test.test();
  //   }).toThrow("Test");
  // });
  // it("Normal function test, match a part of error message", () => {
  //   expect(() => {
  //     test.test();
  //   }).toThrow(/^Test throw$/);
  // });
  // it("Normal function test, match error message", () => {
  //   expect(() => {
  //     test.test();
  //   }).toThrow("Test throw");
  // });
  // it("Async function test, only throw", async () => {
  //   await expect(test.asyncTest()).rejects.toThrow();
  // });
  // it("Async function test, match a part of error message", async () => {
  //   await expect(test.asyncTest()).rejects.toThrow(/^test.*/);
  // });
  // it("Async function test, match error message", async () => {
  //   await expect(test.asyncTest()).rejects.toThrow();
  // });
});
