export default function Spinner({ label = "Loading..." }) {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center gap-3">
      <span className="loading loading-spinner loading-lg text-primary"></span>
      <p className="text-sm opacity-70">{label}</p>
    </div>
  );
}