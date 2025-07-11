import prisma from "../../../prisma/prisma";
import { EmailVerification } from "../../types/email-verification";

export class CreateVerificationRepository {
  async execute(emailVerificationParams: EmailVerification) {
    const emailVerification = await prisma.emailVerification.create({
      data: {
        userId: emailVerificationParams.userId,
        code: emailVerificationParams.code,
        expiresAt: emailVerificationParams.expiresAt,
      },
    });

    return emailVerification;
  }
}
