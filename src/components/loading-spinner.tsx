export default function LoadingSpinner() {
  return (
    <main className="container-black flex min-h-dvh items-center justify-center p-4">
      <div className="flex flex-col items-center gap-4">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
        <div className="text-white">Loading...</div>
      </div>
    </main>
  );
}
