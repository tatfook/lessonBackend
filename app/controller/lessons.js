
const _ = require("lodash");

const Controller = require("../core/baseController.js");

class LessonsController extends Controller {

	async index() {
		const {ctx} = this;
		const query = ctx.query || {};

		this.enauthenticated();
		const userId = this.getUser().userId;

		query.userId = userId;

		const list = await ctx.model.Lessons.findAndCount(query);

		return this.success(list);
	}

	async show() {
		const {ctx} = this;
		const id = _.toNumber(ctx.params.id);
		if (!id) ctx.throw(400, "id invalid");

		const data = ctx.model.Lessons.getById(id);

		return this.success(data);
	}

	async create() {
		const {ctx} = this;
		const params = ctx.request.body;
		const skills = params.skills;

		this.enauthenticated();
		const userId = this.getUser().userId;
		params.userId = userId;
		params.state = PACKAGE_STATE_AUDIT_SUCCESS;

		let lesson = await ctx.model.Lessons.create(params);
		if (!lesson) ctx.throw("500", "DB failed");

		lesson = lesson.get({plain:true});

		if (!skills || !_.isArray(skills)) return this.success(lesson);

		for (let i = 0; i < skills.length; i++) {
			let skillParams = skills[i];
			if (!skillParams.id) continue;
			let skill = await ctx.model.Skills.findOne({where:{id:skillParams.id}});
			if (!skill) continue;

			await ctx.model.LessonSkills.create({
				skillId: skill.id,
				lessonId: lesson.id,
				score: skillParams.score,
			});
		}

		return this.success(lesson);
	}

	async update() {
		const {ctx} = this;
		const params = ctx.request.body;
		const id = _.toNumber(ctx.params.id);
		if (!id) ctx.throw(400, "id invalid");

		this.enauthenticated();
		const userId = this.getUser().userId;

		delete params.state;

		const result = await ctx.model.Lessons.update(params, {where:{id}});

		return this.success(result);
	}

	async destroy() {
		const {ctx} = this;
		const id = _.toNumber(ctx.params.id);
		if (!id) ctx.throw(400, "id invalid");

		this.enauthenticated();
		const userId = this.getUser().userId;

		await ctx.model.LessonSkills.destroy({where:{lessonId:id, userId}});
		const result = await ctx.model.Lessons.destroy({where:{id, userId}});

		return this.success(result);
	}

	async addSkill() {
		const {ctx} = this;
		const id = _.toNumber(ctx.params.id);
		if (!id) ctx.throw(400, "id invalid");
		const params = ctx.request.body;
		
		ctx.validate({
			skillId: "int",
			score: {
				type: "int",
			}
		});

		this.enauthenticated();
		const userId = this.getUser().userId;

		const result = await this.ctx.model.Lessons.addSkill(userId, id, params.skillId, params.score);
		return this.success(result);
	}

	async deleteSkill() {
		const {ctx} = this;
		const id = _.toNumber(ctx.params.id);
		if (!id) ctx.throw(400, "id invalid");

		const params = ctx.query || {};
		const skillId = params.skillId && _.toNumber(params.skillId);
		if (!skillId) ctx.throw(401, "args error");

		this.enauthenticated();
		const userId = this.getUser().userId;

		const result = await this.ctx.model.Lessons.addSkill(userId, id, skillId);

		return this.success(result);
	}

	async release() {
		const {ctx} = this;
		const id = _.toNumber(ctx.params.id);
		if (!id) ctx.throw(400, "id invalid");

		const params = ctx.request.body;
		ctx.validate({
			content: "string",
		}, params);

		this.enauthenticated();
		const userId = this.getUser().userId;

		const lesson = await ctx.model.Lessons.getById(id, userId);
		if (!lesson) ctx.throw(400, "args error");
		
		const result = await ctx.model.LessonContents.release(id, params.content);
	}

	async learn() {
		const {ctx} = this;
		const id = _.toNumber(ctx.params.id);
		if (!id) ctx.throw(400, "id invalid");

		this.enauthenticated();
		const userId = this.getUser().userId;

		const data = await ctx.model.LearnRecords.create({
			userId,
			lessonId:id,
		});

		return this.success(data);
	}

	async learnRecords() {
		const {ctx} = this;
		const id = _.toNumber(ctx.params.id);
		if (!id) ctx.throw(400, "id invalid");

		this.enauthenticated();
		const userId = this.getUser().userId;

		const params = ctx.request.body || {};
		if (!params.id) ctx.throw(400, "args error");

		params.lessonId = id;
		params.userId = userId;
	
		const result = await ctx.model.LearnRecords.update(params, {
			where: {id, userId},
		});

		return this.success(result);
	}
}

module.exports = LessonsController;
