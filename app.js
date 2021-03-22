//app.js
const BC = require('libs/bc.js');
wx.p = require('utils/wxp')
wx.bc = BC

// const env = 'dev';
// const env = 'stag';
const env = 'prod';

App({
  onLaunch: function () {
    wx.showLoading()
    wx.bc.launchApp(this)
  },
  globalData: {
    lang: 'en', // cn or en
    userInfo: null,
    openid: null,
    env: env,
    host: {
      prod: 'https://mp.ladieswhotech.cn',
      stag: 'https://mp-staging.ladieswhotech.cn',
      dev: 'http://localhost:3000'
    },
    api: '/api/v1/',
  }
})