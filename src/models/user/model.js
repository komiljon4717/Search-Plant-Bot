

async function userModel (Sequelize, sequelize) {
    return await sequelize.define('users', {
        chat_id: {
            type: Sequelize.DataTypes.BIGINT,
            primaryKey: true
        },
        first_name: {
            type: Sequelize.DataTypes.STRING(40),
        },
        last_name: {
            type: Sequelize.DataTypes.STRING(40),
        },
        email: {
            type: Sequelize.DataTypes.STRING(100),
            unique: true
        },
        step: {
            type: Sequelize.DataTypes.SMALLINT,
            defaultValue: 1
        }
    })
}

export {
    userModel
}