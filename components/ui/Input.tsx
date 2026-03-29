import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className = '', label, error, ...props }, ref) => {
    return (
      <div className="w-full flex flex-col gap-1.5">
        {label && <label className="text-sm font-medium text-slate-300">{label}</label>}
        <input
          ref={ref}
          className={`w-full bg-slate-900 border ${
            error ? 'border-red-500/50 focus:border-red-500 rounded-xl' : 'border-slate-800 focus:border-indigo-500 rounded-xl'
          } px-4 py-2.5 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-1 ${
            error ? 'focus:ring-red-500/50' : 'focus:ring-indigo-500/50'
          } transition-all ${className}`}
          {...props}
        />
        {error && <span className="text-xs text-red-500 mt-1">{error}</span>}
      </div>
    );
  }
);

Input.displayName = 'Input';
