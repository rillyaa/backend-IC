const pool = require('../../config/database');

module.exports = {
    offerInvestment: (data, callback) => {
        pool.query(
            `INSERT INTO investments(investor_id, developer_id, idea_id, amount, message) VALUES (?, ?, ?, ?, ?)`,
            [
                data.investor_id,
                data.developer_id,
                data.idea_id,
                data.amount,
                data.message
            ],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },
    getInvestmentsByDeveloper: (developerId, callback) => {
        pool.query(
            `SELECT * FROM investments WHERE developer_id = ?`,
            [developerId],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },
};
