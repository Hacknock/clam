// @vitest-environment jsdom

import "vi-fetch/setup";
import { describe, it, expect } from "vitest";
import GCS from "../lib/gcs.js";
import ToolKit from "../lib/toolkit.js";
const toolKit = new ToolKit();
import { mockPost } from "vi-fetch";

("use strict");

describe("[GCS] uploadFile VALID TEST", () => {
  const params = {
    clientId: "clientId",
    redirectUrl: "http://localhost:3000",
    scope: "https://www.googleapis.com/auth/devstorage.read_only",
  };
  const gcs = new GCS(toolKit);
  gcs.setCred(params);
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
  const gcs = new GCS(toolKit);
  gcs.setCred(params);
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

  it('fileName includes "&"', async () => {
    const fileName = "fo&o.txt";

    // Mock File
    const file = new File(["foo"], fileName, {
      type: "text/plain",
    });
    /**
     *  Mock fetch
     */
    const bucketName = "hogehoge";
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
        expect(err).toBe("The file must not include '=', '&', '?' and '/'.");
        expect(fileName).toBe(fileName);
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

  it('fileName includes "="', async () => {
    const fileName = "f=oo.txt";

    // Mock File
    const file = new File(["foo"], fileName, {
      type: "text/plain",
    });
    /**
     *  Mock fetch
     */
    const bucketName = "hogehoge";
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
        expect(err).toBe("The file must not include '=', '&', '?' and '/'.");
        expect(fileName).toBe(fileName);
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

  it('fileName includes "?"', async () => {
    const fileName = "?foo.txt";

    // Mock File
    const file = new File(["foo"], fileName, {
      type: "text/plain",
    });
    /**
     *  Mock fetch
     */
    const bucketName = "hogehoge";
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
        expect(err).toBe("The file must not include '=', '&', '?' and '/'.");
        expect(fileName).toBe(fileName);
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

  it('fileName includes "/"', async () => {
    const fileName = "foo/.txt";

    // Mock File
    const file = new File(["foo"], fileName, {
      type: "text/plain",
    });
    /**
     *  Mock fetch
     */
    const bucketName = "hogehoge";
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
        expect(err).toBe("The file must not include '=', '&', '?' and '/'.");
        expect(fileName).toBe(fileName);
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
