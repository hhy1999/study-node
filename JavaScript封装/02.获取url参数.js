const getUrlParam = function(name) { // 获取url参数
    let reg = new RegExp('(^|&?)' + name + '=([^&]*)(&|$)', 'i')
    let r = window.location.href.substr(1).match(reg)
    if (r != null) {
      return decodeURI(r[2])
    }
    return undefined
}


