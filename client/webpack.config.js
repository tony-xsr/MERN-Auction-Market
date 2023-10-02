import Dotenv from "dotenv-webpack"; 
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin")

module.exports = {
    // Other rules...
    plugins: [
        new Dotenv({
            path: './.env'
          }),
        new NodePolyfillPlugin()
    ]
}