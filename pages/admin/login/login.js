// pages/admin/login/login.js
const app = getApp()
Page({
  data: {
    showPassword: true,
    showModal: false
  },

  onLoad: function (options) {
    // wx.hideShareMenu()
    this.setData({ openid: app.globalData.openid })
  },
  showPassword() {
    this.setData({
      showPassword: !this.data.showPassword
    })
  },
  login(e) {
    const url = wx.bc.getHost() + 'admin/login'
    const { email, password } = e.detail.value
    const data = e.detail.value

    if (email && password) {
      wx.bc.post(url, data).then(res => {
        console.log('admin login res', res)
        if (res.statusCode === 422) {
          this.setData({
            showModal: true,
            modalContent: {
              title: "Error",
              content: res.data.msg,
              goBack: false
            }
          })
        } else {
          app.globalData.userInfo = res.data.user
          app.globalData.headers = res.data.headers
          wx.reLaunch({
            url: '/pages/admin/scan/scan',
          })
        }
      })
    } else {
      this.setData({
        showModal: true,
        modalContent: {
          title: "Error",
          content: 'Email or password cannot be blank',
          goBack: false
        }
      })
    }
  },
  hideModal(e) {
    this.setData(e.detail)
  }
})