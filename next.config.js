const withPWA = require('next-pwa')
const runtimeCaching = require('next-pwa/cache')

module.exports = withPWA({
    pwa: {
        dest: 'public',
        runtimeCaching,
    },
    images: {
        domains: ['source.unsplash.com', 'images.unsplash.com'],
    },

})