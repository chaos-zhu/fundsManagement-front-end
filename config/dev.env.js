'use strict'
const merge = require('../node_modules/webpack-merge/lib')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"'
})
