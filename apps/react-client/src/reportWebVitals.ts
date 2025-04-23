import { onCLS, onLCP, onINP, onTTFB, onFCP } from 'web-vitals';

const reportWebVitals = () => {
  onCLS(metric => console.log('CLS', metric));
  onLCP(metric => console.log('LCP', metric));
  onINP(metric => console.log('INP', metric));
  onTTFB(metric => console.log('TTFB', metric));
  onFCP(metric => console.log('FCP', metric));
};

export default reportWebVitals;
