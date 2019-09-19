
export const allModelKeys = ['xMin', 'xMax', 'yMin', 'yMax'];

export function modelKeys(horizontal) {
  return horizontal ? allModelKeys.slice(0, 2) : allModelKeys.slice(2);
}

export function isSameArray(a, b) {
  return a.length === b.length && a.every((v, i) => v === b[i]);
}

export function commonDataLimits(isHorizontal, extraCallback, ignoreIdCheck) {
  const chart = this.chart;
  const matchID = (meta) => isHorizontal ? meta.xAxisID === this.id : meta.yAxisID === this.id;

  // First Calculate the range
  this.min = null;
  this.max = null;

  const [minKey, maxKey] = modelKeys(isHorizontal);

  // Regular charts use x, y values
  // For the boxplot chart we have rawValue.min and rawValue.max for each point
  chart.data.datasets.forEach((d, i) => {
    const meta = chart.getDatasetMeta(i);
    if (!chart.isDatasetVisible(i) || (!ignoreIdCheck && !matchID(meta))) {
      return;
    }
    d.data.forEach((rawValue, j) => {
      const value = this.getRightValue(rawValue);
      if (isNaN(value) || meta.data[j].hidden) {
        return;
      }
      const vMin = typeof rawValue[minKey] === 'number' ? rawValue[minKey] : value;
      const vMax = typeof rawValue[maxKey] === 'number' ? rawValue[maxKey] : value;

      if (!isNaN(vMin) && (this.min === null || vMin < this.min)) {
        this.min = vMin;
      }

      if (!isNaN(vMax) && (this.max === null || vMax > this.max)) {
        this.max = vMax;
      }

      if (extraCallback) {
        extraCallback(rawValue, isHorizontal);
      }
    });
  });

  if (this.min == null) {
    this.min = 0;
  }
  if (this.max == null) {
    this.max = 0;
  }
}