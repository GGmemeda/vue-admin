/**
 * vue directive 钩子函数：
 * 1.bind：只调用一次
 * 2.inserted：被绑定元素插入父节点时调用。
 * 3.update：所在组件的 VNode 更新时调用，但是可能发生在其子 VNode 更新之前。
 * 4.componentUpdated：指令所在组件的 VNode 及其子 VNode 全部更新后调用。
 * 5.unbind：只调用一次，指令与元素解绑时调用。
 * @param Vue
 * @param options
 */
export default (Vue, options = {}) => {
  if (!Array.prototype.remove) {
    Array.prototype.remove = function (item) {
      if (!this.length) return;
      const index = this.indexOf(item);
      if (index > -1) {
        this.splice(index, 1);
        return this;
      }
    };
  }
  const init = {
    lazyLoad: false,
    default: 'https://gw.alicdn.com/tps/i1/TB147JCLFXXXXc1XVXXxGsw1VXX-112-168.png'
  };

  const listenList = [];
  const imageCacheList = [];

  const isAlreadyLoad = (imageSrc) => {
    if (imageCacheList.indexOf(imageSrc) > -1) {
      return true;
    } else {
      return false;
    }
  };
  const isCanShow = (item) => {
    const ele = item.ele;
    const src = item.src;
    const top = ele.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;
    if (top + 10 < windowHeight) {
      const image = new Image();
      image.src = src;
      image.onload = function () {
        ele.src = src;
        imageCacheList.push(src);
        listenList.remove(item);
      };
      return true;
    } else {
      return false;
    }
  };

  const onListenScroll = () => {
    window.addEventListener('scroll', function () {
      const length = listenList.length;
      for (let i = 0; i < length; i++) {
        isCanShow(listenList[i]);
      }
    });
  };
  const addListener = (ele, binding) => {
    const imageSrc = binding.value;
    if (isAlreadyLoad(imageSrc)) {
      ele.src = imageSrc;
      return false;
    }
    const item = {
      ele: ele,
      src: imageSrc
    };
    ele.src = init.default;
    if (isCanShow(item)) {
      return;
    }
    listenList.push(item);

    onListenScroll();
  };

  Vue.directive('lazyload', {
    inserted: addListener,
    updated: addListener
  });
};
