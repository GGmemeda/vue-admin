export default {
  props: {
    value: [String, Number]
  },
  render(h, context) {
    const inputEvents = Object.assign({}, this.$listeners);
    delete inputEvents.onSearch;
    const props = Object.assign({}, this.$attrs, { value: this.currentValue });
    console.log(props);
    return h(
      'div', {
        class: 'c-input'
      },
      [h('el-input', {
        class: 'c-input-inline',
        props: {
          attrs: props,
          value: this.currentValue,
          ...this.$attrs
        },
        on: { ...inputEvents }
      }, Object.keys(this.$slots).map(item => {
        return h('template', {
          slot: item
        }, [this.$slots[item]]);
      }))
      ]
    );
  },
  data() {
    return {
      currentValue: this.value === undefined || this.value === null
        ? ''
        : this.value
    };
  },
  watch: {
    value() { this.currentValue = this.value; }
  }
};
