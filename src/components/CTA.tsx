export default function CTA() {
  return (
    <section className="px-6 pb-24">
      <div className="mx-auto max-w-5xl overflow-hidden rounded-2xl bg-primary text-primary-foreground shadow-xl">
        <div className="px-8 py-16 md:py-20 text-center relative">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.1),transparent_50%)]"></div>
          <div className="relative">
            <h3 className="text-3xl md:text-4xl font-bold mb-4 text-balance">
              ¿Listo para optimizar tus reservas?
            </h3>
            <p className="text-primary-foreground/80 text-lg mb-8 max-w-2xl mx-auto">
              Únete a empresas que ya están usando nuestro sistema para
              gestionar sus espacios de manera eficiente.
            </p>
            <button className="rounded-lg bg-card px-8 py-4 font-semibold text-foreground hover:bg-card/90 transition-all hover:scale-105 shadow-lg">
              Crear Cuenta Gratis
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
