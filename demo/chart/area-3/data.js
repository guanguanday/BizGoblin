export const data = [
  {
    month: 'Jan.',
    value: 6.06
  }, {
    month: 'Feb.',
    value: 82.2
  }, {
    month: 'Mar.',
    value: -22.11
  }, {
    month: 'Apr.',
    value: 21.53
  }, {
    month: 'May.',
    value: -21.74
  }, {
    month: 'Jun.',
    value: 73.61
  }, {
    month: 'Jul.',
    value: 53.75
  }, {
    month: 'Aug.',
    value: 60.32
  }
];

export const defs = [
  {
    dataKey: 'month',
    range: [0, 1]
  }, {
    dataKey: 'value',
    nice: false,
    min: -100,
    max: 100,
    tickCount: 5
  }
]