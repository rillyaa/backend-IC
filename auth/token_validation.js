const { verify } = require('jsonwebtoken');

module.exports = {
    checkToken: (req, res, next) => {
        let token = req.get('authorization');
        if(token) {
            token = token.slice(7);
            verify(token, process.env.SECRET_KEY, (err, decoded) => {
                if(err) {
                    res.json({
                        error: true,
                        message: 'Invalid token'
                    });
                } else {
                    next();
                }
            })
        }else {
            res.json({
                error: true,
                message: 'Access denied, unauthorized user'
            });
        }
    }
}