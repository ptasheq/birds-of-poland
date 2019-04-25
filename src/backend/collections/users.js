module.exports = app => {
	const Users = app.ChipManager.get_chip("collection", "users");
	Users.set_access_strategy({
		create: "public",
		show: "public",
	});
};
