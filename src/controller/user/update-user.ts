import { EmailAlreadyInUseError, UserNotFoundError } from "../../errors/user";
import { updateUserSchema } from "../../schemas/user/user";
import { HttpRequest } from "../../types/httpRequest";
import { UpdateUserUseCase } from "../../use-cases/user/update-user";
import { badRequest, ok, serverError } from "../helpers/http";
import { userNotFoundResponse } from "../helpers/user";
import { checkIfIdIsValid, invalidIdResponse } from "../helpers/validation";
import { ZodError } from "zod";
export class UpdateUserController {
  constructor(private updateUserUseCase: UpdateUserUseCase) {
    this.updateUserUseCase = updateUserUseCase;
  }

  async execute(httpRequest: HttpRequest) {
    try {
      const userId = httpRequest.params?.userId;

      if (!userId) {
        return invalidIdResponse("O ID do usuário é obrigatório.");
      }

      const isIdValid = checkIfIdIsValid(userId);

      if (!isIdValid) {
        return invalidIdResponse("Este id é inválido.");
      }

      if (!httpRequest.body) {
        return badRequest("Requisição sem corpo.");
      }

      const params = httpRequest.body;

      await updateUserSchema.parseAsync(params);

      const result = await this.updateUserUseCase.execute(userId, params);

      return ok(result);
    } catch (error) {
      if (error instanceof ZodError) {
        return badRequest(error.errors[0].message);
      }

      if (error instanceof EmailAlreadyInUseError) {
        return badRequest(error.message);
      }

      if (error instanceof UserNotFoundError) {
        return userNotFoundResponse("Usuário não encontrado");
      }

      console.error(error);
      return serverError();
    }
  }
}
