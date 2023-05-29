<template>
  <div id="bg-container">
    <van-button round type="info" id="apply" @click="dialogShow = true">去抽奖</van-button>
    <van-button round type="info" id="start" @click="dialogShow = true">去抽奖</van-button>
    <van-dialog v-model="dialogShow" title="提交信息" :show-confirm-button="false">
      <van-form @submit="onSubmit" id="userForm">
        <van-field
            v-model="userInfo.name"
            name="name"
            label="姓名"
            :rules="[{ required: true, message: '请填写姓名' }]"
        />
        <van-field name="sex" label="性别">
          <template #input>
            <van-radio-group v-model="userInfo.sex" direction="horizontal">
              <van-radio name="1">男</van-radio>
              <van-radio name="2">女</van-radio>
            </van-radio-group>
          </template>
        </van-field>
        <van-field
            v-model="userInfo.nianji"
            name="nianji"
            label="年级"
            :rules="[{ required: true, message: '请填写年级' }]"
        />
        <van-field
            v-model="userInfo.banji"
            name="banji"
            label="班级"
            :rules="[{ required: true, message: '请填写班级' }]"
        />
        <van-field
            v-model="userInfo.phone"
            type="tel"
            label="手机号"
            name="phone"
            :rules="[
            { required: true, message: '请填写手机号' },
            { pattern: /^1[3-9][0-9]{9}$/, message: '手机号格式有误' },
          ]"
        />
        <div>
          <van-button class="dialog-btn" round @click.prevent="dialogShow = false">取消</van-button>
          <van-button class="dialog-btn" round type="info" native-type="submit"
          >提交抽奖
          </van-button>
        </div>
      </van-form>
    </van-dialog>
    <!--    查询获奖记录-填写手机号界面-->
    <van-dialog v-model="queryPhoneShow" title="查询获奖信息" :show-confirm-button="false">
      <van-field
          v-model="phone"
          type="tel"
          label="手机号"
          name="phone"
          :rules="[
            { required: true, message: '请填写手机号' },
            { pattern: /^1[3-9][0-9]{9}$/, message: '手机号格式有误' },
          ]"
      />
      <div>
        <van-button class="dialog-btn" round @click.prevent="queryPhoneShow = false">取消</van-button>
        <van-button class="dialog-btn" round type="info"
                    @click="userInfo.phone = phone;queryPhoneShow = false;queryInfo();">
          确认
        </van-button>
      </div>
    </van-dialog>
    <span class="tips" id="activity-rule" @click="ruleShow = true">活动规则</span>
    <span class="tips" id="awards" @click="showAwards()">获奖记录</span>

    <van-popup
        v-model="ruleShow"
        round
        closeable
        position="bottom"
        class="pop-tips"
        style="white-space: pre-wrap"
    >
      <div style="font-weight: bold">线上抽奖，来参观学校即可领奖，元贞陪你过六一</div>
      <div style="font-weight: bold">奖品如下：</div>
      <div>一等奖：iPad</div>
      <div>二等奖：拍立得。</div>
      <div>三等奖：可托运行李箱。</div>
      <div>四等奖：保温杯。</div>
      <div>五等奖：小风扇/泡泡机/娃哈哈一排/晴雨两用伞</div>
      <div>参与奖：速记手册/笔记本套盒纪念品</div>
      <div><span style="font-weight: bold">活动时间：</span>2023.5.26-2023.6.4</div>
      <div><span style="font-weight: bold">兑奖日期：</span>抽奖后一周内凭中奖截图和学生证领取对应奖品，过期无效</div>
      <div>实名认证每人只能兑换一次奖品</div>
    </van-popup>
    <van-popup v-model="awardsShow" round closeable class="pop-tips" style="white-space: pre-wrap">
      <div>
        姓名：<span>{{ userInfo.name }}</span>
      </div>
      <div>
        年级：<span>{{ userInfo.nianji }}</span>
      </div>
      <div>
        班级：<span>{{ userInfo.banji }}</span>
      </div>
      <div>
        电话：<span>{{ userInfo.phone }}</span>
      </div>
      <div>
        获得奖品：<span>{{ awards.join(',') }} </span>
      </div>
    </van-popup>
  </div>
</template>

<script>
import {defineComponent} from 'vue';
import axios from 'axios';
import {Dialog} from 'vant';

export default defineComponent({
  name: 'MainComponent',
  data() {
    return {
      phone: '',
      dialogShow: false,
      ruleShow: false,
      awardsShow: false,
      queryPhoneShow: false,
      userInfo: {
        name: '',
        sex: '',
        phone: '17878787878',
        nianji: '',
        banji: '',
        lottery: '',
        lotteryList: [],
      },
      awardsMap: {
        '1': '一等奖',
        '2': '二等奖',
        '3': '三等奖',
        '4': '四等奖',
        '5': '五等奖',
        '6': '参与奖',
      },
    };
  },
  computed: {
    awards() {
      return this.userInfo.lotteryList.map((value) => this.awardsMap[value]);
    },
  },
  methods: {
    onSubmit(values) {
      this.dialogShow = false;
      console.log('submit', values);
      axios.post('http://123.57.0.23:8090/user/save', values)
          .then((response) => {
            if (response.data.code === 1) {
              localStorage.setItem('phone', this.userInfo.phone);
              Dialog({message: '恭喜你获得了' + this.awardsMap[response.data.data]});
            } else {
              Dialog({message: response.data.msg});
            }
          })
          .catch((error) => {
            Dialog({message: '很遗憾，你没有中奖，明天再来试试吧~'});
            console.log(error);
          });
    },
    queryInfo() {
      console.log('initInfo this.userInfo.phone', this.userInfo.phone);
      axios.get('http://123.57.0.23:8090/user/query?phone=' + this.userInfo.phone)
          .then((response) => {
            console.log(response.data);
            if (response.data.code === 1) {
              Object.keys(response.data.data).forEach((key) => {
                this.$set(this.userInfo, key, response.data.data[key]);
              });
              localStorage.setItem('phone', this.userInfo.phone);
              this.awardsShow = true;
            } else {
              Dialog({message: response.data.msg});
            }
          });
    },
    showAwards() {
      if (this.userInfo.phone === '') {
        // 在新的面板里调用initInfo
        this.queryPhoneShow = true;
      } else {
        this.queryInfo();
      }

    },
  },
  mounted() {
    console.log(localStorage.getItem('phone'));
    this.userInfo.phone = localStorage.getItem('phone') || '';
    console.log('mounted');
  },
});
</script>

<style scoped>
#bg-container {
  position: relative;
  background-image: url('../assets/apply.jpg'), url('../assets/prize.jpg');
  background-repeat: no-repeat;
  background-position: top, bottom;
  background-size: 100% 100vh;
  height: 200vh;
}


.tips {
  position: absolute;
  width: 4rem;
  font-size: 13px;
  text-align: center;
  background-color: rgba(222, 225, 230, 0.7);
  border-radius: 10px;
}

#activity-rule {
  top: 2vh;
  right: 22vw;
}

#awards {
  top: 2vh;
  right: 3vw;
}

.pop-tips {
  padding: 4vh 5vw;
  font-size: 14px;
  line-height: 1.6;
}

div span {
  font-size: 12px;
}

#start {
  position: absolute;
  left: 35vw;
  top: 85vh;
  width: 30vw;
  background-color: #849acf;
  border-color: #849acf;
}

#apply {
  opacity: 0;
  position: absolute;
  left: 10vw;
  top: 32vh;
  width: 35vw;
  height: 10vh;
  background-color: #849acf;
  border-color: #849acf;
}

.dialog-btn {
  width: 30vw;
  margin: 3vw;
}
</style>
