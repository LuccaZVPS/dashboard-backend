import { config } from "dotenv";
import { Client } from "../../../src/domain/client";
import { mongoHelper } from "../../../src/infra/db/connection";
import { ClientRepository } from "../../../src/infra/db/repositories/client-repository";
import { clientModel } from "../../../src/infra/db/schemas/client.schema";

config();

describe("Client repository", () => {
  const DTOMock = {
    name: "any_name",
    email: "any_email",
    instagram: "any_instagram",
    observations: "any_observations",
    aquisitions: "any_aquisitions",
    indication: "any_indication",
    addres: "any_adress",
    number: "any_number",
  };
  beforeAll(() => {
    mongoHelper.connect(process.env.MONGO_URL);
  });
  afterAll(() => {
    mongoHelper.close();
  });
  afterEach(async () => {
    await clientModel.deleteMany();
  });
  const makeSut = () => {
    return {
      sut: new ClientRepository(),
    };
  };
  test("Create method should save a client", async () => {
    const { sut } = makeSut();
    const response = await sut.create(DTOMock);
    const isSaved = await clientModel.findOne({ _id: response._id });
    expect(isSaved).toBeTruthy();
  });
  test("create method should throws if mongo throws", async () => {
    const { sut } = makeSut();
    jest.spyOn(clientModel, "create").mockImplementationOnce(() => {
      throw new Error();
    });
    expect(async () => {
      await sut.create(DTOMock);
    }).rejects.toThrow(new Error());
  });

  test("get method should list all clients", async () => {
    const { sut } = makeSut();
    await clientModel.create(DTOMock);
    await clientModel.create(DTOMock);
    const clients = await sut.get();
    expect(clients.length).toBe(2);
    expect(clients[0]._id).toBeTruthy();
    expect(clients[1]._id).toBeTruthy();
  });
  test("get method should throws if mongo throws", async () => {
    const { sut } = makeSut();
    jest.spyOn(clientModel, "find").mockImplementationOnce(() => {
      throw new Error();
    });
    expect(async () => {
      await sut.get();
    }).rejects.toThrow(new Error());
  });
  test("delete method should delete a client", async () => {
    const { sut } = makeSut();
    const clientToDelete = await clientModel.create(DTOMock);
    const isDeleted = await sut.delete(clientToDelete._id as unknown as string);
    expect(isDeleted).toBe(true);
    const clients = await sut.get();
    expect(clients.length).toBe(0);
  });
  test("update method should update a client", async () => {
    const { sut } = makeSut();
    const clientToUpdate = await clientModel.create(DTOMock);
    const updatedClient = await sut.update({
      ...DTOMock,
      name: "Lucca",
      _id: clientToUpdate._id.toString(),
    });
    expect(updatedClient.name).toBe("Lucca");
  });
  test("update method should throws if mongo throws", async () => {
    const { sut } = makeSut();
    jest.spyOn(clientModel, "findOneAndUpdate").mockImplementationOnce(() => {
      throw new Error();
    });
    expect(async () => {
      await sut.update({ ...DTOMock, _id: "any_id" });
    }).rejects.toThrow(new Error());
  });
  test("find method should find return an client if exist ", async () => {
    const { sut } = makeSut();
    const clientToFind = await clientModel.create(DTOMock);
    const client = (await sut.find(
      clientToFind._id.toString()
    )) as unknown as Client;
    expect(client._id.toString()).toBe(clientToFind._id.toString());
  });
  test("find method should return void if no client exist", async () => {
    const { sut } = makeSut();
    const clientToFind = await clientModel.create(DTOMock);
    await clientModel.deleteMany();
    const client = (await sut.find(
      clientToFind._id.toString()
    )) as unknown as Client;
    expect(client).toBeFalsy();
  });
});
