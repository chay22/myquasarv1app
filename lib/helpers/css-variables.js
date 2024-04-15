const fs = require('fs')
const { join } = require('path')

const appPaths = require('../app-paths')

let cssVariables = {}

module.exports = cssVariablesFn

function cssVariablesFn(resolve) {
  resolve = (resolve && resolve.src) || appPaths.resolve.src
  cssVariables = {
    quasarSrcExt: 'css',

    appFile: {
      styl: fs.existsSync(resolve('css/quasar.variables.styl')),
      scss: fs.existsSync(resolve('css/quasar.variables.scss')),
      sass: fs.existsSync(resolve('css/quasar.variables.sass'))
    },

    loaders: {
      styl: join(__dirname, '../webpack/loader.quasar-stylus-variables'),
      scss: join(__dirname, '../webpack/loader.quasar-scss-variables'),
      sass: join(__dirname, '../webpack/loader.quasar-sass-variables')
    }
  }

  for (ext of Object.keys(cssVariables.appFile)) {
    if (cssVariables.appFile[ext]) {
      cssVariables.quasarSrcExt = ext === 'scss' ? 'sass' : ext
      break
    }
  }

  for (const key in cssVariables) {
    cssVariablesFn[key] = cssVariables[key]
  }
}

cssVariablesFn()
