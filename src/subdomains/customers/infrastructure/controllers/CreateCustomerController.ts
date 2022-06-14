import { Controller } from "../../../employees/adapters/controllers/BaseController";
import { CreateCustomerDTO } from "../../adapters/dtos/CreateCustomerDTO";
import { CreateCustomerUseCase } from "../../useCases/createCustomer";

export class CreateCustomerController extends Controller {
  private useCase: CreateCustomerUseCase;

  constructor(useCase: CreateCustomerUseCase) {
    super();
    this.useCase = useCase;
  }

  protected async handle(): Promise<any> {
    const dto: CreateCustomerDTO = this.request.body as CreateCustomerDTO;
    return ''

    // try {
    //   const result = await this.useCase.execute(dto);

    //   if (result.isLeft()) {
    //     const error = result.value;

    //     switch (error.constructor) {
    //       case CreateUserErrors.AccountAlreadyExists:
    //         return this.conflict(error.errorValue().message)
    //       default:
    //         return this.fail(error.errorValue().message);
    //     }
    //   } else {
    //     return this.ok(this.res);
    //   }

    // } catch (err) {
    //   return this.fail(err)
    // }
  }
}
