const Dotenv = require("dotenv-webpack");
const webpack = require("webpack");
module.exports = {
  plugins: [
    new Dotenv(),
    webpack.DefinePlugin({
      "process.env.MONGO_URI": JSON.stringify(
        "mongodb+srv://duzzisantos:<barcelonaG22#>@cluster0.4sdusad.mongodb.net/Inventory?retryWrites=true&w=majority"
      ),
      "process.env.REQUESTER_EMAIL": JSON.stringify("ventorify.app@gmail.com"),
    }),
  ],
};
