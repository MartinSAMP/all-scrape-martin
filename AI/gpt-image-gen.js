/*

Scrape ini dibuat oleh martin
Github: https://github.com/MartinSAMP
Tools: GPT Image Generator
Fungsi: Menghasilkan gambar berdasarkan prompt menggunakan DeepImg Generator

*/


const axios = require("axios");

const DeepImgGenerator = {
  config: {
    apiUrl: "https://api-preview.chatgot.io/api/v1/deepimg/flux-1-dev",
    imageSize: "1024x1024",
    headers: {
      "Content-Type": "application/json",
      Origin: "https://deepimg.ai",
      Referer: "https://deepimg.ai/",
      "User-Agent":
        "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36",
    },
  },

  _getDeviceId: () => {
    return `dev-${Math.floor(Math.random() * 1000000)}`;
  },

  generate: async (prompt) => {
    try {
      if (!prompt) {
        return {
          status: 400,
          success: false,
          owners: "Martin",
          message: "Promptna mana, mang?",
        };
      }

      const response = await axios.post(
        DeepImgGenerator.config.apiUrl,
        {
          prompt,
          size: DeepImgGenerator.config.imageSize,
          device_id: DeepImgGenerator._getDeviceId(),
        },
        { headers: DeepImgGenerator.config.headers },
      );

      const imageUrl = response.data?.data?.images?.[0]?.url;
      if (!imageUrl) throw new Error("Gagal meunangkeun URL gambar.");

      return {
        status: 200,
        success: true,
        owners: "Martin",
        payload: {
          url: imageUrl,
          model: "flux-1-dev",
          prompt,
        },
      };
    } catch (err) {
      return {
        status: 500,
        success: false,
        owners: "DevX",
        message: err.response?.data?.message || err.message,
      };
    }
  },
};

(async () => {
  console.log("Wett");
  const prompt =
    "Pria Solo";
  const res = await DeepImgGenerator.generate(prompt);
  console.log(JSON.stringify(res, null, 2));
})();

module.exports = DeepImgGenerator;

/*

Respon 

Wett
{
  "status": 200,
  "success": true,
  "owners": "Martin",
  "payload": {
    "url": "https://assets.chaygpt.net/middle/030d86bfa47995e2f8d22f3cbc8bdc8d/f054c975-f1fe035a.png",
    "model": "flux-1-dev",
    "prompt": "Pria Solo"
  }
}

*/
