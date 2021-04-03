const withPWA = require("next-pwa");
const runtimeCaching = require("next-pwa/cache");

const settings = {
  trailingSlash: true, // this has to be done to make oauth work with amplify: https://github.com/aws-amplify/amplify-js/issues/7477
  env: {},
  devIndicators: {
    autoPrerender: false,
  },
  pwa: {
    dest: "public",
    runtimeCaching,
  },
  images: {
    domains: ["source.unsplash.com", "images.unsplash.com"],
  },
};

module.exports =
  process.env.NODE_ENV === "development" ? settings : withPWA(settings);
