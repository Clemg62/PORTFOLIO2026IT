import { User } from "../../generated/prisma/client";
import { Prisma } from "../../generated/prisma/client";

type UserWithRoles = Prisma.UserGetPayload<{
  include: {
    roles: {
      include: {
        role: true
      }
    }
  },
  omit: {
    password: true,
    deletedAt: true,
  }
}>;

declare global {
  namespace Express {
    interface Request {
      user?: UserWithRoles;
    }
  }
}