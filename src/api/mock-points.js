const _points = [
  [104.082738, 30.583388],
  [104.069187, 30.680394],
  [104.091896, 30.673075]
];

export default {
  getPoints (cb) {
    setTimeout(() => cb(_points), 100);
  }
};
