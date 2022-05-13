// @vitest-environment jsdom

import "vi-fetch/setup";
import { describe, it, expect, vi } from "vitest";
import GCS from "../lib/gcs.js";
import ToolKit from "../lib/toolkit.js";
const toolKit = new ToolKit();
import crypto from "crypto";

("use strict");

describe("[GCS] uploadFiles VALID TEST", () => {
  const params = {
    clientId: "clientId",
    redirectUrl: "http://localhost:3000",
    scope: "https://www.googleapis.com/auth/devstorage.read_only",
  };
  /**
   * Mock FileReader
   */
  const spyFileReader = vi
    .spyOn(FileReader.prototype, "addEventListener")
    .mockImplementation(() => {});
  const gcs = new GCS(toolKit);
  gcs.setCred(params);

  it("fileList(more than 2 files), bucketName are valid without accessToken", () => {
    const bucketName = "hogehoge";

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

    /**
     * FileList mock
     */
    const file = new File(["foo"], "foo.txt", {
      type: "text/plain",
    });
    const file2 = new File(["this is test file"], "test.txt", {
      type: "text/plain",
    });
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("name", "file-upload");
    input.multiple = true;
    let mockFileList = Object.create(input.files);
    mockFileList[0] = file;
    mockFileList[1] = file2;
    Object.defineProperty(mockFileList, "length", { value: 2 });

    const res = gcs.uploadFiles(mockFileList, bucketName, (err, fileName) => {
      if (err) console.error(err);
      else console.log(fileName);
    });
    expect(res).toBe(0);
  });

  it("fileList(more than 2 files), bucketName and accessToken are valid", () => {
    const bucketName = "hogehoge";

    const dummyToken = crypto
      .randomBytes(160)
      .toString("hex")
      .substring(0, 160);
    const dummyJoint = crypto.randomBytes(4).toString("hex").substring(0, 4);

    /**
     * FileList mock
     */
    const file = new File(["foo"], "foo.txt", {
      type: "text/plain",
    });
    const file2 = new File(["this is test file"], "test.txt", {
      type: "text/plain",
    });
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("name", "file-upload");
    input.multiple = true;
    let mockFileList = Object.create(input.files);
    mockFileList[0] = file;
    mockFileList[1] = file2;
    Object.defineProperty(mockFileList, "length", { value: 2 });

    const res = gcs.uploadFiles(
      mockFileList,
      bucketName,
      (err, fileName) => {
        if (err) console.error(err);
        else console.log(fileName);
      },
      `${dummyJoint}.${dummyToken}`
    );
    expect(res).toBe(0);
  });

  it("fileList(only one file), bucketName are valid without accessToken", () => {
    const bucketName = "hogehoge";

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

    /**
     * FileList mock
     */
    const file = new File(["foo"], "foo.txt", {
      type: "text/plain",
    });
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("name", "file-upload");
    input.multiple = true;
    let mockFileList = Object.create(input.files);
    mockFileList[0] = file;
    Object.defineProperty(mockFileList, "length", { value: 1 });

    const res = gcs.uploadFiles(mockFileList, bucketName, (err, fileName) => {
      if (err) console.error(err);
      else console.log(fileName);
    });
    expect(res).toBe(0);
  });

  it("fileList(only one file), bucketName and accessToken are valid", () => {
    const bucketName = "hogehoge";

    const dummyToken = crypto
      .randomBytes(160)
      .toString("hex")
      .substring(0, 160);
    const dummyJoint = crypto.randomBytes(4).toString("hex").substring(0, 4);

    /**
     * FileList mock
     */
    const file = new File(["foo"], "foo.txt", {
      type: "text/plain",
    });
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("name", "file-upload");
    input.multiple = true;
    let mockFileList = Object.create(input.files);
    mockFileList[0] = file;
    Object.defineProperty(mockFileList, "length", { value: 1 });

    const res = gcs.uploadFiles(
      mockFileList,
      bucketName,
      (err, fileName) => {
        if (err) console.error(err);
        else console.log(fileName);
      },
      `${dummyJoint}.${dummyToken}`
    );
    expect(res).toBe(0);
  });
});

describe("[GCS] uploadFiles INVALID TEST", () => {
  const params = {
    clientId: "clientId",
    redirectUrl: "http://localhost:3000",
    scope: "https://www.googleapis.com/auth/devstorage.read_only",
  };
  /**
   * Mock FileReader
   */
  const spyFileReader = vi
    .spyOn(FileReader.prototype, "addEventListener")
    .mockImplementation(() => {});
  const gcs = new GCS(toolKit);
  gcs.setCred(params);

  it("The first argument is not FileList (number)", () => {
    const bucketName = "hogehoge";

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

    /**
     * FileList mock
     */
    const file = new File(["foo"], "foo.txt", {
      type: "text/plain",
    });
    const file2 = new File(["this is test file"], "test.txt", {
      type: "text/plain",
    });
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("name", "file-upload");
    input.multiple = true;
    let mockFileList = 2;

    expect(() => {
      gcs.uploadFiles(mockFileList, bucketName, (err, fileName) => {
        if (err) console.error(err);
        else console.log(fileName);
      });
    }).toThrow(/^fileList type is invalid. It must be FileList.$/);
  });

  it("The first argument is not FileList (Boolean)", () => {
    const bucketName = "hogehoge";

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

    /**
     * FileList mock
     */
    const file = new File(["foo"], "foo.txt", {
      type: "text/plain",
    });
    const file2 = new File(["this is test file"], "test.txt", {
      type: "text/plain",
    });
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("name", "file-upload");
    input.multiple = true;
    let mockFileList = true;

    expect(() => {
      gcs.uploadFiles(mockFileList, bucketName, (err, fileName) => {
        if (err) console.error(err);
        else console.log(fileName);
      });
    }).toThrow(/^fileList type is invalid. It must be FileList.$/);
  });

  it("The first argument is not FileList (undefined)", () => {
    const bucketName = "hogehoge";

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

    /**
     * FileList mock
     */
    const file = new File(["foo"], "foo.txt", {
      type: "text/plain",
    });
    const file2 = new File(["this is test file"], "test.txt", {
      type: "text/plain",
    });
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("name", "file-upload");
    input.multiple = true;
    let mockFileList;

    expect(() => {
      gcs.uploadFiles(mockFileList, bucketName, (err, fileName) => {
        if (err) console.error(err);
        else console.log(fileName);
      });
    }).toThrow(/^fileList type is invalid. It must be FileList.$/);
  });

  it("The first argument is not FileList (String)", () => {
    const bucketName = "hogehoge";

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

    /**
     * FileList mock
     */
    const file = new File(["foo"], "foo.txt", {
      type: "text/plain",
    });
    const file2 = new File(["this is test file"], "test.txt", {
      type: "text/plain",
    });
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("name", "file-upload");
    input.multiple = true;
    let mockFileList = "Hoge";

    expect(() => {
      gcs.uploadFiles(mockFileList, bucketName, (err, fileName) => {
        if (err) console.error(err);
        else console.log(fileName);
      });
    }).toThrow(/^fileList type is invalid. It must be FileList.$/);
  });

  it("The first argument is not FileList (BigInt)", () => {
    const bucketName = "hogehoge";

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

    /**
     * FileList mock
     */
    const file = new File(["foo"], "foo.txt", {
      type: "text/plain",
    });
    const file2 = new File(["this is test file"], "test.txt", {
      type: "text/plain",
    });
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("name", "file-upload");
    input.multiple = true;
    let mockFileList = BigInt(349349324342n);

    expect(() => {
      gcs.uploadFiles(mockFileList, bucketName, (err, fileName) => {
        if (err) console.error(err);
        else console.log(fileName);
      });
    }).toThrow(/^fileList type is invalid. It must be FileList.$/);
  });

  it("The first argument is not FileList (Symbol)", () => {
    const bucketName = "hogehoge";

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

    /**
     * FileList mock
     */
    const file = new File(["foo"], "foo.txt", {
      type: "text/plain",
    });
    const file2 = new File(["this is test file"], "test.txt", {
      type: "text/plain",
    });
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("name", "file-upload");
    input.multiple = true;
    let mockFileList = Symbol("Hello");

    expect(() => {
      gcs.uploadFiles(mockFileList, bucketName, (err, fileName) => {
        if (err) console.error(err);
        else console.log(fileName);
      });
    }).toThrow(/^fileList type is invalid. It must be FileList.$/);
  });

  it("The first argument is not FileList (Object)", () => {
    const bucketName = "hogehoge";

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

    /**
     * FileList mock
     */
    const file = new File(["foo"], "foo.txt", {
      type: "text/plain",
    });
    const file2 = new File(["this is test file"], "test.txt", {
      type: "text/plain",
    });
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("name", "file-upload");
    input.multiple = true;
    let mockFileList = new Object({ hello: "world" });

    expect(() => {
      gcs.uploadFiles(mockFileList, bucketName, (err, fileName) => {
        if (err) console.error(err);
        else console.log(fileName);
      });
    }).toThrow(/^fileList type is invalid. It must be FileList.$/);
  });

  it("The first argument is not FileList (File)", () => {
    const bucketName = "hogehoge";

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

    /**
     * FileList mock
     */
    const file = new File(["foo"], "foo.txt", {
      type: "text/plain",
    });
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("name", "file-upload");
    input.multiple = true;
    let mockFileList = file;

    expect(() => {
      gcs.uploadFiles(mockFileList, bucketName, (err, fileName) => {
        if (err) console.error(err);
        else console.log(fileName);
      });
    }).toThrow(/^fileList type is invalid. It must be FileList.$/);
  });
});
