"use strict";

const { ServiceBroker, Context } = require("moleculer");
const { ValidationError } = require("moleculer").Errors;
const TestService = require("../../../services/users.service");

describe("Test 'users' service", () => {
	describe("Test actions", () => {
		const broker = new ServiceBroker({ logger: false });
		const service = broker.createService(TestService);

		jest.spyOn(service.adapter, "updateById");
		jest.spyOn(service, "transformDocuments");
		jest.spyOn(service, "entityChanged");

		beforeAll(() => broker.start());
		afterAll(() => broker.stop());

		const record = {
			_id: "123",
			firstname: "Ali",
			lastname: "Fakoor",
			username: "alifakoor",
			password: "12345678",
			email: "ali.fakoor13@gmail.com",
			phone: "09108869419",
		};

		describe("Test 'users.update'", () => {
			it("should call the adapter updateById method & transform result", async () => {
				service.adapter.updateById.mockImplementation(
					async () => record
				);
				service.transformDocuments.mockClear();
				service.entityChanged.mockClear();

				const res = await broker.call("users.update", {
					id: "123",
					firstname: "Reza",
				});
				expect(res).toEqual({
					_id: "123",
					firstname: "Ali",
					lastname: "Fakoor",
					username: "alifakoor",
					password: "12345678",
					email: "ali.fakoor13@gmail.com",
					phone: "09108869419",
				});

				expect(service.adapter.updateById).toBeCalledTimes(1);
				expect(service.adapter.updateById).toBeCalledWith("123", {
					$inc: { firstname: "Reza" },
				});
			});
		});
	});
});
