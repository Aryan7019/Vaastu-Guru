import { memo } from 'react';

const LoadingSpinner = memo(() => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="animate-spin rounded-full h-16 w-16 border-4 border-orange-200 border-t-orange-500" />
  </div>
));

export default LoadingSpinner;
