// pages/admin/checkin/checkin.js
const app = getApp();
import { openScanner } from '../../../utils/scan.js';
Page({
  data: {
    showModal: false
  },
  onLoad: function (options) {
    wx.bc.getData(`tickets/${options.id}`).then(res=> {
      if (this.data.ticket.used) {
        this.showUsed()
      }
    })
    
  },
  showUsed() {
    this.setData({
      showModal: true,
      modalContent: {
        title: "Error",
        content: 'This ticket has already been used!',
        goBack: true
      }
    })
  },
  checkin(e) {
    const url = wx.bc.getHost() + `checkin/${this.data.ticket.id}`
    const { next } = e.currentTarget.dataset
    wx.bc.get(url).then(res=> {
      if (res.statusCode === 200) {
        this.setData({ 
          showModal: true,
          next, 
          modalContent: {
            title: "Success",
            content: "Checked in!",
            goBack: !next
          }
        })
      } else if (res.statusCode === 422 && res.data.used) {
        this.showUsed()
      } else {
        this.setData({
          showModal: true,
          modalContent: {
            title: "Error",
            content: res.data.errors.join(', '),
            goBack: false
          }
        })
      }
    })
  },
  hideModal(e) {
    console.log(123, e.detail)
    this.setData(e.detail)
    if (e.detail.goBack) wx.navigateBack({ delta: 5 })
    else openScanner()
  }
})