const axios = require('axios').default;
const { performance } = require('perf_hooks');

const status = function (req, res, next) {
    const t0 = performance.now();
    try {
    axios.get('https://zoro.to/')
        .then(response => {
            res.json({
                status: "working",
                responsetime: `${Math.round(performance.now() - t0)}ms`,
                responsecode: response.status,
            });
        });
    } catch (error) {
        res.json({
            status: "error",
            error: error
        });
    }
};

module.exports = { status };
