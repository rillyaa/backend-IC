const pool = require('../../config/database');

module.exports = {
    submitIdea: (data, callback) => {
        pool.query(
            `INSERT INTO ideas(id_users, idea_title, idea_description, additional_details) VALUES (?, ?, ?, ?)`,
            [
                data.id_users,
                data.idea_title,
                data.idea_description,
                data.additional_details
            ],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },
    getIdeas: (callback) => {
        pool.query(
            `SELECT * FROM ideas`,
            [],
            (error, results, fields) => {
                if (error) {
                    return callback(error, null);
                }
                return callback(null, results);
            }
        );
    },
    getIdeaById: (id, callback) => {
        pool.query(
            `SELECT * FROM ideas WHERE id = ?`,
            [id],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results[0]);
            }
        );
    },
};
