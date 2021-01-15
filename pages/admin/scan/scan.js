// pages/admin/scan/scan.js
const app = getApp();
import { openScanner } from '../../../utils/scan.js';
Page({

  data: {

  },

  onLoad: function (options) {

  },

  scan() {
    console.log('scanning')
    const user = app.globalData.userInfo
    if (user) {
      // proceed to scan
      openScanner()
    } else {
      wx.navigateTo({
        url: '/pages/admin/login/login',
      })
    }
  },
  
})