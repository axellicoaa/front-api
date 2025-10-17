import React from "react";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-slate-50">
      {/* Header */}
      <header className="border-b border-gray-300 bg-background/80  backdrop-blur-sm sticky top-0 z-50">
        <div className="mx-auto max-w-7xl px-5 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">

            <span className="font-semibold text-lg text-slate-900">Sistema de Reservas</span>
          </div>
          <div className="flex items-center gap-3">
            <button className="text-sm text-slate-700 hover:text-slate-900">Iniciar Sesión</button>
            <button className="rounded-md bg-blue-700 px-4 py-2 text-sm font-medium text-white hover:bg-blue-800">
              Registrarse
            </button>
          </div>
        </div>
      </header> 

      {/* Hero */}
      <main className="flex-1">
        <section className="mx-auto max-w-5xl px-5 pt-14 pb-8 text-center">
          <h1 className="text-5xl font-bold text-balance">
            Gestiona las Reservas<br />
            <span className="text-slate-900">de Salas de Reuniones</span>
          </h1>

          <p className="mt-4 text-slate-600 max-w-3xl mx-auto">
            Sistema completo para solicitar, aprobar y gestionar reservas de espacios de
            reunión en tu empresa.
          </p>

          <div className="mt-8 flex items-center justify-center gap-4">
            <button className="rounded-md bg-blue-700 px-5 py-3 text-white font-medium hover:bg-blue-800">
              Comenzar Ahora
            </button>
            <button className="rounded-md border border-slate-300 px-5 py-3 text-slate-800 hover:bg-white">
              Iniciar Sesión
            </button>
          </div>
        </section>

        {/* Features */}
        <section className="mx-auto max-w-6xl px-5 pb-14">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FeatureCard
              icon={
                <span ></span>
              }
              title="Reservas Fáciles"
              desc="Solicita reservas de salas de manera rápida y sencilla con nuestro calendario intuitivo."
            />
            <FeatureCard
              icon={
                <span></span>
              }
              title="Aprobación Coordinada"
              desc="Los coordinadores pueden revisar y aprobar solicitudes de manera eficiente."
            />
            <FeatureCard
              icon={
                <span></span>
              }
              title="Gestión Completa"
              desc="Administra usuarios, salas y reportes desde un panel centralizado."
            />
          </div>
        </section>

        {/* CTA */}
        <section className="px-5 pb-20">
          <div className="mx-auto max-w-5xl overflow-hidden rounded-2xl bg-blue- text-white shadow-lg">
            <div className="px-8 py-12 text-center">
              <h3 className="text-2xl md:text-3xl font-bold mb-2">
                ¿Listo para optimizar tus reservas?
              </h3>
              <p className="text-blue-100 mb-6">
                Únete a empresas que ya están usando nuestro sistema.
              </p>
              <button className="rounded-md bg-white px-5 py-3 font-semibold text-blue-800 hover:bg-blue-50">
                Crear Cuenta Gratis
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t bg-white">
        <div className="mx-auto max-w-7xl px-5 py-4 text-center text-sm text-slate-500">
          © {new Date().getFullYear()} Sistema de Reservas. Todos los derechos reservados.
        </div>
      </footer>
    </div>
  );
}

/** Sub-componente para cada card de característica */
function FeatureCard({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition">
      <div className="mb-3">{icon}</div>
      <h3 className="text-base font-semibold text-slate-900">{title}</h3>
      <p className="mt-2 text-sm text-slate-600">{desc}</p>
    </div>
  );
}
