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

/**

{
  "metadata": {
    "author": "martin",
    "source": "https://media.sindonews.com/",
    "scraped_at": "2026-03-01T09:24:37.588Z",
    "url": "https://media.sindonews.com/"
  },
  "data": {
    "video": [
      {
        "id": 1,
        "title": "Ibu-Ibu di Bekasi Palak Truk Sampah! Tak Bayar, Kendaraan Dirusak",
        "category": "News",
        "publish_date": "28 Februari 2026 - 21:30 WIB",
        "url": "https://media.sindonews.com/video/play/116111/6/ibu-ibu-di-bekasi-palak-truk-sampah-tak-bayar-kendaraan-dirusak",
        "thumbnail": "https://pict.sindonews.net/webp/338/salsabila/video/2026/02/28/6/116111/ibuibu-di-bekasi-palak-truk-sampah-tak-bayar-kendaraan-dirusak-kss.webp",
        "thumbnail_alt": "Ibu-Ibu di Bekasi Palak..."
      },
      {
        "id": 2,
        "title": "Viral Mobil Dinas 8,5 M, Gaya Nyentrik Istri Gubernur Kaltim Kini Jadi Sorotan Netizen!",
        "category": "News",
        "publish_date": "28 Februari 2026 - 17:00 WIB",
        "url": "https://media.sindonews.com/video/play/116109/6/viral-mobil-dinas-85-m-gaya-nyentrik-istri-gubernur-kaltim-kini-jadi-sorotan-netizen",
        "thumbnail": "https://pict.sindonews.net/webp/338/salsabila/video/2026/02/28/6/116109/viral-mobil-dinas-85-m-gaya-nyentrik-istri-gubernur-kaltim-kini-jadi-sorotan-netizen-tmi.webp",
        "thumbnail_alt": "Viral Mobil Dinas 8,5..."
      },
      {
        "id": 3,
        "title": "Militer Israel Serang Iran, Pengamat: Pasukan Amerika Terlibat dalam Serangan Ini",
        "category": "News",
        "publish_date": "28 Februari 2026 - 15:42 WIB",
        "url": "https://media.sindonews.com/video/play/116107/6/militer-israel-serang-iran-pengamat-pasukan-amerika-terlibat-dalam-serangan-ini",
        "thumbnail": "https://pict.sindonews.net/webp/338/salsabila/video/2026/02/28/6/116107/militer-israel-serang-iran-pengamat-pasukan-amerika-terlibat-dalam-serangan-ini-lnl.webp",
        "thumbnail_alt": "Militer Israel Serang..."
      },
      {
        "id": 4,
        "title": "Polisi Tetapkan Pelaku Penganiayaan Mahasiswi di Riau, jadi Tersangka!",
        "category": "News",
        "publish_date": "28 Februari 2026 - 13:00 WIB",
        "url": "https://media.sindonews.com/video/play/116105/6/polisi-tetapkan-pelaku-penganiayaan-mahasiswi-di-riau-jadi-tersangka",   
        "thumbnail": "https://pict.sindonews.net/webp/338/salsabila/video/2026/02/28/6/116105/polisi-tetapkan-pelaku-penganiayaan-mahasiswi-di-riau-jadi-tersangka-hky.webp",
        "thumbnail_alt": "Polisi Tetapkan Pelaku..."
      },
      {
        "id": 5,
        "title": "KPK Ungkap Setoran Rp 7 Miliar ke Pejabat Bea Cukai untuk Loloskan Barang KW",
        "category": "News",
        "publish_date": "28 Februari 2026 - 09:00 WIB",
        "url": "https://media.sindonews.com/video/play/116103/6/kpk-ungkap-setoran-rp-7-miliar-ke-pejabat-bea-cukai-untuk-loloskan-barang-kw",
        "thumbnail": "https://pict.sindonews.net/webp/338/salsabila/video/2026/02/28/6/116103/kpk-ungkap-setoran-rp-7-miliar-ke-pejabat-bea-cukai-untuk-loloskan-barang-kw-ohy.webp",
        "thumbnail_alt": "KPK Ungkap Setoran Rp..."
      },
      {
        "id": 6,
        "title": "Gaya Istri Gubernur Kaltim Jadi Sorotan! Bak Noni Belanda",
        "category": "News",
        "publish_date": "27 Februari 2026 - 22:37 WIB",
        "url": "https://media.sindonews.com/video/play/116101/6/gaya-istri-gubernur-kaltim-jadi-sorotan-bak-noni-belanda",
        "thumbnail": "https://pict.sindonews.net/webp/338/salsabila/video/2026/02/28/6/116101/gaya-istri-gubernur-kaltim-jadi-sorotan-bak-noni-belanda-xgr.webp",
        "thumbnail_alt": "Gaya Istri Gubernur..."
      }
    ],
    "infografis": [
      {
        "id": 1,
        "title": "Jadwal Imsakiyah Ramadan 1447 H, Minggu 1 Maret 2026",
        "category": "Infografis",
        "publish_date": "28 Februari 2026 - 22:00 WIB",
        "url": "https://media.sindonews.com/infografis/graph/33333/jadwal-imsakiyah-ramadan-1447-h-minggu-1-maret-2026",
        "thumbnail": "https://pict.sindonews.net/webp/338/salsabila/slider/2026/02/33333/jadwal-imsakiyah-ramadan-1447-h-minggu-1-maret-2026-abb.webp",
        "thumbnail_alt": "Jadwal Imsakiyah Ramadan..."
      },
      {
        "id": 2,
        "title": "5 Manfaat Makan Kurma Saat Sahur dan Buka Puasa",
        "category": "Infografis",
        "publish_date": "28 Februari 2026 - 12:49 WIB",
        "url": "https://media.sindonews.com/infografis/graph/33327/5-manfaat-makan-kurma-saat-sahur-dan-buka-puasa",
        "thumbnail": "https://pict.sindonews.net/webp/338/salsabila/slider/2026/02/33327/5-manfaat-makan-kurma-saat-sahur-dan-buka-puasa-nae.webp",
        "thumbnail_alt": "5 Manfaat Makan Kurma..."
      },
      {
        "id": 3,
        "title": "5 Pesepak Bola Dunia yang Tetap Puasa di Tengah Kompetisi Padat Ramadan 2026",
        "category": "Infografis",
        "publish_date": "27 Februari 2026 - 14:00 WIB",
        "url": "https://media.sindonews.com/infografis/graph/33323/5-pesepak-bola-dunia-yang-tetap-puasa-di-tengah-kompetisi-padat-ramadan-2026",
        "thumbnail": "https://pict.sindonews.net/webp/338/salsabila/slider/2026/02/33323/5-pesepak-bola-dunia-yang-tetap-puasa-di-tengah-kompetisi-padat-ramadan-2026-cuq.webp",
        "thumbnail_alt": "5 Pesepak Bola Dunia..."
      },
      {
        "id": 4,
        "title": "Ancaman Perang Kian Nyata, 8 Negara Minta Warganya Tinggalkan Iran",
        "category": "Infografis",
        "publish_date": "27 Februari 2026 - 08:00 WIB",
        "url": "https://media.sindonews.com/infografis/graph/33321/ancaman-perang-kian-nyata-8-negara-minta-warganya-tinggalkan-iran",   
        "thumbnail": "https://pict.sindonews.net/webp/338/salsabila/slider/2026/02/33321/ancaman-perang-kian-nyata-8-negara-minta-warganya-tinggalkan-iran-cwt.webp",
        "thumbnail_alt": "Ancaman Perang Kian..."
      },
      {
        "id": 5,
        "title": "Jadwal Imsakiyah Ramadan 1447 H, Jumat 27 Februari 2026",
        "category": "Infografis",
        "publish_date": "27 Februari 2026 - 01:00 WIB",
        "url": "https://media.sindonews.com/infografis/graph/33317/jadwal-imsakiyah-ramadan-1447-h-jumat-27-februari-2026",
        "thumbnail": "https://pict.sindonews.net/webp/338/salsabila/slider/2026/02/33317/jadwal-imsakiyah-ramadan-1447-hjumat-27-februari-2026-jaj.webp",
        "thumbnail_alt": "Jadwal Imsakiyah Ramadan..."
      },
      {
        "id": 6,
        "title": "10 Figur Publik Penerima Beasiswa LPDP, dari Mutiara Baswedan hingga Maudy Ayunda",
        "category": "Infografis",
        "publish_date": "25 Februari 2026 - 15:44 WIB",
        "url": "https://media.sindonews.com/infografis/graph/33315/10-figur-publik-penerima-beasiswa-lpdp-dari-mutiara-baswedan-hingga-maudy-ayunda",
        "thumbnail": "https://pict.sindonews.net/webp/338/salsabila/slider/2026/02/33315/12-figur-publik-penerima-beasiswa-lpdp-dari-mutiara-baswedan-hingga-maudy-ayunda-wcj.webp",
        "thumbnail_alt": "10 Figur Publik Penerima..."
      }
    ],
    "foto": [
      {
        "id": 1,
        "title": "Ramadan Rebana Colossal",
        "category": "News",
        "publish_date": "28 Februari 2026 - 12:57 WIB",
        "url": "https://media.sindonews.com/foto/view/71355/1/ramadan-rebana-colossal",
        "thumbnail": "https://pict.sindonews.net/webp/338/salsabila/photo/2026/02/28/1/71355/ramadan-rebana-colossal-dik.webp",
        "thumbnail_alt": "Ramadan Rebana Colossal"
      },
      {
        "id": 2,
        "title": "Amankan Unjuk Rasa di Mabes Polri, Polisi Pakai Peci dan Sorban Putih",
        "category": "News",
        "publish_date": "28 Februari 2026 - 12:44 WIB",
        "url": "https://media.sindonews.com/foto/view/71353/1/amankan-unjuk-rasa-di-mabes-polri-polisi-pakai-peci-dan-sorban-putih",     
        "thumbnail": "https://pict.sindonews.net/webp/338/salsabila/photo/2026/02/28/1/71353/amankan-unjuk-rasa-di-mabes-polri-polisi-pakai-peci-dan-sorban-putih-yun.webp",
        "thumbnail_alt": "Amankan Unjuk Rasa di..."
      },
      {
        "id": 3,
        "title": "DBS Spring Festival 2026 Angkat Tema Wealth, Crafted with Purpose",
        "category": "News",
        "publish_date": "28 Februari 2026 - 07:09 WIB",
        "url": "https://media.sindonews.com/foto/view/71359/1/dbs-spring-festival-2026-angkat-tema-wealth-crafted-with-purpose",
        "thumbnail": "https://pict.sindonews.net/webp/338/salsabila/photo/2026/03/01/1/71359/dbs-spring-festival-2026-angkat-tema-wealth-crafted-with-purpose-ysm.webp",
        "thumbnail_alt": "DBS Spring Festival..."
      },
      {
        "id": 4,
        "title": "Gebrakan Ramadan Gemini 2026 dari Google",
        "category": "News",
        "publish_date": "28 Februari 2026 - 05:43 WIB",
        "url": "https://media.sindonews.com/foto/view/71357/1/gebrakan-ramadan-gemini-2026-dari-google",
        "thumbnail": "https://pict.sindonews.net/webp/338/salsabila/photo/2026/03/01/1/71357/gebrakan-ramadan-gemini-2026-dari-google-bor.webp",
        "thumbnail_alt": "Gebrakan Ramadan Gemini..."
      },
      {
        "id": 5,
        "title": "Indosat HiFi Air Hadirkan Internet Rumah Instan untuk Streaming hingga WFH",
        "category": "News",
        "publish_date": "27 Februari 2026 - 21:54 WIB",
        "url": "https://media.sindonews.com/foto/view/71349/1/indosat-hifi-air-hadirkan-internet-rumah-instan-untuk-streaming-hingga-wfh",
        "thumbnail": "https://pict.sindonews.net/webp/338/salsabila/photo/2026/02/28/1/71349/indosat-hifi-air-hadirkan-internet-rumah-instan-untuk-streaming-hingga-wfh-sls.webp",
        "thumbnail_alt": "Indosat HiFi Air Hadirkan..."
tan-untuk-streaming-hingga-wfh-sls.webp",
        "thumbnail_alt": "Indosat HiFi Air Hadirkan..."
      },
      {
        "id": 6,
        "title": "DKI Perketat Izin dan Operasional Lapangan Padel di Kawasan Permukiman",
        "category": "News",
        "publish_date": "27 Februari 2026 - 13:45 WIB",
        "url": "https://media.sindonews.com/foto/view/71345/1/dki-perketat-izin-dan-operasional-lapangan-padel-di-kawasan-permukiman",   
      },
      {
        "id": 6,
        "title": "DKI Perketat Izin dan Operasional Lapangan Padel di Kawasan Permukiman",
        "category": "News",
        "publish_date": "27 Februari 2026 - 13:45 WIB",
        "url": "https://media.sindonews.com/foto/view/71345/1/dki-perketat-izin-dan-operasional-lapangan-padel-di-kawasan-permukiman",   
        "title": "DKI Perketat Izin dan Operasional Lapangan Padel di Kawasan Permukiman",
        "category": "News",
        "publish_date": "27 Februari 2026 - 13:45 WIB",
        "url": "https://media.sindonews.com/foto/view/71345/1/dki-perketat-izin-dan-operasional-lapangan-padel-di-kawasan-permukiman",   
        "category": "News",
        "publish_date": "27 Februari 2026 - 13:45 WIB",
        "url": "https://media.sindonews.com/foto/view/71345/1/dki-perketat-izin-dan-operasional-lapangan-padel-di-kawasan-permukiman",   
        "publish_date": "27 Februari 2026 - 13:45 WIB",
        "url": "https://media.sindonews.com/foto/view/71345/1/dki-perketat-izin-dan-operasional-lapangan-padel-di-kawasan-permukiman",   
        "thumbnail": "https://pict.sindonews.net/webp/338/salsabila/photo/2026/02/27/1/71345/dki-perketat-izin-dan-operasional-lapangan-p        "url": "https://media.sindonews.com/foto/view/71345/1/dki-perketat-izin-dan-operasional-lapangan-padel-di-kawasan-permukiman",   
        "thumbnail": "https://pict.sindonews.net/webp/338/salsabila/photo/2026/02/27/1/71345/dki-perketat-izin-dan-operasional-lapangan-p        "thumbnail": "https://pict.sindonews.net/webp/338/salsabila/photo/2026/02/27/1/71345/dki-perketat-izin-dan-operasional-lapangan-padel-di-kawasan-permukiman-cgz.webp",
adel-di-kawasan-permukiman-cgz.webp",
        "thumbnail_alt": "DKI Perketat Izin dan..."
      }
        "thumbnail_alt": "DKI Perketat Izin dan..."
      }
    ]
  }
        "thumbnail_alt": "DKI Perketat Izin dan..."
      }
        "thumbnail_alt": "DKI Perketat Izin dan..."
      }
    ]
  }
}
PS C:\Users\Hype GLK\Downloads\scraper>


















        "thumbnail_alt": "DKI Perketat Izin dan..."
      }
    ]
  }
}
PS C:\Users\Hype GLK\Downloads\scraper>















        "thumbnail_alt": "DKI Perketat Izin dan..."
      }
    ]
  }
}
PS C:\Users\Hype GLK\Downloads\scraper>


        "thumbnail_alt": "DKI Perketat Izin dan..."
      }
    ]
        "thumbnail_alt": "DKI Perketat Izin dan..."
        "thumbnail_alt": "DKI Perketat Izin dan..."
      }
    ]
  }
}

**/
