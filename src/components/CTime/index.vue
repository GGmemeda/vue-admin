<template>
  <div class="recent-time-choose">
    <el-radio-group  v-model="currentValue" size="medium">
      <el-radio-button label="1">今日</el-radio-button>
      <el-radio-button label="2">昨日</el-radio-button>
      <el-radio-button label="7">近7日</el-radio-button>
      <el-radio-button label="30">近30日</el-radio-button>
      <el-radio-button label="0">自定义</el-radio-button>
    </el-radio-group>
    <el-date-picker
      v-if="this.currentValue==='0'"
      size="medium"
      class="time-range"
      :type="'datetimerange'"
      :range-separator="'-'"
      :start-placeholder="'开始时间'"
      :end-placeholder="'结束时间'"
      v-model="otherTime"
    >
    </el-date-picker>
  </div>
</template>

<script>
  import moment from 'moment';

  export default {
    name: 'CTime',
    data () {
      return {
        currentValue: this.value === undefined || this.value === null
          ? ''
          : this.value,
        otherTime: []
      };
    },
    props: {
      value: String
    },
    mounted () {
      if (this.value) {
        this.getTime();
      }
    },
    methods: {
      getTime () {
        const currentTime = [];
        switch (this.currentValue) {
          case '1':
            currentTime[0] = moment().startOf('day').format('YYYY-MM-DD HH:mm:ss');
            currentTime[1] = moment().endOf('day').format('YYYY-MM-DD HH:mm:ss');
            break;
          case '2':
            currentTime[0] = moment().subtract(1, 'day').startOf('day').format('YYYY-MM-DD HH:mm:ss');
            currentTime[1] = moment().subtract(1, 'day').endOf('day').format('YYYY-MM-DD HH:mm:ss');
            break;
          case '7':
            currentTime[0] = moment().subtract(7, 'day').startOf('day').format('YYYY-MM-DD HH:mm:ss');
            currentTime[1] = moment().subtract(1, 'day').endOf('day').format('YYYY-MM-DD HH:mm:ss');
            break;
          case '30':
            currentTime[0] = moment().subtract(30, 'day').startOf('day').format('YYYY-MM-DD HH:mm:ss');
            currentTime[1] = moment().subtract(1, 'day').endOf('day').format('YYYY-MM-DD HH:mm:ss');
            break;
          case '0':
            return;
        }
        this.choosedTime = currentTime;
        this.$emit('change', this.choosedTime);
      }
    },
    watch: {
      value (val) {
        this.currentValue = this.value;
      },
      currentValue(){
        this.getTime();
        this.$emit('input', this.currentValue);
      },
      otherTime: {
        handler (val) {
          if (this.currentValue === '0') {
            this.choosedTime[0] = moment(val[0]).format('YYYY-MM-DD HH:mm:ss');
            this.choosedTime[1] = moment(val[1]).format('YYYY-MM-DD HH:mm:ss');
            this.$emit('change', this.choosedTime);
          }
        },
        deep: true
      }
    }
  };
</script>

<style scoped rel="stylesheet/scss" lang="scss">
  .recent-time-choose {
    display: inline-block;
    .time-range {
      margin-left: 15px;
      vertical-align: bottom;
    }
  }
</style>
