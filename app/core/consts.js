
// 课程包状态
const PACKAGE_STATE_UNAUDIT = 0;   // 未审核
const PACKAGE_STATE_AUDITING = 1;  // 审核中
const PACKAGE_STATE_AUDIT_SUCCESS = 2; // 审核成功
const PACKAGE_STATE_AUDIT_FAILED = 3;  // 审核失败

// 课程包订阅状态
const PACKAGE_SUBSCRIBE_STATE_UNBUY = 0; // 未购买
const PACKAGE_SUBSCRIBE_STATE_BUY = 1;   // 已购买

// 教师KEY状态
const TEACHER_KEY_STATE_UNUSED = 0; // 未使用
const TEACHER_KEY_STATE_USING = 1;  // 使用中
const TEACHER_KEY_STATE_DISABLE = 2; // 禁用

// 用户身份
const USER_IDENTIFY_DEFAULT = 0;
const USER_IDENTIFY_STUDENT = 1;
const USER_IDENTIFY_TEACHER = 2;
const USER_IDENTIFY_APPLY_TEACHER = 4;

// 课堂状态
const CLASSROOM_STATE_UNUSED = 0; // 未上课
const CLASSROOM_STATE_USING = 1;  // 上课中
const CLASSROOM_STATE_USED = 2;   // 上课结束

// 学习记录状态
const LEARN_RECORD_STATE_START = 0;  // 自学
const LEARN_RECORD_STATE_FINISH = 1; // 自学

// 知识币变更类型
const COIN_TYPE_SUBSCRIBE_PACKAGE = 0; // 订阅课程包
const COIN_TYPE_SYSTEM_DONATE = 1; // 系统赠送
const COIN_TYPE_PACKAGE_REWARD = 2; // 课程包返还

// 教师权限
const TEACHER_PRIVILEGE_TEACH = 1; // 教课权限

module.exports = {
	PACKAGE_STATE_UNAUDIT,
	PACKAGE_STATE_AUDITING,
	PACKAGE_STATE_AUDIT_SUCCESS,
	PACKAGE_STATE_AUDIT_FAILED,

	PACKAGE_SUBSCRIBE_STATE_UNBUY,
	PACKAGE_SUBSCRIBE_STATE_BUY,

	TEACHER_KEY_STATE_UNUSED,
	TEACHER_KEY_STATE_USING,
	TEACHER_KEY_STATE_DISABLE,

	USER_IDENTIFY_DEFAULT:0,
	USER_IDENTIFY_STUDENT:1,
	USER_IDENTIFY_TEACHER:2,
	USER_IDENTIFY_APPLY_TEACHER:4,
	USER_IDENTIFY_ALLIANCE_MEMBER:8,

	CLASSROOM_STATE_UNUSED,
	CLASSROOM_STATE_USING,
	CLASSROOM_STATE_USED,

	LEARN_RECORD_STATE_START,
	LEARN_RECORD_STATE_FINISH,

	COIN_TYPE_SUBSCRIBE_PACKAGE,
	COIN_TYPE_SYSTEM_DONATE,
	COIN_TYPE_PACKAGE_REWARD,

	TEACHER_PRIVILEGE_TEACH,

	TRADE_TYPE_CHARGE:0,      // 充值
	TRADE_TYPE_EXCHANGE:1,    // 兑换
	TRADE_TYPE_PACKAGE_BUY:2,   // 购买课程包
	TRADE_TYPE_LESSON_STUDY: 3, // 课程学习
};
