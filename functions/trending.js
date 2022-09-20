const axios = require('axios').default;
const cheerio = require('cheerio');

const trending = function (req, res, next) {
    const results = {
        status: "success",
        amount: null,
        results: []
    };
    axios.get('https://zoro.to/home')
        .then(response => {
            const $ = cheerio.load(response.data);
            $('div[class=trending-list]').each((i, el) => {
                const $el = $(el);
                $el.find('div[class=item]').each((i, el) => {
                    const $el = $(el);
                    const title = $el.find('div[class=number]').text().replace(/\n/g, '').replace(/\d+/g, '').replace(/\s\s+/g, ' ').trim();
                    const link = `https://zoro.to${$el.find('a[class=film-poster]').attr('href')}`;
                    const poster = $el.find('img').attr('data-src');
                    const number = $el.find('div[class=number]').text().replace(/\n/g, '').replace(/\s/g, '').match(/\d+/)[0];
                    results.results.push({
                        title,
                        number,
                        poster,
                        link,
                    });
                    results.amount = results.results.length;
            }).get();
        });
        res.json(results);
    });
}

module.exports = { trending };
