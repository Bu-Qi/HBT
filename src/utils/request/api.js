import { get } from './http'

// 获取气价
export const gasPriceApi = () => get('/price/prediction');


// eg:::
// import {airdropApi, receiveApi} from '../pathTo/utils/request/api';
// methods:{
//   async getDetail(){
//     let params = {
//       page: 1,
//       deviceCode: 'xxxx',
//       type: 'xxx'
//     }
//     let res = listApi(params);
//     if(res.code == 0) {
//       // doSomething
//     }
//   }
// }