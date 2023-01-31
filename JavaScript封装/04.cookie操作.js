const cookie = { // cookie操作【set，get，del】
    set: function(name, value, day) {
      let oDate = new Date()
      oDate.setDate(oDate.getDate() + (day || 30))
      document.cookie = name + '=' + value + ';expires=' + oDate + "; path=/;"
   },
    get: function(name) {
      let str = document.cookie
      let arr = str.split('; ')
      for (let i = 0; i < arr.length; i++) {
        let newArr = arr[i].split('=')
        if (newArr[0] === name) {
          return newArr[1]
       }
     }
   },
    del: function(name) {
      this.set(name, '', -1)
   }
}
