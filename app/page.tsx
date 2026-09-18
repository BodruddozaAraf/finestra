export default function Home() {
  return (
    <main className="mx-auto flex min-h-[100dvh] max-w-2xl flex-col justify-center gap-4 px-6">
      <h1 className="text-3xl font-semibold tracking-tight">Finestra prototypes</h1>
      <p className="text-neutral-600">
        Shared scaffold. Each design concept lives on its own branch:
        <code className="mx-1">prototype-1</code>,
        <code className="mx-1">prototype-2</code>,
        <code className="mx-1">prototype-3</code>.
      </p>
    </main>
  );
}
