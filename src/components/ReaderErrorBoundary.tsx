import { Component, type ErrorInfo, type ReactNode } from 'react';
import { AlertTriangle, ArrowLeft, RefreshCw } from 'lucide-react';

interface Props {
  children: ReactNode;
  onReset?: () => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ReaderErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('[ReaderErrorBoundary] Uncaught reader error:', error, errorInfo);
  }

  private handleGoBack = () => {
    this.setState({ hasError: false, error: null });
    if (this.props.onReset) {
      this.props.onReset();
    }
  };

  private handleReload = () => {
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="fixed inset-0 z-50 bg-[#121316] text-[#f3f4f6] flex flex-col items-center justify-center p-6 text-center select-none">
          <div className="w-16 h-16 rounded-3xl bg-zinc-800/80 border border-zinc-700/80 flex items-center justify-center mb-5 text-amber-400 shadow-2xl">
            <AlertTriangle className="w-8 h-8" />
          </div>

          <h2 className="text-xl font-bold mb-2 text-white">
            No se pudo mostrar el contenido
          </h2>

          <p className="text-xs text-zinc-400 max-w-sm mb-6 leading-relaxed">
            Ocurrió un error inesperado al procesar este archivo. Puedes volver a la biblioteca o intentar abrirlo de nuevo.
          </p>

          {this.state.error && (
            <div className="w-full max-w-md bg-zinc-900/90 border border-zinc-800 rounded-2xl p-3 mb-6 text-left overflow-auto max-h-32 text-[11px] font-mono text-zinc-400">
              <span className="text-rose-400 font-semibold">Detalle:</span> {this.state.error.message || String(this.state.error)}
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-3 w-full max-w-xs">
            <button
              onClick={this.handleGoBack}
              className="flex-1 flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-zinc-700 hover:bg-zinc-600 text-white font-semibold text-xs transition-colors shadow-lg cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Volver a la Biblioteca</span>
            </button>

            <button
              onClick={this.handleReload}
              className="flex items-center justify-center gap-2 px-4 py-3 rounded-2xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-medium text-xs transition-colors border border-zinc-700 cursor-pointer"
              title="Recargar aplicación"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
