// src/app/api/compose-layout/route.ts
import { NextResponse } from 'next/server';
import { generateObject } from 'ai';
import { openai } from '@ai-sdk/openai';
import { createClient } from 'next-sanity';
import { LayoutAiSchema } from '@/lib/layoutAiSchema';

// Klient Sanity z tokenem zapisu (Write Token)
const writeClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_API_WRITE_TOKEN,
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { productId } = body;

    if (!productId) {
      return NextResponse.json(
        { error: 'Brak wymaganego pola productId w zapytaniu.' },
        { status: 400 }
      );
    }

    // 1. Pobieramy autorskie dane wprowadzone przez redaktora
    const product = await writeClient.fetch(
      `*[_id == $productId][0]{
        _id,
        name,
        tagline,
        description,
        "challengesCount": count(challenges),
        "solutionsCount": count(solutions),
        "gainsCount": count(gains),
        "usageCount": count(usage),
        "faqCount": count(faq),
        challenges[]{ header, body },
        solutions[]{ header, body },
        gains[]{ header, body },
        usage[]{ header, body },
        faq[]{ question }
      }`,
      { productId }
    );

    if (!product) {
      return NextResponse.json(
        { error: `Nie znaleziono produktu o ID: ${productId}` },
        { status: 404 }
      );
    }

    // 2. AI działa jako UI/UX Orchestrator (decyduje o kolejności i parametrach siatki)
    const { object: layoutDecision } = await generateObject({
      model: openai('gpt-4o'),
      schema: LayoutAiSchema,
      prompt: `Jesteś ekspertem UI/UX i architektem interfejsów w Design Systemie.
Twoim celem jest zaprojektowanie optymalnego układu sekcji (layoutu) dla landing page'a produktu SaaS: "${product.name}".

Metadane wprowadzonych treści:
- Tagline: "${product.tagline || 'Brak'}"
- Wyzwania/Problemy: ${product.challengesCount} pozycji
- Rozwiązania: ${product.solutionsCount} pozycji
- Korzyści (Gains): ${product.gainsCount} pozycji
- Scenariusze użycia (Usage): ${product.usageCount} pozycji
- FAQ: ${product.faqCount} pytań

Szczegóły wprowadzonych korzyści (gains):
${JSON.stringify(product.gains || [], null, 2)}

Wytyczne projektowe:
1. Ułóż sekcje w logicznej ścieżce konwersji (np. najpierw wyzwania i ból klienta, potem rozwiązanie, korzyści, kiedy użyć i na końcu FAQ). Jeśli w danej kategorii jest 0 elementów, pomiń ten blok.
2. Dobierz warianty (np. dla gains dobierz liczbę kolumn 2, 3 lub bento w zależności od liczby korzyści).
3. Jeśli któraś korzyść wyróżnia się liczbami lub wagą biznesową, wskaż jej indeks w gainsPromotedIndex.
4. NIE MODYFIKUJ ANI NIE GENERUJ TREŚCI TEKSTOWEJ. Skup się wyłącznie na strukturze prezentacyjnej.`,
    });

    // 3. Mapujemy spłaszczone parametry Zod na obiekty Sanity z wymaganym polem _type oraz _key
    const formattedSections = layoutDecision.sections.map((section, idx) => {
      const base = {
        _key: `genui_${Date.now()}_${idx}`,
        _type: section.blockType,
      };

      switch (section.blockType) {
        case 'challengesBlock':
          return {
            ...base,
            variant: section.challengesVariant || 'two-columns',
          };
        case 'solutionsBlock':
          return {
            ...base,
            variant: section.solutionsVariant || 'grid-checkmarks',
          };
        case 'gainsBlock':
          return {
            ...base,
            columns: section.gainsColumns || '3',
            promotedIndex: section.gainsPromotedIndex ?? null,
          };
        case 'usageBlock':
          return {
            ...base,
            style: section.usageStyle || 'numbered-cards',
          };
        case 'faqAccordionBlock':
          return {
            ...base,
            defaultOpenFirst: section.faqDefaultOpenFirst ?? false,
          };
        default:
          return base;
      }
    });

    // 4. Zapisujemy wygenerowane sekcje bezpośrednio do dokumentu w Sanity
    await writeClient
      .patch(productId)
      .set({ sections: formattedSections })
      .commit();

    return NextResponse.json({
      success: true,
      sections: formattedSections,
    });
  } catch (error: any) {
    console.error('Błąd compose-layout:', error);
    return NextResponse.json(
      { error: error?.message || 'Wystąpił nieoczekiwany błąd podczas generowania układu.' },
      { status: 500 }
    );
  }
}