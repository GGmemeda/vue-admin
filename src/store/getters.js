/**
 * 全局getter
 * @param state
 */

export const allChange = state => {
  return state.mapCenter.all.map((item) => {
    return {
      title: '坐标哦',
      top: item[0]
    };
  });
};
