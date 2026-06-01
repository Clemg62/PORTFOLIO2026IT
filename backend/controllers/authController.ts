import { Request, Response } from "express";
import { prisma } from "../lib/prisma";
import { SigninUserInput } from "../schemas/user.schema";
import { generateToken } from "../lib/generateTokens";
import { TokenScope } from "../../generated/prisma/enums";
import bcrypt from "bcrypt";

export const signinUser = async (
  req: Request<{}, {}, SigninUserInput>,
  res: Response
) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isPasswordValid = bcrypt.compareSync(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = generateToken(user.id, 3600, TokenScope.AUTHENTICATION);

    await prisma.token.create({
      data: {
        userId: user.id,
        hash: token.hash,
        expiry: token.expiry,
        scope: token.scope,
      },
    });

    res.status(200).json({
      message: "Signin successful",
      token: {
        ...token,
        userId: user.id.toString(),
        // Exclude hash from response
        hash: undefined,
      },
    });
  } catch (error) {
    console.error("Error during signin:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
