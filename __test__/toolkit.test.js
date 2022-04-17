// @vitest-environment jsdom

import { describe, it, expect } from "vitest";
import ToolKit from "../lib/toolkit";

describe("[ToolKit] detectURL VALID TEST", () => {
  const toolKit = new ToolKit();
  it("http://localhost", () => {
    expect(toolKit.detectURL("http://localhost")).toBe(true);
  });
  it("http://localhost:3000", () => {
    expect(toolKit.detectURL("http://localhost:3000")).toBe(true);
  });
  it("http://localhost/hogehoge", () => {
    expect(toolKit.detectURL("http://localhost/hogehoge")).toBe(true);
  });
  it("http://localhost:3000/hogehoge", () => {
    expect(toolKit.detectURL("http://localhost:3000/hogehoge")).toBe(true);
  });
  it("http://localhost/hogehoge/hoge", () => {
    expect(toolKit.detectURL("http://localhost/hogehoge/hoge")).toBe(true);
  });
  it("http://localhost:3000/hogehoge/hoge", () => {
    expect(toolKit.detectURL("http://localhost:3000/hogehoge/hoge")).toBe(true);
  });
  it("https://hacknock.com", () => {
    expect(toolKit.detectURL("https://hacknock.com")).toBe(true);
  });
  it("https://test.hacknock.com", () => {
    expect(toolKit.detectURL("https://test.hacknock.com")).toBe(true);
  });
  it("https://leadyou.test.hacknock.com", () => {
    expect(toolKit.detectURL("https://leadyou.test.hacknock.com")).toBe(true);
  });
  it("https://hacknock.com/hoge", () => {
    expect(toolKit.detectURL("https://hacknock.com/hoge")).toBe(true);
  });
  it("https://test.hacknock.com/hoge", () => {
    expect(toolKit.detectURL("https://test.hacknock.com/hoge")).toBe(true);
  });
  it("https://leadyou.test.hacknock.com/hoge", () => {
    expect(toolKit.detectURL("https://leadyou.test.hacknock.com/hoge")).toBe(
      true
    );
  });
  it("https://hacknock.com/hoge/hogehoge", () => {
    expect(toolKit.detectURL("https://hacknock.com/hoge/hogehoge")).toBe(true);
  });
  it("https://test.hacknock.com/hoge/hogehoge", () => {
    expect(toolKit.detectURL("https://test.hacknock.com/hoge/hogehoge")).toBe(
      true
    );
  });
  it("https://leadyou.test.hacknock.com/hoge/hogehoge", () => {
    expect(
      toolKit.detectURL("https://leadyou.test.hacknock.com/hoge/hogehoge")
    ).toBe(true);
  });
});

describe("[ToolKit] detectURL INVALID TEST", () => {
  const toolKit = new ToolKit();
  it("http://localhos", () => {
    expect(toolKit.detectURL("http://localhos")).toBe(false);
  });
  it("http://locahost:3000", () => {
    expect(toolKit.detectURL("http://locahost:3000")).toBe(false);
  });
  it("http://lcalhost/hogehoge", () => {
    expect(toolKit.detectURL("http://lcalhost/hogehoge")).toBe(false);
  });
  it("http://ocalhost:3000/hogehoge", () => {
    expect(toolKit.detectURL("http://ocalhost:3000/hogehoge")).toBe(false);
  });
  it("http://localhost3000", () => {
    expect(toolKit.detectURL("http://localhost3000")).toBe(false);
  });

  it("http://hacknock.com", () => {
    expect(toolKit.detectURL("http://hacknock.com")).toBe(false);
  });
  it("https://hacknock", () => {
    expect(toolKit.detectURL("https://hacknock")).toBe(false);
  });
  it("http://leadyou.test.hacknock.com", () => {
    expect(toolKit.detectURL("http://leadyou.test.hacknock.com")).toBe(false);
  });
  it("http://hacknock.com/hoge", () => {
    expect(toolKit.detectURL("http://hacknock.com/hoge")).toBe(false);
  });
  it("http://test.hacknock.com/hoge", () => {
    expect(toolKit.detectURL("http://test.hacknock.com/hoge")).toBe(false);
  });
  it("http://leadyou.test.hacknock.com/hoge", () => {
    expect(toolKit.detectURL("http://leadyou.test.hacknock.com/hoge")).toBe(
      false
    );
  });
  it("http://hacknock.com/hoge/hogehoge", () => {
    expect(toolKit.detectURL("http://hacknock.com/hoge/hogehoge")).toBe(false);
  });
  it("http://test.hacknock.com/hoge/hogehoge", () => {
    expect(toolKit.detectURL("http://test.hacknock.com/hoge/hogehoge")).toBe(
      false
    );
  });
  it("http://leadyou.test.hacknock.com/hoge/hogehoge", () => {
    expect(
      toolKit.detectURL("http://leadyou.test.hacknock.com/hoge/hogehoge")
    ).toBe(false);
  });
});
