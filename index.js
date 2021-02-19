'use strict'

/**
 * The inspiration came from this velocity-loader
 * [velocity-loader](https://github.com/WISZC/velocity-loader)
 */

const loaderUtils = require('loader-utils')
const path = require('path')
const fs = require('fs')
const Velocity = require('velocityjs')
const { Compile, parse } = Velocity
let watcher

const macros = (resourcePath, options) => {
  return {
    parse (filePath) {
      return this.include(filePath)
    },
    include (filePath) {
      let absPath
      if (options.basePath) {
        absPath = path.join(options.basePath, filePath)
      } else {
        absPath = path.resolve(path.dirname(resourcePath), filePath)
      }
      if (!fs.existsSync(absPath)) return ''
      watcher(absPath)
      return fs.readFileSync(absPath, 'utf8')
    }
  }
}

module.exports = function (source) {
  this.cacheable && this.cacheable()

  const options = loaderUtils.parseQuery(this.query)
  const filePath = this.resourcePath

  watcher = this.addDependency

  // 使用宏，处理 parse
  const needTransformStr = source.match(/\#parse\(.*\)/g)
  needTransformStr &&
    needTransformStr.map((str) => {
      const transformedStr = new Compile(parse(str)).render(
        null,
        macros(filePath, options)
      )
      source = source.replace(str, transformedStr)
    })

  // 删除注释
  if (options.removeComments) {
    source = source.replace(/#\*[\s\S]*?\*#/g, '').replace(/##[\s\S]*?\n/g, '')
  }

  return source
}
