const loadRes = function(name, type, fn) { // 加载js || css || style
    let ref
    if (type === 'js') { // 外部js
      ref = document.createElement('script')
      ref.setAttribute('type', 'text/javascript')
      ref.setAttribute('src', name)
   } else if (type === 'css') { // 外部css
      ref = document.createElement('link')
      ref.setAttribute('rel', 'stylesheet')
      ref.setAttribute('type', 'text/css')
      ref.setAttribute('href', name)
   } else if (type === 'style') { // style
      ref = document.createElement('style')
      ref.innerhtml = name
   }
    if (typeof ref !== 'undefined') {
      document.getElementsByTagName('head')[0].appendChild(ref)
      ref.onload = function() { // 加载完成执行
        typeof fn === 'function' && fn()
     }
   }
}