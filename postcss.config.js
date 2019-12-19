module.exports = {
  plugins: {
    autoprefixer: {},
    'postcss-px-to-viewport':{
      unitToConvert: 'px',
      viewportWidth: 320,
      unitPrecision: 5,
      viewportUnit: 'vw',
      selectorBlackList: [],
      minPixelValue: 1,
      mediaQuery: false,
      replace: true,
      exclude: [/TabBar/]
    }
  }
}
