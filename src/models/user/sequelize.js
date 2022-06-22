import { Sequelize } from 'sequelize'
import postgres  from '../../config.js'


const sequelize = new Sequelize(postgres.POSTGRES)

async function database () {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

export {
    database
}
