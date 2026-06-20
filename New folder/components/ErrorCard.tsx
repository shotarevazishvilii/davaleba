interface ErrorCardProps {
  onReset: () => void;
  errorMessage: string;
}

const ErrorCard = ({ errorMessage, onReset }: ErrorCardProps) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 bg-[#2a1a1a] rounded-2xl border-2 border-red-900/50 max-w-md mx-auto my-10 text-center shadow-[0_0_30px_rgba(220,38,38,0.15)]">
      <div className="mb-4 w-12 h-12 rounded-full bg-red-600/20 border border-red-500/40 flex items-center justify-center">
        <span className="text-red-500 font-bold text-2xl">!</span>
      </div>

      <h2 className="text-red-500 font-bold text-xl mb-2 tracking-tight">
        Something went wrong
      </h2>

      <p className="text-red-200/60 text-sm mb-6 leading-relaxed">
        {errorMessage}
      </p>

      <button
        onClick={onReset}
        className="bg-red-600 hover:bg-red-500 text-white px-8 py-2.5 rounded-full font-semibold transition-all active:scale-95 shadow-lg shadow-red-900/20"
      >
        Try Again
      </button>
    </div>
  );
};

export default ErrorCard;
