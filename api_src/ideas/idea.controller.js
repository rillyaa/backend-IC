const { submitIdea, getIdeas, getIdeaById } = require('./idea.service');

module.exports = {
    submitIdea: (req, res) => {
        const body = req.body;

        submitIdea(body, (err, results) => {
            if (err) {
                console.error(err);
                return res.status(500).json({
                    error: true,
                    message: 'Failed to submit idea'
                });
            }

            if (results.affectedRows > 0) {
                return res.status(200).json({
                    error: false,
                    message: 'Idea submitted successfully'
                });
            } else {
                return res.status(500).json({
                    error: true,
                    message: 'Failed to submit idea'
                });
            }
        });
    },
    getIdeas: (req, res) => {
        getIdeas((err, results) => {
            if (err) {
                console.error(err);
                return res.status(500).json({
                    error: true,
                    message: 'Failed to fetch ideas'
                });
            }

            return res.status(200).json({
                error: false,
                message: 'Ideas fetched successfully',
                ideas: results
            });
        });
    },
    getIdeaById: (req, res) => {
        const id = req.params.id;
        getIdeaById(id, (err, results) => {
            if (err) {
                console.error(err);
                return res.status(500).json({
                    error: true,
                    message: 'Failed to fetch idea'
                });
            }

            return res.status(200).json({
                error: false,
                message: 'Idea fetched successfully',
                idea: results
            });
        });
    },
};
