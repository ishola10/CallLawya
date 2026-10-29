export default function NewsLoading() {
  return (
    <div className="bg-white" aria-busy="true" aria-label="Loading the latest legal news">
      <div className="page-x min-h-[38px] bg-brand py-2" />
      <section className="page-x pb-5 pt-10">
        <div className="border-b-4 border-black pb-5">
          <div className="h-12 w-72 max-w-full animate-pulse rounded bg-slate-200 md:h-16 md:w-[460px]" />
        </div>
        <div className="flex gap-3 overflow-hidden border-b border-slate-300 py-3">
          {Array.from({ length: 7 }, (_, index) => (
            <div key={index} className="h-8 w-28 shrink-0 animate-pulse rounded bg-slate-100" />
          ))}
        </div>
      </section>
      <section className="page-x py-7">
        <div className="grid gap-7 lg:grid-cols-[1.55fr_.8fr]">
          <div className="grid gap-6 md:grid-cols-[1.25fr_.75fr]">
            <div className="h-[260px] animate-pulse bg-slate-100 md:h-[440px]" />
            <div className="space-y-4">
              <div className="h-4 w-24 animate-pulse rounded bg-slate-100" />
              <div className="h-10 animate-pulse rounded bg-slate-200" />
              <div className="h-10 w-4/5 animate-pulse rounded bg-slate-200" />
              <div className="h-20 animate-pulse rounded bg-slate-100" />
            </div>
          </div>
          <div className="space-y-6">
            {[0, 1, 2].map((index) => (
              <div key={index} className="space-y-2 border-b border-slate-200 pb-6">
                <div className="h-3 w-20 animate-pulse rounded bg-slate-100" />
                <div className="h-6 animate-pulse rounded bg-slate-200" />
                <div className="h-6 w-2/3 animate-pulse rounded bg-slate-200" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
