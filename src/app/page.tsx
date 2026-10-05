import { client } from '@/sanity/lib/client';
import { homePageQuery } from '@/sanity/lib/queries';
import { PageBuilder } from '@/components/PageBuilder';

export default async function HomePage() {
  const pageData = await client.fetch(homePageQuery);

  // Fallback testowy: jeśli strona w Sanity jeszcze nie istnieje lub nie ma sekcji
  if (!pageData?.sections || pageData.sections.length === 0) {
    return (
      <main className="min-h-screen py-16 px-6 max-w-4xl mx-auto text-center">
        <h1 className="text-2xl font-bold mb-4">Połączenie z Sanity działa! 🎉</h1>
        <p className="text-muted-foreground mb-6">
          Nie znaleziono jeszcze strony o slug &quot;/&quot; lub tablica sekcji jest pusta.
        </p>
        <div className="bg-muted p-4 rounded-lg text-left text-sm font-mono">
          Utwórz w Sanity dokument <code>page</code> ze slugiem <code>/</code> i dodaj do niego blok <code>productCarouselBlock</code>.
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen py-12">
      <PageBuilder sections={pageData.sections} />
    </main>
  );
}