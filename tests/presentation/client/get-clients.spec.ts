import { AuthenticationError } from "apollo-server-core";
import { Client } from "../../../src/domain/client";
import { GetClients } from "../../../src/domain/useCases/client/get-clients";
import { GetClientsController } from "../../../src/presentation/controllers/client/get-clients";

describe("GetClientsController", () => {
  const makeGetClientsStub = () => {
    class GetClientsStub implements GetClients {
      async get(): Promise<Client[]> {
        return [
          {
            _id: "id",
            name: "any_name",
            email: "any_email",
            instagram: "any_instagram",
            observations: "any_observations",
            aquisitions: "any_aquisitions",
            indication: "any_indication",
            address: "any_adress",
            number: "any_number",
          },
        ];
      }
    }
    return new GetClientsStub();
  };
  const makeSut = () => {
    const getClientsStub = makeGetClientsStub();
    return {
      getClientsStub,
      sut: new GetClientsController(getClientsStub),
    };
  };
  test("should throws auth error if no userId is provided ", () => {
    const { sut } = makeSut();
    expect(async () => {
      await sut.handle("", { data: "" }, { userId: null });
    }).rejects.toThrow(new AuthenticationError("must be logged in"));
  });
  test("should throw if getClients method throws", async () => {
    const { sut, getClientsStub } = makeSut();
    jest.spyOn(getClientsStub, "get").mockImplementationOnce(() => {
      throw new Error("");
    });

    expect(async () => {
      await sut.handle("", { data: "" }, { userId: "valid_id" });
    }).rejects.toThrow();
  });

  test("should return an array of clients", async () => {
    const { sut } = makeSut();
    const clients = await sut.handle("", { data: "" }, { userId: "valid_id" });
    expect(clients).toEqual([
      {
        _id: "id",
        name: "any_name",
        email: "any_email",
        instagram: "any_instagram",
        observations: "any_observations",
        aquisitions: "any_aquisitions",
        indication: "any_indication",
        address: "any_adress",
        number: "any_number",
      },
    ]);
  });
});
