
const _ = require("lodash");
const consts = require("../core/consts.js");
const Controller = require("../core/baseController.js");

const {
	USER_IDENTIFY_DEFAULT,
	USER_IDENTIFY_STUDENT,
	USER_IDENTIFY_TEACHER,
	USER_IDENTIFY_APPLY_TEACHER,
} = consts;

class UsersController extends Controller {

	async show() {
		const {ctx} = this;
		const id = _.toNumber(ctx.params.id);
		if (!id) ctx.throw(400, "id invalid");

		const data = await ctx.model.Packages.getById(id);

		return this.success(data);
	}

	async update() {
		const {ctx} = this;
		const id = _.toNumber(ctx.params.id);
		if (!id) ctx.throw(400, "id invalid");

		this.enauthenticated();
		const userId = this.getUser().userId;

		if (id != userId) ctx.throw(400, "args error");

		const params = ctx.request.body;

		delete params.coin;
		delete params.identify;
		delete params.username;

		const result = await ctx.model.Users.update(params, {where:{id}});

		return this.success(result);
	}

	// 申请成老师
	async applyTeacher() {
		// 发送key email  使用memory 防止一个key 给了多个用户
		// 动态生成key
	}

	// 成为老师
	async teacher() {
		const {ctx} = this;
		const id = _.toNumber(ctx.params.id);
		if (!id) ctx.throw(400, "id invalid");
		const params = ctx.request.body;

		ctx.validate({
			key: "string",
		}, params);
		
		const user = await ctx.model.Users.getById(id);
		if (!user) ctx.throw(400, "arg error");

		let isOk = await ctx.model.TeacherCDKeys.useKey(params.key, id);
		if (!isOk) ctx.throw(400, "key invalid");

		user.identify = (user.identify | USER_IDENTIFY_TEACHER) & (~USER_IDENTIFY_APPLY_TEACHER);

		const result = await ctx.model.Users.update(user, {where:{id}});

		return this.success(result);
	}

	// 用户课程包
	async packages() {
		const {ctx} = this;
		const id = _.toNumber(ctx.params.id);
		if (!id) ctx.throw(400, "id invalid");
		
		const list = await ctx.model.Subscribes.getByUserId(id);

		return this.success(list);
	}

}

module.exports = UsersController;
