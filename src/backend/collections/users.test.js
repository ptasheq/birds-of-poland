const axios = require("axios");
const assert = require("assert");

describe("Collection users", () => {
	it("returns test user", async () => {
		const response = await axios.get(
			"http://localhost:8080/api/v1/collections/users"
		);
		assert.deepEqual(response.data.items[0].username, "some");
	});
});
