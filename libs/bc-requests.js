let headers = () => {
  return getApp().globalData.headers
}

let request = (url, data = {}) => {
  return new Promise(
    (resolve, reject) => {
      wx.request({
        url: url,
        header: headers(),
        success: function (res) {
          let data = res.data;
          resolve(res);
        },
        fail: function (err) {
          let error = false;
          reject(err);
        }
      });
    }
  );
}

let post = (url, data = {}) => {
  return new Promise(
    (resolve, reject) => {
      wx.request({
        url: url,
        header: headers(),
        method: 'POST',
        data: data,
        success: function (res) {
          let data = res.data;
          resolve(res);
        },
        fail: function (err) {
          let error = false;
          reject(err);
        }
      });
    }
  );
}

let put = (url, data = {}) => {
  return new Promise(
    (resolve, reject) => {
      wx.request({
        url: url,
        header: headers(),
        method: 'PUT',
        data: data,
        success: function (res) {
          let data = res.data;
          resolve(res);
        },
        fail: function (err) {
          let error = false;
          reject(err);
        }
      });
    }
  );
}

let del = (url, data = {}) => {
  return new Promise(
    (resolve, reject) => {
      wx.request({
        url: url,
        header: headers(),
        method: 'DELETE',
        data: data,
        success: function (res) {
          let data = res.data;
          resolve(res);
        },
        fail: function (err) {
          let error = false;
          reject(err);
        }
      });
    }
  );
}

let get = (url, data = {}) => {
  url += "?"
  let params = []
  Object.keys(data).forEach(e => {
    if (e.includes("[]")) {
      data[e] = data[e].split(',')
      data[e].forEach(x => { params.push(`${e}=${x}`) })
    } else {
      params.push(`${e}=${data[e]}`)
    }
  })
  url += params.join("&")
console.log('url', url)
  return new Promise(
    (resolve, reject) => {
      wx.request({
        url: url,
        header: headers(),
        method: 'GET',
        // data: data,
        success: function (res) {
          let data = res.data;
          resolve(res);
        },
        fail: function (err) {
          let error = false;
          reject(err);
        }
      });
    }
  );
}

module.exports = {
  request: request,
  post: post,
  del: del,
  get: get,
  put: put
}
