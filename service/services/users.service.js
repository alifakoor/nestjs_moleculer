"use strict";

const DbMixin = require("../mixins/db.mixin");

/**
 * @typedef {import('moleculer').Context} Context Moleculer's Context
 */

module.exports = {
	name: "users",
	// version: 1

	/**
	 * Mixins
	 */
	mixins: [DbMixin("users")],

	/**
	 * Settings
	 */
	settings: {
		// Available fields in the responses
		fields: [
			"_id",
			"firstname",
			"lastname",
			"username",
			"password",
			"email",
			"phone",
		],

		// Validator for the `create` & `insert` actions.
		entityValidator: {
			firstname: "string|min:2|max:100",
			lastname: "string|min:2|max:100",
			username: "string|min:3|max:50",
			password: "string|min:8",
		},
	},

	/**
	 * Actions
	 */
	actions: {
		/**
		 * The "moleculer-db" mixin registers the following actions:
		 *  - list
		 *  - find
		 *  - count
		 *  - create
		 *  - insert
		 *  - update
		 *  - remove
		 */
	},

	/**
	 * Methods
	 */
	methods: {
		/**
		 * Loading sample data to the collection.
		 * It is called in the DB.mixin after the database
		 * connection establishing & the collection is empty.
		 */
		async seedDB() {
			await this.adapter.insertMany([
				{
					firstname: "Ali",
					lastname: "Fakoor",
					username: "alifakoor",
					password: "12345678",
					email: "ali.fakoor13@gmail.com",
					phone: "09108869419"
				},
				{
					firstname: "Amir",
					lastname: "Amiri",
					username: "amir",
					password: "12345678",
					phone: "09352938039"
				},
				{
					firstname: "Bahar",
					lastname: "Saeidi",
					username: "bahar",
					password: "12345678"
				},
			]);
		},
	},

	/**
	 * Fired after database connection establishing.
	 */
	async afterConnected() {
		// await this.adapter.collection.createIndex({ name: 1 });
	},
};
