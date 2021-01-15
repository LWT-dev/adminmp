const BR = require('bc-requests')
const BU = require('bc-utils')
import { loadTl, tl } from '../utils/tl.js'
import event from '../utils/event.js';

const launchApp = (app) => {
  userLogin()
  BU.setLanguage(app)
  BU.getSafeArea(app)
  BU.getFonts()
}

const getHost = () => {
  const d = getApp().globalData
  return d.host[d.env] + '/' + d.lang + d.api
}

const userLogin = () => {
  return new Promise((resolve, reject) => {
    let app = getApp()
    wx.login({
      success: res => {
        console.log(res)
        login(`${getHost()}admin/find_user`, res.code).then(res=> {
          console.log('login res ==>', res)
          // loadTl(res.data.tl);
          // getUserInfo();
          if (res.statusCode === 401) {
            getApp().globalData.openid = res.data.openid
            wx.navigateTo({
              url: '/pages/admin/login/login',
            })
          } else (
            wx.hideLoading()
          )
          resolve(res)
        })
      }
    })
  })
}

const userInfoReady = (page) => {
  const app = getApp()
  const d = app.globalData
  if (app.globalData.userInfoAuth) {
    page.setData({ userInfoAuth: d.userInfoAuth, userInfo: d.userInfo})
  } else {
    app.userInfoReadyCallback = res => {
      console.log('user info callback fired', res)
      page.setData({ userInfoAuth: d.userInfoAuth, userInfo: d.userInfo})
    }
  }
}

const getUserInfo = () => {
  return new Promise((resolve, reject) => {
    const app = getApp()
    console.log('inside getUserInfo')
    wx.getSetting({
      success: res => {
        console.log('wx.getSetting res ==>', res)
        if (res.authSetting['scope.userInfo']) {
          getUserDetails().then(res => {
            if (app.userInfoReadyCallback) app.userInfoReadyCallback('user authorized')
            resolve(res)
          })
        } else {
          resolve('user rejects authorization')
        }
      }
    })
  })
}

const getUserDetails = () => {
  return new Promise((resolve, reject) => {
    console.log('getting user Details')
    const app = getApp()
    wx.getUserInfo({
      success: res => {
        const url = getHost() + 'users/update'
        const user = res.userInfo
        user['avatar'] = user.avatarUrl
        user['nickname'] = user.nickName
        delete user['avatarUrl']
        delete user['nickName']
        const userInfo = app.globalData.userInfo
        const userNeedUpdate = !Object.keys(user).every((key)=>{
          return userInfo[key] == user[key]
        })
        app.globalData.userInfoAuth = true
        console.log('user need update', userNeedUpdate)
        // if (app.userAdminReadyCallback) app.userAdminReadyCallback('user admin ready')
        if (userNeedUpdate) {
          console.log('inside user need update, url ==>', url)
          BR.put(url, {user: user}).then(res => {
            app.globalData.userInfo = res.data.user
            // if (app.userInfoReadyCallback) app.userInfoReadyCallback('user authorized')
            console.log('user updated?', res.data)
            resolve(res)
          })
        } else {
          resolve(user)
          // if (app.userInfoReadyCallback) app.userInfoReadyCallback('user authorized')
        }
      },
      fail(res){resolve(res)}
    })
  })
}

const getUserPhone = () => {
  console.log('getting user Phone')
}

const updateUserPhone = (phoneData) => {
  console.log({phoneData})
  const data = { encrypted_data: phoneData }
  const url = wx.bc.getHost() + 'users/update_phone'

  return new Promise((resolve, reject) => {
    wx.bc.put(url, data).then(res => {
      console.log('phone number res', res)
      const app = getApp()
      app.globalData.userInfo = res.data.user
      event.emit('userInfoReady')
      resolve(res.data.user)
    })
  })
}

const getData = (path, page = thisPage(), shouldSetData = true) => {
  const app = getApp()
  const url = getHost() + path

  return new Promise((resolve, reject) => {
    if (!app.globalData.headers) {
      app.tokenReadyCallback = res => {
        console.log(res)
        BR.get(url).then((res) => {
          console.log('data', res.data)
          if (shouldSetData) page.setData(res.data)
          resolve(res)
        })
      }
    } else {
      BR.get(url).then((res) => {
        console.log('data', res.data)
        if (shouldSetData) page.setData(res.data)
        resolve(res)
      })
    }
  })
}

const thisPage = () => {
  return getCurrentPages().pop()
}

const lastPage = () => {
  return getCurrentPages().slice(-2, -1)[0]
}

const login = (url, code) => {
  console.log({url})
  return new Promise((resolve, reject) => {
    BR.post(url, { code: code }).then((res) => {
      const app = getApp()
      app.globalData.headers = res.data.headers
      app.globalData.userInfo = res.data.user
      console.log('globalData after login', app.globalData)
      event.emit('userInfoReady')

      if (app.tokenReadyCallback) {
        app.tokenReadyCallback('headers ready')
      }
      resolve(res)
    })
  })
}

module.exports = {
  launchApp: launchApp,
  thisPage: thisPage,
  lastPage: lastPage,
  login: login,
  getHost: getHost,
  request: BR.request,
  get: BR.get,
  post: BR.post,
  put: BR.put,
  del: BR.del,
  getToday: BU.getToday,
  checkLogin: BU.checkLogin,
  getData: getData,
  userInfoReady: userInfoReady,
  getUserInfo: getUserInfo,
  getUserPhone: getUserPhone,
  updateUserPhone,
  loadTl,
  tl
}
