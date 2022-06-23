

async function userModel (Sequelize, sequelize) {
    return await sequelize.define('users', {
        chat_id: {
            type: Sequelize.DataTypes.BIGINT,
            primaryKey: true
        },
        first_name: {
            type: Sequelize.DataTypes.STRING,
        },
        last_name: {
            type: Sequelize.DataTypes.STRING,
        },
        email: {
            type: Sequelize.DataTypes.STRING,
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