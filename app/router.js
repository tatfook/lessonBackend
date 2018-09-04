
module.exports = app => {
	const {router, config, controller} = app;
	const selfConfig = config.self;
	const prefix = selfConfig.apiUrlPrefix;

	console.log(selfConfig);
	console.log(config.sequelize);

	router.resources("index", prefix + "index", controller.index);

	const email = controller.email;
	router.resources(prefix + "emails", email);

	const users = controller.users;
	router.get(prefix + "users/token", users.token);
	router.resources("users", prefix + "users", users);
	router.post(prefix + "users/:id/applyTeacher", users.applyTeacher);
	router.post(prefix + "users/:id/teacher", users.teacher);
	router.post(prefix + "users/:id/subscribes", users.postSubscribes);
	router.get(prefix + "users/:id/subscribes", users.getSubscribes);
	router.get(prefix + "users/:id/isSubscribe", users.isSubscribe);
	router.get(prefix + "users/:id/coins", users.coins);
	router.get(prefix + "users/:id/skills", users.skills);
	router.get(prefix + "users/:id/isTeach", users.isTeach);

	const packages = controller.packages;
	router.get(prefix + "packages/teach", packages.teach);
	router.get(prefix + "packages/hots", packages.hots);
	router.get(prefix + "packages/search", packages.search);
	router.resources("packages", prefix + "packages", packages);
	router.post(prefix + "packages/:id/lessons", packages.addLesson);
	router.put(prefix + "packages/:id/lessons", packages.putLesson);
	router.delete(prefix + "packages/:id/lessons", packages.deleteLesson);
	router.get(prefix + "packages/:id/lessons", packages.lessons);
	router.get(prefix + "packages/:id/detail", packages.detail);
	router.post(prefix + "packages/:id/subscribe", packages.subscribe);
	router.get(prefix + "packages/:id/isSubscribe", packages.isSubscribe);
	router.post(prefix + "packages/:id/audit", packages.audit);

	const lessons = controller.lessons;
	router.resources("lessons", prefix + "lessons", lessons);
	router.post(prefix + "lessons/:id/skills", lessons.addSkill);
	router.delete(prefix + "lessons/:id/skills", lessons.deleteSkill);
	router.get(prefix + "lessons/:id/skills", lessons.getSkills);
	router.post(prefix + "lessons/:id/learnRecords", lessons.createLearnRecords);
	router.put(prefix + "lessons/:id/learnRecords", lessons.updateLearnRecords);
	router.get(prefix + "lessons/:id/learnRecords", lessons.getLearnRecords);
	router.post(prefix + "lessons/:id/contents", lessons.release);
	router.get(prefix + "lessons/:id/contents", lessons.content);
	router.get(prefix + "lessons/:id/detail", lessons.detail);

	const classrooms = controller.classrooms;
	router.get(prefix + "classrooms/current", classrooms.current);
	router.post(prefix + "classrooms/join", classrooms.join);
	router.post(prefix + "classrooms/quit", classrooms.quit);
	router.resources("classrooms", prefix + "classrooms", classrooms);
	router.get(prefix + "classrooms/:id/learnRecords", classrooms.getLearnRecords);
	router.put(prefix + "classrooms/:id/learnRecords", classrooms.updateLearnRecords);
	router.post(prefix + "classrooms/:id/learnRecords", classrooms.createLearnRecords);
	router.put(prefix + "classrooms/:id/dismiss", classrooms.dismiss);

	const learnRecords = controller.learnRecords;
	router.get(prefix + "learnRecords/isReward", learnRecords.isReward);
	router.post(prefix + "learnRecords/:id/reward", learnRecords.reward);
	router.resources( prefix + "learnRecords", learnRecords);

	const subjects = controller.subjects;
	router.resources("subjects", prefix + "subjects", subjects);
	//router.resources("subjects", prefix + "admins/subjects", subjects);
	const skills = controller.skills;
	router.resources("skills", prefix + "skills", skills);
	//router.resources("skills", prefix + "admins/skills", skills);

	const teacherCDKeys = controller.teacherCDKeys;
	router.post(prefix + "admins/teacherCDKeys/generate", teacherCDKeys.generate);
	router.resources("teacherCDKeys", prefix + "admins/teacherCDKeys", teacherCDKeys);

	const admins = controller.admins;
	router.resources("admins", prefix + "admins/:resources", admins);
	router.post("admins", prefix + "admins/:resources/search", admins.search);

	const pays = controller.pays;
	router.post("pays", prefix + "pays/callback",  pays.callback);
}
