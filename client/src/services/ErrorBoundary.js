import React from 'react';

// Catch para cualquier tipo de errores
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div>
          <h1>Error, Dog Not Found </h1>
          <img src="/imagenes/sorryDog.jpg" alt="imagen de fondo" />
          <h2>Please refresh the page</h2>
        </div>
      );
    }

    return this.props.children; 
  }
}

export default ErrorBoundary;
