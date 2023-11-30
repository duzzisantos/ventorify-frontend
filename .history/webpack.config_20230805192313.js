const webpack = require("webpack");
module.exports = {
  plugins: [
    webpack.DefinePlugin({
      "process.env.MONGO_URI": JSON.stringify(
        '"mongodb+srv://duzzisantos:<barcelonaG22#>@cluster0.4sdusad.mongodb.net/Inventory?retryWrites=true&w=majority"'
      ),
      "process.env.REQUESTER_EMAIL": JSON.stringify("ventorify.app@gmail.com"),
    }),
  ],
};
