// next.config.js
const imageDomains = process.env.R2_PUBLIC_DOMAIN ? process.env.R2_PUBLIC_DOMAIN.split(',') : [];

module.exports = {
  images: {
    domains: imageDomains,
  },
}
