/**
 * Function define to format metrics data
 * @param {data} from /metrics endpoint
 * @returns metrics in a format
 * TODO : not used anywhre in the application for now
 */
export const parseMetrics = (data) => {
  const lines = data.split('\n');
  const metrics = {};
  lines.forEach((line) => {
    const match = line.match(/^([\w_]+){(.*)} (\d+)$/);
    if (match) {
      const [metricName, labels, value] = match;
      metrics[metricName] = { labels, value };
    }
  });
  return metrics;
}