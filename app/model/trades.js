
module.exports = app => {
	const {
		BIGINT,
		STRING,
		INTEGER,
		DATE,
		JSON,
	} = app.Sequelize;

	const model = app.model.define("trades", {
		id: {
			type: BIGINT,
			autoIncrement: true,
			primaryKey: true,
		},

		userId: {          // 用户id
			type: BIGINT,
			allowNull: false,
		},

		type: {            // 交易类型 0 -- 知识豆  1 -- 知识币
			type: INTEGER,
			defaultValue: 0,
		},
		
		amount: {          // 金额
			type: INTEGER,
			defaultValue: 0,
		},

		description: {
			type:STRING,
		},

		extra: {     // 额外数据
			type: JSON,
			defaultValue:{},
		},

	}, {
		underscored: false,
		charset: "utf8mb4",
		collate: 'utf8mb4_bin',
	});

	//model.sync({force:true});
	
	return model;
}
