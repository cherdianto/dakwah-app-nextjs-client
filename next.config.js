const { i18n } = require('./next-i18next.config');

module.exports = {
    env: {
        ENV:"dev", //prod || dev
        API_URL_PROD:"https://apimoslemguide.cherdianto.site",
        API_URL_DEV:"http://localhost:3001",
        URL_BASE_PROD:"https://moslemguide.cherdianto.site",
        URL_BASE_DEV:"http://localhost:3000"
    },
    i18n
  }