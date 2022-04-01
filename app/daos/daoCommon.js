const con = require('../config/dbconfig')

// dao => data access object - an object we're building that will allow us to get access to the data from the database.
// daoCommon => an object that can be used by all of the different data access objects.
const dao = {
    findAll: (res, table)=> {
        con.query(`SELECT * FROM ${table}`,
        (error, rows)=> {
            if(!error) {
                if(rows.length === 1) {
                    res.json(...rows)
                } else {
                    res.json(rows)
                }
            } else {
                console.log(' DAO ERROR ', error)
            }
        })
    },

    findById: (res, table, id)=> {
        con.query(
            `SELECT * FROM ${table} WHERE ${table}_id = ${id}`,
            (error, rows)=> {
                if(!error) {
                    if(rows.length === 1) {
                        res.json(...rows)
                    } else {
                        res.json(rows)
                    }
                } else {
                    console.log(' DAO ERROR ', error)
                }
            }
        )
    }
}

module.exports = dao