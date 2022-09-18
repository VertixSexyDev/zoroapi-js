const axios = require('axios').default;
const cheerio = require('cheerio');

const search = function (req, res, next) {
    const results = {
        status: "success",
        query: req.query.name,
        amount: null,
        results: []
    };
    axios.get(`https://zoro.to/search?keyword=${req.query.name}`)
        .then(response => {
            const $ = cheerio.load(response.data);
            $('div[class=tab-content]').each((i, el) => {
                const $el = $(el);
                $el.find('div[class=flw-item]').each((i, el) => {
                    const $el = $(el);
                    const title = $el.find('a[class=dynamic-name]').text();
                    const link = `https://zoro.to${$el.find('a[class=dynamic-name]').attr('href')}`;
                    const poster = $el.find('img').attr('data-src');
                    const episodes = $el.find('.film-poster').text().split('Ep')[1].replace(/\n/g, '').replace(/\s/g, '');
                    const duration = $el.find('.fd-infor').text().split('m')[0].match(/\d+/)[0] + 'm';
                    var languages = $el.find('.tick-item').text().substring(0, 6).replace(/\n/g, '').replace(/\s/g, '');
                    if (languages === 'SUBDUB') languages = 'SUB,DUB';
                    results.results.push({
                        title,
                        episodes,
                        duration,
                        languages,
                        poster,
                        link,
                    });
                    results.amount = results.results.length;
                });
            }).get();
            res.json(results);
        });
};

module.exports = { search };
