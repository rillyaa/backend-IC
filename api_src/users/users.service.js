const pool = require('../../config/database');
const bcrypt = require('bcrypt');

module.exports = {
    checkUserExists: (username, email, callback) => {
        pool.query(
            `SELECT COUNT(*) AS usernameCount, 
                    (SELECT COUNT(*) FROM users WHERE email = ?) AS emailCount 
             FROM users WHERE username = ?`,
            [email, username],
            (error, results, fields) => {
                if (error) {
                    return callback(error, null);
                }
                
                const usernameExists = results[0].usernameCount > 0;
                const emailExists = results[0].emailCount > 0;
    
                return callback(null, { usernameExists, emailExists });
            }
        );
    },
    create: (data, callback) => {
        // Pastikan data.role adalah salah satu dari nilai yang diizinkan
        const allowedRoles = ['Developer', 'Investor'];
        if (!allowedRoles.includes(data.role)) {
            const error = new Error('Invalid role');
            return callback(error);
        }
    
        // Gunakan bcrypt untuk meng-hash password sebelum menyimpannya di database
        bcrypt.hash(data.password, 10, (hashError, hashedPassword) => {
        if (hashError) {
            return callback(hashError);
        }
    
            // Setelah password di-hash, tambahkan pengguna ke database
            pool.query(
                `INSERT INTO users(username, email, password, role) VALUES (?, ?, ?, ?)`,
                [
                    data.username,
                    data.email,
                    hashedPassword, // Gunakan hashedPassword
                    data.role
                ],
                (error, results, fields) => {
                    if (error) {
                        return callback(error);
                    }
                    return callback(null, results);
                }
            );
        });
    },
    // create: (data, callback) => {
    //     const allowedRoles = ['Developer', 'Investor'];
    //     if (!allowedRoles.includes(data.role)) {
    //         const error = new Error('Invalid role');
    //         return callback(error);
    //     }

    //     bcrypt.hash(data.password, 10, (hashError, hashedPassword) => {
    //     if (hashError) {
    //         return callback(hashError);
    //     }

    //     pool.query(
    //         `insert into users(username, email, password, role) VALUES (?,?,?,?)`,
    //         [
    //             data.username,
    //             data.email,
    //             data.password,
    //             data.role
    //         ],
    //         ( error, results, fields ) => {
    //             if(error) {
    //                 return callback(error)
    //             }
    //             return callback(null, results)
    //         }
    //     );
    // },
    getUsers: callback => {
        pool.query(
            `select id, username, email, role from users`,
            [],
            (error, results, fields) => {
                if(error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },
    getUserByID: (id, callback) => {
        pool.query(
            `select id, username, email, role from users where id = ?`,
            [id],
            (error, results, fields) => {
                if(error) {
                    return callback(error);
                }
                return callback(null, results[0]);
            }
        );
    },
    updateUser: (data, callback) => {
        pool.query(
            `update users set username=?, email=?, password=? where id=?`,
            [
                data.username,
                data.email,
                data.password,
                data.id
            ],
            (error, results, fields) => {
                if(error) {
                    return callback(error)
                }
                return callback(null, results);
            }
        );
    },
    deleteUser: (id, callback) => {
        pool.query(
            `DELETE FROM users WHERE id=?`,
            [id],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                if (results.affectedRows === 0) {
                    // ID pengguna tidak ditemukan
                    return callback({
                        message: 'User not found',
                        notFound: true
                    });
                }
                callback(null, results); // No need to access results[0]
            }
        );
    },

    // getUserbyEmail: (email, callback) => {
    //     pool.query(
    //         `select * from users where email=?`,
    //         [email],
    //         (error, results, fields) => {
    //             if (error) {
    //                 console.error('Error in getUserbyEmail query:', error);
    //                 return callback(error);
    //             }
    
    //             console.log('Results from getUserbyEmail:', results);

    //             callback(null, results);
    //         }
    //     );
    // }

    getUserbyEmail: async (email) => {
        return new Promise((resolve, reject) => {
            pool.query(
                'SELECT * FROM users WHERE email = ?',
                [email],
                (error, results, fields) => {
                    if (error) {
                        console.error('Error in getUserbyEmail query:', error);
                        reject(error);
                    } else {
                        console.log('Results from getUserbyEmail:', results);
                        resolve(results[0]); // Assuming results is an array
                    }
                }
            );
        });
    }
};