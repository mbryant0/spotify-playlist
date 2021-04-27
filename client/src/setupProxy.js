const { createProxyMiddleware } = require('http-proxy-middleware');

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
