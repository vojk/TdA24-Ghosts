export default function ErrorPage() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4">
      <h1 className="font-display text-4xl text-white">Tudy cesta nevede...</h1>
      <p className="text-lg text-white/80">Chybička se vloudila.</p>
      <a href="/lecturers" className="rounded-md bg-primary px-6 py-2 font-semibold text-primary-foreground">
        Do bezpečné zóny
      </a>
    </div>
  );
}
