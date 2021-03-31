// pages/admin/scan/scan.js
const app = getApp();
import { openScanner } from '../../../utils/scan.js';
Page({

  data: {

  },

  onLoad: function (options) {

  },
  onShareAppMessage: function () {
    const image = '/images/lwt_admin_share.jpeg'
    return {
      title: `Ladies Who Tech Admin`,
      imageUrl: image,
      path: `/pages/admin/scan/scan`
    }
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