const fetch = require("node-fetch");

exports.handler = async function (event, context) {
  const UNSPLASH_API_KEY = process.env.UNSPLASH_API_KEY;
  const { query, page } = JSON.parse(event.body);

  const url = `https://api.unsplash.com/search/photos?page=${page}&query=${query}&client_id=${UNSPLASH_API_KEY}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify(data.results),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to fetch images" }),
    };
  }
};
