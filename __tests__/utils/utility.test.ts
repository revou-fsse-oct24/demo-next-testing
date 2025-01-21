// tests/utils/utility.test.ts
import { calculator, utils, type User } from "@/utils/Utility";

describe("Basic Jest Matcher Examples", () => {
  // Calculator Tests
  describe("Calculator Tests", () => {
    test("toBe: adding 2 + 2 should be 4", () => {
      expect(calculator.add(2, 2)).toBe(4); // happy path
    });

    test("toBe: multiplying 3 * 3 should be 9", () => {
      expect(calculator.multiply(3, 3)).toBe(9);
    });

    test("toBeUndefined: dividing by zero should be undefined", () => {
      expect(calculator.divide(5, 0)).toBeUndefined(); // edge case, kita memang berekspektasi nilanya undefined
    });

    test("toBe: multiply 0 * 0 should be 1", () => {
      expect(calculator.multiply(0, 0)).not.toBe(1); // error
    });

    test("toBeDefined: normal division should be defined", () => {
      expect(calculator.divide(10, 2)).toBeDefined();
    });
  });

  // Utils Tests
  describe("Utils Tests", () => {
    // createUser tests
    test("toEqual: created user should match structure", () => {
      const user = utils.createUser("John");

      // toEqual is used for objects
      expect(user).toEqual({
        id: expect.any(Number),
        name: "John",
        createdAt: expect.any(Date),
      });
    });

    test("toEqual: created user should match structure", () => {
      const user = utils.createUser("John");

      // toEqual is used for objects
      expect(user).not.toEqual({
        id: expect.any(Number),
        name: "Andi",
        createdAt: expect.any(Date),
      });
    });

    // processValue tests
    test("toBe: process undefined value", () => {
      const result = utils.processValue(undefined);
      expect(result).toBe("undefined value");
    });

    test("toBe: process null value", () => {
      const result = utils.processValue(null);
      expect(result).toBe("null value");
    });

    // checkUserPermission tests
    test("toBeFalsy: undefined user should not have permissions", () => {
      expect(utils.checkUserPermission(undefined, "admin")).toBeFalsy();
    });

    test("toBeTruthy: user with permission should be verified", () => {
      const user: User = {
        id: 1,
        name: "John",
        createdAt: new Date(),
        permissions: { admin: true },
      };
      expect(utils.checkUserPermission(user, "admin")).toBeTruthy();
    });
  });

  // Combined Examples
  describe("Combined Matcher Examples", () => {
    test("using multiple matchers", () => {
      const user = utils.createUser("Jane");

      // Check if user exists
      expect(user).toBeDefined();

      // Check specific properties
      expect(user.name).toBe("Jane");

      // Check type of properties
      expect(typeof user.id).toBe("number");

      // Check if date is valid
      expect(user.createdAt instanceof Date).toBeTruthy();
    });
  });
});
