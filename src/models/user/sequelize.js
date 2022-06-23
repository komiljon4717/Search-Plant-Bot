import { Sequelize } from 'sequelize'
import postgres  from '../../config.js'
import { userModel } from "./model.js";


const sequelize = new Sequelize(postgres.POSTGRES, {
    logging: false})

async function database () {
    try {
        let db = {}

        db.user = await userModel(Sequelize, sequelize)

        await sequelize.sync({ force: false })
        return db
        
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}


export {
    database
}
