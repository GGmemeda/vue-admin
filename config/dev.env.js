'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')


module.exports = merge(prodEnv, {
    NODE_ENV: '"development"',
    BASE_API: '"http://115.29.175.3:92/handle"'
})