import tools from './config.js'
import pg from 'pg'

console.log(process.env.PG_PORT);

const pool = new pg.Pool({
    port: process.env.PG_PORT,
    host: process.env.PG_HOST,
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    database: process.env.PG_DATABASE,
    //connectionString: process.env.PG_CONNECTION_STRING,
})
    
async function db (query, ...params) {
    const client = await pool.connect()
    try {
        const { rows } = await client.query(query, params.length ? params : null)
        return rows
    } catch (error) {
        console.log('Database error:', error.message)
        throw new Error(error.message)
    } finally {
        client.release()
    }
}

// export default db