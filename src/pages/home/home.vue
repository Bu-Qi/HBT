<template>
  <div :class="['container']">
    <div class="head">
      <div class="link_box flex_v_end">
        <div class="item">
          <div class="align-center">
          </div>
        </div>
      </div>
      <div class="my flex">
        <img
          :src="require('../../assets/' + assetUrl + 'apple-touch-icon.png')"
          class="huo"
          mode
        />
        <div class="right">
          <div class="align-center">
            <div class="text" style="color: #fff">奖池余额</div>
          </div>
          <div class="num alignLeft">{{ totalSupply }}   BNB</div>
        </div>
      </div>
      
      <div class="money space-between">
        <div class="item">
          <div class="align-center">
            <img
              :src="require('../../assets/' + assetUrl + 'wdye.png')"
              class="img"
              mode
            />
            <div class="text">我的BNB余额</div>
          </div>
          <div class="num">{{ power }}   BNB</div>
        </div>
        <div class="item">
          <div class="align-center">
            <img
              :src="require('../../assets/' + assetUrl + 'qwtx.png')"
              class="img1"
              mode
            />
            <div class="text">待领取的奖金</div>
          </div>
          <div class="num">{{reward}}  BNB</div>
        </div>
      </div>
      <div class="hy">
        <div class="text alignLeft">奖池合约</div>
        <div class="space-between">
          <div class="num ellipsis">{{ contractAddress }}</div>
          <img
            src="../../assets/copy.png"
            class="copy"
            @click="h5Copy(contractAddress)"
            mode
          />
        </div>
      </div>
    </div>
    <div class="cont">
      <div class="tab space-between">
        <div class="item" @click="showBurnFlag = true">
          <img
            :src="require('../../assets/' + assetUrl + 'tab1.png')"
            class="img"
            mode
          />
          <div class="text">BNB质押</div>
          
        </div>


         <div class="item" @click="showgetFlag = true">
          <img
            :src="require('../../assets/' + assetUrl + 'tab1.png')"
            class="img"
            mode
          />
          <div class="text">幸运奖池投注</div>
          
       
        </div>
        <div class="item" @click="rebuy">
          <img
            :src="require('../../assets/' + assetUrl + 'tab2.png')"
            class="img"
            mode
          />
           <div class="text">复投BNB </div>
            </div>
        
        
        <div class="item" @click="getReceiveIncome">
          <img
            :src="require('../../assets/' + assetUrl + 'tab3.png')"
            class="img"
            mode
          />
          <div class="text">领取BNB收益</div>
     <!--  </div>
        <div class="item" @click="lvShow = true">
          <img
            :src="require('../../assets/' + assetUrl + 'tab3.png')"
            class="img"
            mode
          />
          <div class="text">游戏说明</div>
        </div> 
        <div class="item" @click="h5Copy(myAddress)">
          <img
            :src="require('../../assets/' + assetUrl + 'tab4.png')"
            class="img"
            mode
          />
          <div class="text">邀请好友</div> -->
        </div> 
      </div>
      <div class="my-box">
        <div class="top space-between">
          <div class="align-center">
            <img
              :src="require('../../assets/' + assetUrl + 'add.png')"
              class="img"
              mode
            />
            <div class="text">我的地址</div>
          </div>
          <div class="text">共邀请 {{ inviteCount }} 人</div>
        </div>
        <div class="copy space-between">
          <div class="num ellipsis">{{ myAddress }}</div>
          <img
            :src="require('../../assets/' + assetUrl + 'copy1.png')"
            class="copy-img"
            @click="h5Copy(myAddress)" 
            mode
          />
        </div>
      </div>
      <div class="my-box">
        <div class="top space-between">
          <div class="align-center">
            <img src="../../assets/bind.png" class="img1" mode />
            <div class="text">绑定邀请人</div>
          </div>
        </div>
        <div class="copy copy1 space-between">
          <div class="num ellipsis" v-if="inviteAddress != ''">
            {{ inviteAddress }}
          </div>
          <input
            type="text"
            v-model="inviteAddressInput"
            v-else
            placeholder="请输入邀请人地址"
            class="input_grey num flex1"
          />
          <div
            class="text1"
            v-if="
              inviteAddress != '' &&
              inviteAddress != '0x0000000000000000000000000000000000000000'
            "
          >
            已绑定
          </div>
          <div class="flex-box" v-else @click="registration">确定绑定</div>
        </div>
      </div>
    </div>
    <div class="bg" v-show="lvShow">
      <div class="flex-box">
        <div class="box">
          <div class="align-center">
            <img
              :src="require('../../assets/' + assetUrl + 'wenhao.png')"
              class="wenhao"
              mode
            />
            <div class="text">游戏说明</div>
          </div>
          <div class="text1 alignLeft">
            <br />邀请好友获得10%的奖励，3%奖励开发团队，日收益10%
            <br />幸运奖池为随机数开奖，投注BNB有概率获得2倍奖励，奖励邀请人0.5%投注额，开发团队0.5%投注额。
          </div>
          <div class="flex-box btn" @click="lvShow = false">好的</div>
        </div>
      </div>
    </div>
    <!-- 质押BNB -->
    <div class="bg" v-show="showBurnFlag">
      <div class="flex-box">
        <div class="box1">
          <div class="align-center">
            <img
              :src="require('../../assets/' + assetUrl + 'rs.png')"
              class="rs"
              mode
            />
            <div class="text"  @click="lvShow = true,showBurnFlag=false">质押说明</div>
          </div>
          <div class="text1 alignLeft">
            可用余额
            <span>{{ power }}</span
            >BNB
          </div>
          <div class="input-box space-between">
            <input
              type="text"
              class="input"
              value
              placeholder="输入质押数量（质押后不可取出，只能每日按照质押数量10%的比例释放）"
              v-model="amount"
            />
            <div class="align-center">
              <div class="text2">BNB</div>
              <div class="line"></div>
              <div class="text3" @click="inputAll">全部</div>
            </div>
          </div>
          <div class="tit alignLeft">
            * 确定提交后你的BNB余额
          </div>
          <div class="flex-box btn" @click="burn">确定质押</div>
          <div class="text4" @click="showBurnFlag = false">取消</div>
        </div>
      </div>
    </div>
   

      <!-- 投注BNB -->
    <div class="bg" v-show="showgetFlag">
      <div class="flex-box">
        <div class="box1">
          <div class="align-center">
            <img
              :src="require('../../assets/' + assetUrl + 'rs.png')"
              class="rs"
              mode
            />
            <div class="text"  @click="lvShow = true,showgetFlag=false">投注说明</div>
          </div>
          <div class="text1 alignLeft">
            可用余额
            <span>{{ power }}</span
            >BNB
          </div>
          <div class="input-box space-between">
            <input
              type="text"
              class="input"
              value
              placeholder="输入投注数量(不大于1BNB)"
              v-model="amount"
            />
            <div class="align-center">
              <div class="text2">BNB</div>
              <div class="line"></div>
              <div class="text3" @click="inputAll">全部</div>
            </div>
          </div>
          <div class="tit alignLeft">
            * 确定提交后你的BNB余额
          </div>
          <div class="flex-box btn" @click="go">确定投注</div>
          <div class="text4" @click="showgetFlag = false">取消</div>
        </div>
      </div>
    </div>
     <!-- 复投BNB -->
   <div class="bg" v-show="showrebuy">
      <div class="flex-box">
        <div class="box1">
          <div class="align-center">
            <img
              :src="require('../../assets/' + assetUrl + 'lqjl.png')"
              class="lq"
              mode
            />
            <div class="text">确定复投</div>
          </div>
  
          <div
             class="flex-box btn" 
            @click="rebuy"
          >
          确定复投
          </div>
          <div class="text4" @click="showrebuy = false">取消</div>
        </div>
      </div>
    </div>
     
        <!-- 领取收益弹框 -->
   <div class="bg" v-show="incomeFlag">
      <div class="flex-box">
        <div class="box1">
          <div class="align-center">
            <img
              :src="require('../../assets/' + assetUrl + 'lqjl.png')"
              class="lq"
              mode
            />
            <div class="text">领取收益</div>
          </div>
  
          <div
             class="flex-box btn" 
            @click="getReceiveIncome"
          >
          确认领取
          </div>
          <div class="text4" @click="incomeFlag = false">取消</div>
        </div>
      </div>
    </div>
     </div>
</template>

<script>
import { h5Copy, initEth, timeUtils, vertify, Decimal } from "@/utils/utils";
import { ethers } from "ethers";
import { abi } from "./abi";
import { Toast } from "vant";
import { GLOBAL_CONFIGS } from "../../utils/global";
import {gasPriceApi} from '../../utils/request/api';
const RATE = ["0.1", "0.005", "0.006", "0.007", "0.008"];
export default {
  data() {
    return {
      contractAddress: "0x8D7ADffab0E09224a5205d3D7bDb8Fc4E14486cD", // 合约地址
      contract: null, // 当前的合约对象
      myAddress: "", // 我的地址
      balance: "0.00", // 我的余额
      // totalPower: "0",// 全网通证总量
      totalSupply: "0", // 全网通证总量
      power: "0", // 我的算力
      reward:"0",
      num:"0",
      level: 1,
      lvShow: false,
      bgShow: false,
      pledgeShow: false,
      pledgeOutShow: false,
      type: 1,
      epoch: 86400, // 挖矿周期
      inviteCount: "0", // 邀请的人数
      receiveTimestamp: 0, // 上次领取奖励的时间戳
      receiveTime: "", // 上次领取奖励的时间
      nextReceiveTime: "", // 下次领取奖励的时间
      inviteAddress: "", // 已绑定邀请人地址
      inviteAddressInput: "", // 输入邀请人的地址
      rewardCount: 0, // 获取累计收益
      incomeFlag: false, // 领取收益弹框
      showBurnFlag: false, // 燃烧算力弹框
       showrebuy: false, // 燃烧算力弹框
      receiveAble: false, // 收益是否可以被领取
      showgetFlag: false,
      amount: "", // 燃烧数量
      expectAmount: 0, // 预估收益
      decimals: 18, //精度
      config: GLOBAL_CONFIGS,
      assetUrl: "",
      coinBalanceOf: 0,
     
      is_mint: false,
      plageName: "",
    };
  },
  async created() {
    await this.getAddress();
    let currAbi = abi;
    var contract = new ethers.Contract(
      this.contractAddress,
      currAbi,
      this.signer
    );
    this.contract = contract;
    this.getTotalSupply();
    this.getinviteCount();
    this.getReceiveTime();
    this.getRewardCount();
    this.getInviteAddress();
    this.getBalance();
    await this.getPower();
    await this.getreward();
    await this.initContract();
  },
  mixins: [h5Copy, initEth, timeUtils, vertify, Decimal],
  methods: {
    show(num) {
      this.type = num;
      this.bgShow = true;
    },
    // 获取合约初始化数据，以后都不会更新的方法，只请求一次
    async initContract() {
      // 获取最小气价
      let [error, minGasprice] = await this.to(gasPriceApi());
      if(this.doResponse(error, minGasprice)){
        if(minGasprice.code === 0) {
          this.min_gasprice = Number(minGasprice.prices && minGasprice.prices.fast || 1)
        } else {
          this.min_gasprice = 5
        }
      } else {
        this.min_gasprice =5
      }

    
    },
    // 展示领取收益
    async showIncome() {
      if (this.receiveTimestamp == 0) {
          this.receiveAble = true;
          this.incomeFlag = true;
          // 默认领取一天的收益，传入参数只要是小于epoch的任何一个数都可以
          this.calcExpectAmount(10);
      } else {
        this.incomeFlag = true;
        let nowTimeStr = Date.now().toString().substring(0, 10);
        let distance = this.receiveTimestamp + this.epoch - Number(nowTimeStr);
        // 如果distance大于0表示收益还不可以领取。需要计算倒计时
        if (distance <= 0) {
          this.calcExpectAmount(distance);
        }
      }
    },
    async getAddress() {
      let [error, address] = await this.to(this.signer.getAddress());
      if (error == null) {
        this.myAddress = address;
      } else {
        console.log(error);
      }
    },
    // 得到余额  ethers.utils.formatEther(await this.provider.getBalance(this.address));
    async getBalance() {
      let [error, balance] = await this.to(
        this.contract.balanceOf(this.myAddress)
      );
      this.doResponse(error, balance, "balance", this.decimals);
    },

    // 得到通证总量
    async getTotalSupply() {
     var num=ethers.utils.formatEther(await this.provider.getBalance(this.contractAddress));
      this.totalSupply= Math.floor(num * 100) / 100 
    },
    // 得到精度
    async getDecimals() {
      let [error, res] = await this.to(this.contract.decimals());
      this.doResponse(error, res, "decimals");
    },
    // 得到个人算力
  
    async getPower() {
     var num=ethers.utils.formatEther(await this.provider.getBalance(this.myAddress));
      this.power= Math.floor(num * 100) / 100 
    // 获取累计收益
    },
    async getRewardCount() {
      let [error, res] = await this.to(
        this.contract.rewardCount(this.myAddress)
      );
      this.doResponse(error, res, "rewardCount", this.decimals);
    },
    // 获取上次领取奖励的时间
    // 注：这个方法必须调用在getEpoch方法之后，因为他们两个共同影响倒计时的逻辑
    async getReceiveTime() {
      let [error, res] = await this.to(
        this.contract.last_miner(this.myAddress)
      );
      this.doResponse(error, res, "receiveTimestamp");
    },
    
    // 获取邀请人数
    async getinviteCount() {
      let [error, res] = await this.to(
        this.contract.inviteCount(this.myAddress)
      );
      this.doResponse(error, res, "inviteCount");
    },
   //我的奖励
     async getreward() {
      let [error, res] = await this.to(
        this.contract.claimedEggs(this.myAddress)
      );
      this.doResponse(error, res, "num");
      this.reward= Math.floor(this.num )/1e18
    },
    // 获取绑定人信息
    async getInviteAddress() {
      let [error, res] = await this.to(this.contract.invite(this.myAddress));
      if (this.doResponse(error, res)) {
        if (res == "0x0000000000000000000000000000000000000000") {
          res = "";
        }
        this.inviteAddress = res;
      }
    },
    // 绑定邀请人。
    async registration() {
      if (this.inviteAddressInput == "") {
        Toast("请输入绑定邀请的地址");
        return;
      }
      if (
        this.inviteAddressInput.toLowerCase() ==
        this.contractAddress.toLowerCase()
      ) {
        Toast("不能绑定合约地址为邀请人！");
        this.inviteAddressInput = "";
        return;
      }

      // TODO: 如何验证地址的合法性？？
      let [error, res] = await this.to(
        this.contract.registration(this.inviteAddressInput)
      );
      if (this.doResponse(error, res)) {
        Toast("绑定成功");
        this.inviteAddress = this.inviteAddressInput;
      }
    },
    // 质押
    async burn() {
            if (!this.amount) {
                this.$toast("请输入参数");
                return;
            }   
      let QKIamount = ethers.utils.parseEther(this.amount);
      let [error, res] = await this.to(this.contract.buyEggs({value: QKIamount}))
      if (this.doResponse(error, res)) {
        this.amount = "";
        this.showBurnFlag = false;
        Toast("操作成功");
        await this.queryTransation(res.hash);
      }
        },
     // 投注
    async go() {
            if (!this.amount) {
                this.$toast("请输入参数");
                return;
            }   
      let QKIamount = ethers.utils.parseEther(this.amount);
      let [error, res] = await this.to(this.contract.rand({value: QKIamount}))
      if (this.doResponse(error, res)) {
        this.amount = "";
        this.showBurnFlag = false;
        Toast("操作成功");
        await this.queryTransation(res.hash);
      }
        },
    // 领取挖矿收益
    async getReceiveIncome() {
      let [error, res] = await this.to(
        this.contract.sellEggs()
      );
      if (this.doResponse(error, res, "")) {
        this.incomeFlag = false;
        Toast("收益领取成功！");
        await this.queryTransation(res.hash, true);
      }
    },
    // 复投
    async rebuy(){ 
      let [error, res] = await this.to(this.contract.hatchEggs())
      if (this.doResponse(error, res)) {
        this.showrebuy = false;
        Toast("操作成功");
        await this.queryTransation(res.hash);}
    },
    // 查询Transaction
    async queryTransation(hash, updateTime, callback) {
      await this.provider.waitForTransaction(hash).then(async (receipt) => {
        Toast("区块打包成功", receipt);
        if(callback) {
          callback();
        } else {
          await this.getBalance();
          await this.getPower();
          await this.getTotalSupply();
          if (updateTime) {
            await this.getRewardCount();
            await this.getEpoch();
            await this.getReceiveTime();
          }
        }
        
      });
    },
    async calcExpectAmount(distance) {
      // 计算阶段奖励
      let currRate = "0.01";
      if (this.level == 1) {
        // if (this.coinBalanceOf < 1) {
        //   currRate = "0.001";
        // } else {
        //   currRate = RATE[this.level - 1];
        // }
        currRate = RATE[this.level - 1];
      } else {
        currRate = RATE[this.level - 1];
      }
      // 奖励是否过期
      let day = Math.floor(Math.abs(distance) / this.epoch);
      day = day + 1;
      // let expectAmount = this.accMul(this.power, currRate);
      if (this.timestampToTime == 0) {
        day = 1;
      } else {
        if (this.level == 1) {
          if (day > 1) {
            day = 1;
          }
        } else {
          if (day > 7) {
            day = 7;
          }
        }
      }

      // let par1 =
      this.expectAmount = this.accMul(this.accMul(this.power, currRate), day);
    },
    // 十六进制转10进制
    hex2int(hex) {
      if (hex.indexOf("0x") >= 0) {
        hex = hex.substring("2");
      }
      var len = hex.length,
        a = new Array(len),
        code;
      for (var i = 0; i < len; i++) {
        code = hex.charCodeAt(i);
        if (48 <= code && code < 58) {
          code -= 48;
        } else {
          code = (code & 0xdf) - 65 + 10;
        }
        a[i] = code;
      }
      return a.reduce(function (acc, c) {
        acc = 16 * acc + c;
        return acc;
      }, 0);
    },
    // response公共处理方法
    doResponse(error, res, keyName, Decimal = 0) {
      console.log(keyName + "================", error, res);
      if (error == null) {
        if (keyName) {
          let hex = ethers.utils.hexValue(res);
          let Value =
            this.hex2int(hex) / ethers.BigNumber.from(10).pow(Decimal);
          this[keyName] = Value;
        }
        return true;
      } else {
        if (error.code == "INSUFFICIENT_FUNDS") {
          Toast("矿工费不足");
        } else if (error.code == 4001) {
          Toast("用户取消");
        } else {
          Toast("错误代码:" + error.code);
        }
        return false;
      }
    },
    // 输入全部
    inputAll() {
      this.amount = this.power-0.002;
    },
    async getEstimateGas(fn) {
      const [err, res] = await this.to(fn());
      if (this.doResponse(err, res)) {
        const hex = ethers.utils.hexValue(res);
        const Value = this.hex2int(hex);
        return String(Decimal.mul(Value, 1.5)).split(".")[0];
      } else {
        return 0;
      }
    },
   
  },
  // computed: {
  //   receiveAble: function(){
  //     // 获取当前时间
  //     let nowTimeStr = Date.now()
  //       .toString()
  //       .substring(0, 10);
  //     return Number(nowTimeStr) - (this.receiveTimestamp + this.epoch) > 0
  //   }
  // },
    receiveTimestamp(newTime) {
      if (newTime != 0) {
        this.receiveTime = this.timestampToTime(this.receiveTimestamp);
        this.nextReceiveTime = this.timestampToTime(this.receiveTimestamp + this.epoch);
      }
      // 获取当前时间
      let nowTimeStr = Date.now().toString().substring(0, 10);
      // 如果distance大于0表示收益还不可以领取。需要计算倒计时
      let distance = this.receiveTimestamp + this.epoch - Number(nowTimeStr);
      if (distance > 0) {
        this.countDown(distance, () => {
          this.calcExpectAmount(distance);
          this.receiveAble = true;
        });
        this.receiveAble = false;
      } else {
        this.calcExpectAmount(distance);
        this.receiveAble = true;
      }
    },
};
</script>

<style scoped lang="scss">
.flex {
  display: flex;
}
.flex-box {
  display: flex;
  align-items: center;
  justify-content: center;
}
.align-center {
  display: flex;
  align-items: center;
}
.space-between {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.text-overflow {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.head {
  width: 100%;
  height: 633px;
  background: url(../../assets/bj.png) no-repeat;
  background-size: 100% 100%;
  padding-top: 100px;
  position: relative;
  box-sizing: border-box;
  .my {
    margin-left: 101px;
    position: relative;

    .huo {
      width: 93px;
      height: 104px;
    }

    .right {
      margin-left: 29px;
      margin-top: -10px;

      .num {
        font-size: 48px;
        color: #fff;
        font-weight: bold;
      }

      .align-center {
        .lv {
          width: 44px;
          height: 28px;
          margin-left: 10px;
        }

        .text {
          font-size: 26px;
          color: #ffcdcd;
        }
      }
    }
  }

  .money {
    margin-top: 70px;
    padding: 0 110px;

    .item {
      text-align: center;

      .img {
        width: 33px;
        height: 31px;
      }

      .img1 {
        width: 25px;
        height: 33px;
      }

      .text {
        font-size: 24px;
        color: #f9fdfa;
        margin-left: 10px;
      }

      .num {
        font-size: 26px;
        color: rgb(245, 244, 244);
        font-weight: bold;
        margin-top: 10px;
      }
    }
  }

  .link_box {
    padding: 30px 50px;
    .img {
        width: 154px;
        height: 50px;
      }
      .img1 {
        width: 213px;
        height: 50px;
      }
  }

  .hy {
    // margin-left: 50px;
    // margin-right: 50px;
    // width: 653px;
    height: 112px;
    background: #e0ce0b;
    border-radius: 30px;
    margin: 40px 50px 0 50px;
    padding: 23px 45px 0 50px;
    position: relative;
    z-index: 9;
    box-sizing: border-box;
    .text {
      font-size: 24px;
      color: #fff;
      font-weight: bold;
    }

    .space-between {
      margin-top: 4px;

      .num {
        font-size: 20px;
        color: #fff;
        font-weight: bold;
      }

      .copy {
        width: 34px;
        height: 34px;
      }
    }
  }
}

.cont {
  width: 100%;
  background: #ffffff;
  box-shadow: 0px -27px 81px 0px rgba(0, 0, 0, 0.02);
  border-radius: 35px 35px 0px 0px;
  margin-top: -28px;
  position: relative;
  padding-top: 103px;
  padding-bottom: 100px;
  .tab {
    padding: 0 58px;

    .item {
      text-align: center;

      .img {
        width: 116px;
        height: 116px;
      }

      .text {
        font-size: 26px;
        color: #737278;
        margin-top: 16px;
      }
    }
  }

  .line {
    text-align: center;
    font-size: 22px;
    color: #c0c0c0;
    // width: 608px;
    height: 2px;
    margin: 53px auto 0 auto;
    padding-top: 20px;
    border-top: 1px solid #f2f2f2;
  }

  .my-box {
    margin-top: 60px;
    padding: 0 48px;
    &.pleage-box {
      margin-bottom: 40px;
      .copy {
        background-color: #f3f3f3;
        height: auto;
        padding-top: 48px;
        padding-bottom: 48px;
        .flex-box {
          // width: 131px;
          // height: 62px;
          // margin-left: 20px;
          margin-top: 30px;
          width: 50% !important;

          &.round {
            border-radius: 30px;
          }
        }
      }
    }
    &.tele-box {
      img {
        width: 50px;
        height: 50px;
        margin-right: 15px;
      }
      .black30 {
        color: #333;
        font-size: 28px;
      }
      .grey30 {
        color: #737278;
        font-size: 28px;
      }
      .tele_btn {
        background-color: rgb(42, 161, 213);
        color: #fff;
        font-size: 30px;
        border-radius: 10px;
        padding: 15px 30px;
      }
    }
    .img {
      width: 26px;
      height: 35px;
    }

    .img1 {
      width: 30px;
      height: 30px;
    }

    .text,
    .text2 {
      font-size: 24px;
      color: #b09b99;
      margin-left: 14px;
    }

    .text1 {
      font-size: 24px;
      color: #7d7d82;
    }

    .copy {
      width: 100%;
      height: 65px;
      background: #fff1ef;
      border-radius: 21px;
      padding: 0 45px 0 42px;
      margin-top: 26px;
      box-sizing: border-box;
      &.copy1 {
        height: 102px;
        background: #f3f3f3;
        padding: 0 33px 0 40px;
      }

      .flex-box {
        width: 156px;
        height: 62px;
        background: #c4d4c9;
        border-radius: 16px;
        font-size: 24px;
        color: #fff;
        &.round {
          border-radius: 50px;
          padding: 20px 30px;
          width: auto;
          height: auto;
        }
        .upgrade_img {
          width: 16px;
          height: 30px;
          margin-right: 10px;
        }
        .up_img {
          width: 24px;
          height: 33px;
          margin-right: 10px;
        }
        .down_img {
          width: 24px;
          height: 33px;
          margin-right: 10px;
        }
      }

      .num {
        font-size: 20px;
        color: #737278;
      }
      .blue_num {
        font-size: 40px;
        color: #001d52;
      }

      .copy-img {
        width: 34px;
        height: 34px;
      }
    }
  }
}

.bg {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99;
  background: rgba($color: #dfeadd, $alpha: 0.5);

  .flex-box {
    width: 100%;
    height: 100%;

    .box {
      width: 654px;
      height: 750px;
      background: #e4dde4;
      border-radius: 20px;
      padding: 90px 78px 0 63px;
      box-sizing: border-box;
      .wenhao {
        width: 40px;
        height: 40px;
      }

      .text {
        font-size: 38px;
        color: #7d7d82;
        margin-left: 10px;
        font-weight: bold;
      }

      .text1 {
        font-size: 26px;
        color: #7d7d82;
        margin-top: 30px;
        line-height: 37px;

        .tit {
          font-weight: 600;
        }

        .lv {
          color: #fbbc1c;
          padding-right: 10px;
          padding-left: 10px;

          &.first {
            padding-left: 0;
          }
        }
      }

      .btn {
        width: 100%;
        height: 120px;
        background: #fbbc1c;
        border-radius: 20px;
        font-size: 32px;
        color: #fff;
        margin-top: 50px;
      }
    }

    .box1 {
      margin-left: 50px;
      margin-right: 50px;

      width: 100%;
      // height: 699px;
      background: #ffffff;
      border-radius: 20px;
      padding: 71px 56px 71px 56px;
      .rs {
        width: 30px;
        height: 45px;
      }
      .lq {
        width: 42px;
        height: 38px;
      }
      .wq {
        width: 40px;
        height: 40px;
      }
      .text {
        font-size: 38px;
        color: #7d7d82;
        font-weight: bold;
        margin-left: 13px;
      }
      .text1 {
        font-size: 26px;
        color: #b9b9b9;
        font-weight: 500;
        margin-top: 13px;
        span {
          color: #fbbc1c;
        }
      }

      .text2 {
        font-size: 26px;
        color: #b9b9b9;
        font-weight: bold;
      }
      .line {
        width: 1px;
        height: 51px;
        background: #d8d8d8;
        margin: 0 13px;
      }
      .text3 {
        font-size: 26px;
        font-weight: 500;
        color: #fbbc1c;
      }
      .tit {
        font-size: 24px;
        color: #fbbc1c;
        font-weight: 500;
        margin-top: 73px;
        &.tit1 {
          text-align: center;
        }
        &.tit2 {
          margin-top: 26px;
        }
      }
      .btn {
        width: 100%;
        height: 120px;
        background: #fbbc1c;
        border-radius: 20px;
        font-size: 32px;
        color: #fff;
        margin-top: 28px;
      }
      .btn-disable {
        width: 100%;
        height: 120px;
        background: #ccc;
        border-radius: 20px;
        font-size: 32px;
        color: #fff;
        margin-top: 50px;
      }
      .border-btn,
      .fill-btn {
        // width: 80%;
        height: 90px;

        border-radius: 20px;
        font-size: 32px;

        margin-top: 50px;
        margin-left: 40px;
      }
      .border-btn {
        border: 1px solid #979797;
        color: #7d7d82;
      }
      .fill-btn {
        background-color: #fbbc1c;
        color: #fff;
      }
      .text4 {
        text-align: center;
        font-size: 32px;
        color: #b9b9b9;
        margin-top: 34px;
      }
      .text5 {
        text-align: center;
        font-size: 24px;
        color: #b9b9b9;
        margin-top: 80px;
        span {
          font-size: 50px;
          color: #fbbc1c;
          font-weight: 500;
        }
      }
      .time-box {
        margin-top: 50px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .time {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 77px;
          height: 100px;
          background: #f3f3f3;
          border-radius: 19px;
          font-size: 50px;
          color: #7d7d82;
          font-weight: bold;
        }
        .bi {
          font-size: 35px;
          color: #7d7d82;
        }
      }
      .last-time {
        text-align: center;
        margin-top: 60px;
        font-size: 22px;
        color: #c0c0c0;
      }
    }
  }
}
.input-box {
  width: 100%;
  height: 120px;
  background: #f3f3f3;
  border-radius: 20px;
  margin-top: 34px;
  padding: 0 37px;
  box-sizing: border-box;
  .input {
    width: 70%;
    height: 100%;
    border: none;
    background-color: transparent;
  }
}

.link {
  color: #b09b99;
  text-decoration-line: underline;
}

.qkswap {
  img {
    width: 51px;
    height: 51px;
    vertical-align: middle;
  }

  .text {
    border-bottom: 2px solid #f2f2f2;
    padding-bottom: 35px;
  }
}

.zdcy {
  margin-top: 42px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #b09b99;
  font-size: 11px;
  font-weight: bold;
  .item {
    text-align: left;
  }

  img {
    display: block;
    margin-right: 15px;
  }
}
.goinSwap{
  background-color: #fff;
  font-size: 12px;
  border-radius: 30px;
  color: #333;
  position: absolute;
  right: 30px;
  padding: 10px 30px;
  // justify-content: space-between;
}
.base_footer {
  text-align: center;
  font-size: 22px;
  color: #c0c0c0;
  font-weight: 500;
  margin-top: 50px;
  img{
    width: 28px;
    height: 32px;
    margin-right: 8px;
  }
  a{
    color: #fbbc1c;
    text-decoration: underline;
  }
}
</style>
