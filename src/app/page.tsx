import { client } from '@/sanity/lib/client';
import { homePageQuery } from '@/sanity/lib/queries';
import { PageBuilder } from '@/components/PageBuilder';
import { SiteHeader } from '@/components/SiteHeader';
import { Button } from '@/components/ui/button';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  let pageData = null;
  try {
    pageData = await client.fetch(homePageQuery);
  } catch (error) {
    console.error('Failed to fetch home page data:', error);
  }

  return (
    <>
      <SiteHeader />

      <main className="flex-1 flex flex-col items-center pt-36 pb-20 text-center">
        {/* Dentsu AI Homepage Hero Header */}
        <section className="max-w-4xl mx-auto px-6 flex flex-col items-center gap-6 mb-12">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-medium tracking-tight bg-gradient-to-t from-[#B6B6B6] to-white bg-clip-text text-transparent leading-[1.1]">
            AI, które działa tak, <br className="hidden sm:inline" />
            jak Twój biznes.
          </h1>
          <p className="text-lg sm:text-xl font-light text-white/90 max-w-2xl">
            Samodzielne aplikacje. Jeden zintegrowany ekosystem AI.
          </p>
          <div className="flex items-center gap-4 mt-2">
            <Button variant="glass" size="lg" className="rounded-xl">
              Umów Demo
            </Button>
          </div>
        </section>

        {/* Dynamiczne sekcje z Sanity */}
        {pageData?.sections && pageData.sections.length > 0 ? (
          <div className="w-full">
            <PageBuilder sections={pageData.sections} />
          </div>
        ) : (
          <div className="w-full max-w-2xl mx-auto px-6 mt-8">
            <div className="rounded-2xl border border-white/10 bg-black/40 backdrop-blur-sm p-8 text-center">
              <h2 className="text-xl font-medium text-white mb-2">
                Połączenie z Sanity działa 🎉
              </h2>
              <p className="text-sm text-[#adadad] font-light mb-4">
                Nie znaleziono jeszcze strony o slug &quot;/&quot; lub tablica sekcji jest pusta.
              </p>
              <div className="rounded-xl border border-white/10 bg-[#141414] p-4 text-xs font-mono text-[#adadad] text-left">
                Utwórz w Sanity dokument <code>page</code> ze slugiem <code>/</code> i dodaj do niego blok <code>productCarouselBlock</code>.
              </div>
            </div>
          </div>
        )}
      </main>
    </>
  );
}