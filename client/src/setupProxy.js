const { createProxyMiddleware } = require('http-proxy-middleware');

// https://spotify-playlist-backend2021.herokuapp.com

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://spotify-playlist-backend2021.herokuapp.com',
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
