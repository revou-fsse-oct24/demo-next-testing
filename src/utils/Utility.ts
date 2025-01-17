export type User = {
  id: number;
  name: string;
  createdAt: Date;
  permissions?: {
    [key: string]: boolean;
  };
};

export const calculator = {
  add: (a: number, b: number): number => a + b,
  subtract: (a: number, b: number): number => a - b,
  multiply: (a: number, b: number): number => a * b,
  divide: (a: number, b: number): number | undefined =>
    b !== 0 ? a / b : undefined,
};

export const utils = {
  createUser: (name: string): User => ({
    id: Math.random(),
    name,
    createdAt: new Date(),
  }),

  checkUserPermission: (
    user: User | undefined,
    permission: string
  ): boolean => {
    if (!user) return false;
    return Boolean(user.permissions?.[permission]);
  },

  processValue: (value: any): string => {
    if (value === undefined) return "undefined value";
    if (value === null) return "null value";
    return String(value);
  },
};
