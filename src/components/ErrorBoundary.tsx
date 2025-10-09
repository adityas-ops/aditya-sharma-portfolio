import { Component, type ErrorInfo, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
    console.log('🛡️ ErrorBoundary initialized');
  }

  static getDerivedStateFromError(error: Error): State {
    console.error('🚨 ErrorBoundary caught an error:', error);
    // Update state so the next render will show the fallback UI
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log the error to console for debugging
    console.error('🚨 ErrorBoundary caught an error:', error, errorInfo);
    console.error('📍 Error stack:', error.stack);
    console.error('📍 Component stack:', errorInfo.componentStack);
    
    // Clear problematic storage on error
    try {
      console.log('🧹 Clearing storage due to error...');
      localStorage.removeItem('visited');
      sessionStorage.removeItem('visited');
      console.log('✅ Storage cleared');
    } catch (e) {
      console.error('❌ Failed to clear storage:', e);
    }
  }

  render() {
    if (this.state.hasError) {
      console.log('🚨 Rendering error fallback UI');
      // You can render any custom fallback UI
      return this.props.fallback || (
        <div className="w-full h-full flex flex-col justify-center items-center bg-[#020C1B] text-white">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4 text-[#64ffda]">Something went wrong</h2>
            <p className="text-gray-400 mb-6">We're working to fix this issue.</p>
            <div className="mb-4 p-4 bg-gray-800 rounded text-sm text-left max-w-md">
              <p className="text-red-400 mb-2">Error Details:</p>
              <p className="text-gray-300 break-all">{this.state.error?.message}</p>
            </div>
            <button
              onClick={() => {
                console.log('🔄 User clicked refresh button');
                // Clear all storage and reload
                localStorage.clear();
                sessionStorage.clear();
                window.location.reload();
              }}
              className="px-6 py-2 bg-[#64ffda] text-[#020C1B] rounded hover:bg-[#4fd1c7] transition-colors"
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }

    console.log('✅ ErrorBoundary rendering children normally');
    return this.props.children;
  }
}

export default ErrorBoundary;
