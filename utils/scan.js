
const openScanner = () => {
  wx.scanCode({
    success(res) {
      console.log(res)
      const id = res.result.split(";")[0]
      if (id) {
        wx.navigateTo({
          url: `/pages/admin/checkin/checkin?id=${id}`,
        })
      } else {
        wx.showToast({
          title: 'Not Found',
          image: '/images/fail.png'
        })
      }
    }
  })
}
module.exports = {
  openScanner
}