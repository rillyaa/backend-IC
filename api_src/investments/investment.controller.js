const { offerInvestment, getInvestmentsByDeveloper } = require('./investment.service');

module.exports = {
    offerInvestment: (req, res) => {
        const body = req.body;

        offerInvestment(body, (err, results) => {
            if (err) {
                console.error(err);
                return res.status(500).json({
                    error: true,
                    message: 'Failed to offer investment'
                });
            }

            if (results.affectedRows > 0) {
                return res.status(200).json({
                    error: false,
                    message: 'Investment offered successfully'
                });
            } else {
                return res.status(500).json({
                    error: true,
                    message: 'Failed to offer investment'
                });
            }
        });
    },
    getInvestmentsByDeveloper: (req, res) => {
        const developerId = req.params.developerId;

        getInvestmentsByDeveloper(developerId, (err, results) => {
            if (err) {
                console.error(err);
                return res.status(500).json({
                    error: true,
                    message: 'Failed to fetch investments'
                });
            }

            return res.status(200).json({
                error: false,
                message: 'Investments fetched successfully',
                investments: results
            });
        });
    },
};
