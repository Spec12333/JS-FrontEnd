import Link from "next/link";

export default function DefaultPage() {
  return (
    <main className="grid min-h-screen place-items-center px-4 py-8 sm:px-6 sm:py-12">
      <section className="w-full max-w-5xl overflow-hidden rounded-[2rem] border border-white/70 bg-white/85 shadow-2xl shadow-indigo-950/10 backdrop-blur sm:p-2">
        <div className="rounded-[1.6rem] bg-linear-to-br from-indigo-950 via-indigo-900 to-cyan-900 px-6 py-10 text-white sm:px-12 sm:py-14">
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-cyan-200">
            Team directory
          </p>
          <div className="mt-5 max-w-2xl">
            <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
              Know your people, beautifully.
            </h1>
            <p className="mt-5 max-w-xl text-base leading-7 text-indigo-100 sm:text-lg">
              A simple, thoughtful place to explore your team and keep every
              profile within reach.
            </p>
          </div>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link
              href="/users"
              className="rounded-xl bg-white px-5 py-3 text-sm font-semibold text-indigo-950 shadow-lg shadow-indigo-950/20 transition hover:-translate-y-0.5 hover:bg-cyan-50 focus:outline-none focus:ring-4 focus:ring-cyan-200/50"
            >
              View directory{" "}
              <span className="ml-1.5" aria-hidden="true">
                →
              </span>
            </Link>
            <Link
              href="/users/add"
              className="rounded-xl border border-white/20 bg-white/10 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/20 focus:outline-none focus:ring-4 focus:ring-white/20"
            >
              Add a person
            </Link>
          </div>
        </div>

        <div className="grid gap-4 p-6 sm:grid-cols-3 sm:p-8">
          <div className="rounded-2xl border border-slate-100 bg-slate-50/80 p-5">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-indigo-500">
              Explore
            </p>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              Browse every teammate in a clean, easy-to-scan directory.
            </p>
          </div>
          <div className="rounded-2xl border border-slate-100 bg-slate-50/80 p-5">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-cyan-600">
              Connect
            </p>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              Open a profile to see the information you need at a glance.
            </p>
          </div>
          <div className="rounded-2xl border border-slate-100 bg-slate-50/80 p-5">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-indigo-500">
              Grow
            </p>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              Add new people whenever your team grows.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
