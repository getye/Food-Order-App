const Pool = require("pg").Pool

const pool = new Pool({
    user: "postgres",
    password:"dbpass123",
    host:"localhost",
    port: 5432,
    database:"PizzaOrder"

}) 

module.exports = pool;