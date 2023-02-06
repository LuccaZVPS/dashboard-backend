import { mongoHelper } from "../../../src/infra/db/connection";
import { ArchitectRepository } from "../../../src/infra/db/repositories/architect-repository";
import { config } from "dotenv";
import { architectModel } from "../../../src/infra/db/schemas/architect.schema";
import { Callback } from "mongoose";
import { clientModel } from "../../../src/infra/db/schemas/client.schema";
config();
describe("ArchitectRepository", () => {
  jest.setTimeout(30000);
  const architectMock = {
    name: "any",
    email: "any",
    address: "any",
    number: "any",
    instagram: "any",
    observations: "any",
    sampleDate: "any",
    catalog: "any",
    bankInfo: "any",
  };
  beforeAll(async () => {
    await mongoHelper.connect(process.env.MONGO_URL);
  });
  afterAll(async () => {
    await mongoHelper.close();
  });
  beforeEach(async () => {
    await architectModel.deleteMany();
  });
  const makeSut = () => {
    return {
      sut: new ArchitectRepository(),
    };
  };
  //Get Architects
  test("should call find method", async () => {
    const { sut } = makeSut();
    const spy = jest.spyOn(architectModel, "find");
    await sut.get();
    expect(spy).toHaveBeenCalled();
  });
  test("should return all architects", async () => {
    const { sut } = makeSut();
    const architectsInCollects = await architectModel.find();
    const architects = await sut.get();
    expect(architects).toEqual(architectsInCollects);
  });
  //Create Architect
  test("should call create method with correct values", async () => {
    const { sut } = makeSut();
    const spy = jest.spyOn(architectModel, "create");
    await sut.create(architectMock);
    expect(spy).toHaveBeenCalledWith(architectMock);
  });
  test("should return a create architect", async () => {
    const { sut } = makeSut();
    const createdArchitect = await sut.create(architectMock);
    const find = await architectModel.find();
    expect(createdArchitect._id).toEqual(find[0]._id);
  });
  //Find Architect
  test("should call findOne method with correct values", async () => {
    const { sut } = makeSut();
    const spy = jest.spyOn(architectModel, "findOne");
    const architect = await architectModel.create(architectMock);
    await sut.find(architect._id.toString());
    expect(spy).toHaveBeenCalledWith({ _id: architect._id.toString() });
  });
  test("should find an architect", async () => {
    const { sut } = makeSut();
    const architect = await architectModel.create(architectMock);
    const architectFinded = await sut.find(architect._id.toString());
    expect(architectFinded._id).toEqual(architect._id);
  });
  //Delete Archictect
  test("should call findOneAndDelete method with correct values", async () => {
    const { sut } = makeSut();
    const spy = jest.spyOn(architectModel, "findOneAndDelete");
    const architect = await architectModel.create(architectMock);
    await sut.delete(architect._id.toString());
    expect(spy).toHaveBeenCalledWith({ _id: architect._id.toString() });
  });
  test("should delete an architect", async () => {
    const { sut } = makeSut();
    const architect = await architectModel.create(architectMock);
    await sut.delete(architect._id.toString());
    const architectList = await clientModel.find();
    expect(architectList).toEqual([]);
  });
  //Update Architect
  test("should call findOneAndUpdate method with correct values", async () => {
    const { sut } = makeSut();
    const spy = jest.spyOn(architectModel, "findOneAndUpdate");
    const architect = await architectModel.create(architectMock);
    await sut.update({ ...architectMock, _id: architect._id.toString() });
    expect(spy).toHaveBeenCalledWith(
      { _id: architect._id.toString() },
      { ...architectMock, _id: architect._id.toString() },
      {
        new: true,
      }
    );
  });
  test("should return an updated an architect", async () => {
    const { sut } = makeSut();
    const architect = await architectModel.create(architectMock);
    const updatedArchitect = await sut.update({
      ...architectMock,
      _id: architect._id.toString(),
      name: "updated",
    });
    expect(updatedArchitect._id).toEqual(architect._id);
    expect(updatedArchitect.name).toBe("updated");
  });
});
