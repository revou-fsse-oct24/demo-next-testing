// src/mocks/handlers.ts
import { rest } from "msw";
import type { User } from "../types/types";

export const handlers = [
  rest.get("/api/user", (req, res, ctx) => {
    const mockUser: User = {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      role: "Developer",
    };

    return res(ctx.status(200), ctx.json(mockUser));
  }),
];
