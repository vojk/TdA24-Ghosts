export default function ErrorPage() {
  return (
    <div className="h-full w-full flex flex-col justify-center items-center">
      <h1 className="text-white font-nadpis text-5xl">Tudy cesta nevede...</h1>
      <p className="text-white font-nadpis text-4xl">Chybička se vloudila.</p>
      <a href="/lecturers" className="text-jet font-bold mt-5 py-2 px-6 bg-sunglow rounded-md">Do bezpečné zóny</a>
    </div>
  );
}