<template>
  <div class="v-code">
    <input
      ref="vcode"
      id="vcode"
      type="tel"
      maxlength="6"
      v-model="code"
      @focus="focused = true"
      @blur="focused = false"
      :disabled="telDisabled">

    <label
      for="vcode"
      class="line"
      v-for="item,index in codeLength"
      :class="{'animated': focused && cursorIndex === index}"
      v-text="codeArr[index]"
    >
    </label>
  </div>
</template>

<script>
  export default {
    name: 'downNumber',
    data () {
      return {
        code: '',
        codeLength: 6,
        telDisabled: false,
        focused: false
      };
    },
    computed: {
      codeArr () {
        return this.code.split('');
      },
      cursorIndex () {
        return this.code.length;
      }
    },
    watch: {
      code (newVal) {
        this.code = newVal.replace(/[^\d]/g, '');
        if (newVal.length > 5) {
          // this.telDisabled = true
          this.$refs.vcode.blur();
          setTimeout(() => {
            alert(`vcode: ${this.code}`);
          }, 500);
        }
      }
    }
  };
</script>

<style scoped>
  .v-code {
    margin-top: 20px;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    position: relative;
    width: 280px;
    margin-left: auto;
    margin-right: auto;
  }

  .v-code input {
    position: absolute;
    top: -100%;
    left: -666666px;
    opacity: 0;
  }

  .v-code .line {
    position: relative;
    width: 40px;
    height: 32px;
    line-height: 32px;
    text-align: center;
    font-size: 28px;
  }

  .v-code .line::after {
    display: block;
    position: absolute;
    content: '';
    left: 0;
    width: 100%;
    bottom: 0;
    height: 1px;
    background-color: #aaaaaa;
    transform: scaleY(.5);
    transform-origin: 0 100%;
  }

  .v-code .line.animated::before {
    display: block;
    position: absolute;
    left: 50%;
    top: 20%;
    width: 1px;
    height: 60%;
    content: '';
    background-color: #333333;
    animation-name: coruscate;
    animation-duration: 1s;
    animation-iteration-count: infinite;
    animation-fill-mode: both;
  }
</style>
