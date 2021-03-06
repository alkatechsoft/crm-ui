
module.exports = {
    devServer: {
        proxy: 'http://192.168.1.101:80/'
    }
  }
//   const authtoken=axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');

 // this is Es6 module for above code
//   export const devServer = {
//     proxy: 'http://192.168.1.14/'
// }; 