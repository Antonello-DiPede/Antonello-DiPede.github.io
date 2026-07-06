export default function BackgroundBlobs() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10" aria-hidden="true">
      <div
        className="blob-a absolute -top-24 -left-16 w-[26rem] h-[26rem] rounded-full blur-3xl saturate-150"
        style={{ background: 'radial-gradient(circle, var(--glow-amber-blob), transparent 70%)' }}
      />
      <div
        className="blob-b absolute top-6 -right-24 w-[30rem] h-[30rem] rounded-full blur-3xl saturate-150"
        style={{ background: 'radial-gradient(circle, var(--glow-steel), transparent 70%)' }}
      />
      <div
        className="blob-c absolute bottom-[-8rem] left-1/3 w-96 h-96 rounded-full blur-3xl saturate-150"
        style={{ background: 'radial-gradient(circle, var(--glow-violet), transparent 70%)' }}
      />
    </div>
  );
}
