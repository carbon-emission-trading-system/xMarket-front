'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  //跨域配置
  API_ROOT:'"//localhost:8090/api"'
})
