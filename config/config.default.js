
exports.keys = "lesson";

exports.cors = {
	origin: "*",
}

exports.middleware = ['authenticated'];

exports.security = {
	xframe: {
		enable: false,
	},
	csrf: {
		enable: false,
	},
}

exports.onerror = {
	all: (e, ctx) => {
		const message = e.stack || e.message || e.toString();

		ctx.status = e.status || 500;
		ctx.body = message;
		if (e.name == "SequelizeUniqueConstraintError") {
			ctx.status = 409;
		}
	}
}
