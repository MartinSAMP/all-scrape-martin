const axios = require('axios');
const cheerio = require('cheerio');

/**
 * Sindonews Media Scraper
 * Author: martin
 * Date: 2026-03-01
 * Web: https://media.sindonews.com
 */

async function scrapeSindonewsMedia() {
    const url = 'https://media.sindonews.com/';
    
    try {
        const { data } = await axios.get(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
            }
        });

        const $ = cheerio.load(data);
        const result = {
            metadata: {
                author: "martin",
                source: "https://media.sindonews.com/",
                scraped_at: new Date().toISOString(),
                url: url
            },
            data: {
                video: [],
                infografis: [],
                foto: []
            }
        };

        $('.warp-title-section:contains("Video")').next('.warp-list-article').find('.list-article').each((index, element) => {
            const $el = $(element);
            const link = $el.find('a').attr('href');
            const title = $el.find('.title-article').text().trim();
            const category = $el.find('.sub-kanal').text().trim();
            const date = $el.find('.date-article').text().trim();
            const image = $el.find('img').attr('data-src') || $el.find('img').attr('src');
            const alt = $el.find('img').attr('alt');

            result.data.video.push({
                id: index + 1,
                title: title,
                category: category,
                publish_date: date,
                url: link,
                thumbnail: image,
                thumbnail_alt: alt
            });
        });

        $('.warp-title-section:contains("Infografis")').next('.warp-list-article').find('.list-article').each((index, element) => {
            const $el = $(element);
            const link = $el.find('a').attr('href');
            const title = $el.find('.title-article').text().trim();
            const category = $el.find('.sub-kanal').text().trim();
            const date = $el.find('.date-article').text().trim();
            const image = $el.find('img').attr('data-src') || $el.find('img').attr('src');
            const alt = $el.find('img').attr('alt');

            result.data.infografis.push({
                id: index + 1,
                title: title,
                category: category,
                publish_date: date,
                url: link,
                thumbnail: image,
                thumbnail_alt: alt
            });
        });

        $('.warp-title-section:contains("Foto")').next('.warp-list-article').find('.list-article').each((index, element) => {
            const $el = $(element);
            const link = $el.find('a').attr('href');
            const title = $el.find('.title-article').text().trim();
            const category = $el.find('.sub-kanal').text().trim();
            const date = $el.find('.date-article').text().trim();
            const image = $el.find('img').attr('data-src') || $el.find('img').attr('src');
            const alt = $el.find('img').attr('alt');

            result.data.foto.push({
                id: index + 1,
                title: title,
                category: category,
                publish_date: date,
                url: link,
                thumbnail: image,
                thumbnail_alt: alt
            });
        });

        console.log(JSON.stringify(result, null, 2));
        
        return result;

    } catch (error) {
        console.error('Error scraping:', error.message);
        return {
            metadata: {
                author: "martin",
                error: true,
                message: error.message
            },
            data: null
        };
    }
}

scrapeSindonewsMedia();
