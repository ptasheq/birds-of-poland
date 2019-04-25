const app = require("./src/backend/app.js");

const axios = require("axios");
const axiosCookieJarSupport = require("@3846masa/axios-cookiejar-support").default;
const tough = require("tough-cookie");
axiosCookieJarSupport(axios);

const App = app._app;

const createCookieJar = () => ({
	jar: new tough.CookieJar(),
	withCredentials: true,
});

global.TEST_CONFIG = {
	USERS: {
		SOME: {
			CREDENTIALS: {
				username: "some",
				password: "some_password",
				email: "some@example.com",
			},
			SESSION: createCookieJar(),
		},
	},
};

const login = (CREDENTIALS, SESSION) =>
	axios.post(`${TEST_CONFIG.API_URL}/sessions`, CREDENTIALS, SESSION);

before(async () => {
	App.ConfigManager.set("datastore_mongo.db_name", "sealious_test");
	const serverConfig = App.ConfigManager.get("www-server");
	TEST_CONFIG.API_URL =
		"http://localhost:" + serverConfig.port + serverConfig["api-base"];
	await app.start();
	for (let key in TEST_CONFIG.USERS) {
		const user_data = TEST_CONFIG.USERS[key].CREDENTIALS;
		await App.run_action(
			new App.Sealious.SuperContext(),
			["collections", "users"],
			"create",
			user_data
		);
		await login(user_data, TEST_CONFIG.USERS[key].SESSION);
	}
});

after(() =>
	Promise.all(
		App.ChipManager.get_all_collections().map(collection_name =>
			App.Datastore.remove(collection_name, {}, "just_one" && false)
		)
	).then(() => console.log("### Cleared test database"))
);
