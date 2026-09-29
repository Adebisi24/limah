import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="container-nn flex flex-col items-center py-24 text-center">
      <p className="eyebrow">404</p>
      <h1 className="mt-4 font-serif text-[42px] font-medium leading-[1.1] tracking-[-0.02em] text-charcoal sm:text-[54px]">
        This page wandered off
        <br />
        <span className="italic text-stone">into another room.</span>
      </h1>
      <p className="mt-5 max-w-[440px] text-[15.5px] leading-relaxed text-stone">
        The address may have changed, or the story may never have existed. Start
        from one of these instead:
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link href="/" className="btn-primary">
          Back to the homepage
        </Link>
        <Link href="/rooms/bedroom" className="btn-outline">
          Browse the Bedroom hub
        </Link>
        <Link href="/search" className="btn-outline">
          Search the site
        </Link>
      </div>
    </section>
  );
}
