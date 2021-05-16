const { createProxyMiddleware } = require('http-proxy-middleware');

// https://spotify-playlist-backend2021.herokuapp.com
// http://localhost:2025
/*
module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:2025',
      changeOrigin: true,
      pathRewrite: {
        '^/api': '/',
      },
    })
  ),
    app.use(
      '/spotifyapi',
      createProxyMiddleware({
        target: 'https://api.spotify.com',
        changeOrigin: true,
        pathRewrite: {
          '^/spotifyapi': '/',
        },
      })
    );
};
*/
