import "@testing-library/jest-dom";
import "whatwg-fetch";
import { server } from "./src/mocks/setup";

// Add TextEncoder polyfill
if (typeof global.TextEncoder === "undefined") {
  global.TextEncoder = require("node:util").TextEncoder;
  global.TextDecoder = require("node:util").TextDecoder;
}

beforeAll(() => {
  // Polyfill fetch and related globals
  Object.defineProperty(window, "fetch", {
    value: fetch,
    writable: true,
  });

  server.listen();
});

afterEach(() => {
  server.resetHandlers();
});

afterAll(() => {
  server.close();
});
