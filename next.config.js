const path = require('path')

module.exports = {
  webpack(config, options) {
    config.resolve.modules.push(path.resolve("./"));
    
return config;
  },
  env: {
    API_URL: 'http://localhost:1337',
  },
  
}
