<script>
export default {
  name: 'MenuItem',
  functional: true,
  props: {
    icon: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    }
  },
  render(h, context) {
    const { icon, title } = context.props;
    const vnodes = [];

    const testIcon = icon.trim();
    // iconfont
    const CStatus = /^c-/.test(testIcon);
    // elementFont
    const EStatus = /^cIcon/.test(testIcon);

    if (CStatus || EStatus) {
      vnodes.push(<i class={icon}/>);
    } else if (icon) {
      vnodes.push(<svg-icon icon-class={icon}/>);
    }

    if (title) {
      vnodes.push(<span slot='title'>{(title)}</span>);
    }
    // console.log(vnodes,'vnodes')
    return vnodes;
  }
};
</script>
