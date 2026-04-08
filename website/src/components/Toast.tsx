"use client";

type ToastProps = {
  message: string | null;
  visible: boolean;
};

export default function Toast({ message, visible }: ToastProps) {
  return (
    <div
      className={`pointer-events-none fixed bottom-4 left-1/2 z-50 w-[calc(100%-2rem)] max-w-sm -translate-x-1/2 transform rounded-full border border-white/20 bg-brand-brown px-5 py-3 text-center text-sm font-medium text-white shadow-soft transition-all duration-300 sm:bottom-6 ${
        visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
      }`}
      role="status"
      aria-live="polite"
    >
      {message}
    </div>
  );
}
