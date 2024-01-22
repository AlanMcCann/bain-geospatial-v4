module.exports = {
  devServer: {
    disableHostCheck: true,
    headers: { 'Access-Control-Allow-Origin': '*' },
    // proxy: 'https://https://bmap.ngrok.io/'
  },
  // publicPath: process.env.NODE_ENV === 'production'
  // ? 'https://integration.mtg.bain.com/globalassets/mtg/geospatialtool/v1/'
  // : '/'
  // publicPath: process.env.NODE_ENV === 'production'
  //   ? 'https://mtg.bain.com/globalassets/mtg/geospatialtool/v1/'
  //   : '/'
  // publicPath: 'https://mtg.bain.com/globalassets/mtg/geospatialtool/v1/'
  // publicPath: 'https://integration.mtg.bain.com/globalassets/mtg/geospatialtool/v1/'
  // publicPath: '/'
  // publicPath: process.env.NODE_ENV === 'production'
  //   ? 'https://integration.mtg.bain.com/globalassets/mtg/geospatialtool/v1/'
  //   : '/'
  // publicPath: process.env.NODE_ENV === 'production'
  //   ? '/globalassets/mtg/geospatialtool/v1/'
  //   : '/'


}
