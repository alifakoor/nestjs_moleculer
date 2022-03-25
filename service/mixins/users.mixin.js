module.exports = {
	methods: {
		removePasswordField(ctx, res) {
			delete res.password;
			if (res?.rows) {
				for (row of res.rows) {
					delete row.password;
				}
			}
			return res;
		}
	}
}