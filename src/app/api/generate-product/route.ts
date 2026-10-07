import { NextResponse } from 'next/server';
import { generateObject } from 'ai';
import { openai } from '@ai-sdk/openai';
import { createClient } from 'next-sanity';
import { ProductAiGenerationSchema } from '@/lib/productAiSchema';
import { apiVersion, dataset, projectId } from '@/sanity/env';

// Klient z tokenem zapisu do aktualizacji dokumentu w Sanity
const writeClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || projectId,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || dataset,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || apiVersion,
  useCdn: false,
  token: process.env.SANITY_API_WRITE_TOKEN,
});

export async function POST(req: Request) {
  try {
    const { productId, rawInput, productName } = await req.json();

    if (!productId || !productName) {
      return NextResponse.json({ error: 'Brak productId lub productName' }, { status: 400 });
    }

    if (!process.env.SANITY_API_WRITE_TOKEN) {
      return NextResponse.json(
        { error: 'Brak zmiennej środowiskowej SANITY_API_WRITE_TOKEN w pliku .env.local' },
        { status: 500 }
      );
    }

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: 'Brak zmiennej środowiskowej OPENAI_API_KEY w pliku .env.local' },
        { status: 500 }
      );
    }

    // Wywołanie LLM z wymuszoną strukturą Zod
    const { object: generatedContent } = await generateObject({
      model: openai('gpt-4o'),
      schema: ProductAiGenerationSchema,
      prompt: `Jesteś ekspertem SaaS Product Marketingu i UX Copywriterem.
Na podstawie nazwy produktu "${productName}" oraz poniższych surowych informacji przygotuj kompletną zawartość strony produktowej:

Informacje wejściowe:
${rawInput || 'Brak dodatkowego opisu - wygeneruj logiczną propozycję na podstawie nazwy.'}

Zasady:
- Język: polski.
- Ton: profesjonalny, konkretny, zorientowany na korzyści biznesowe.
- Unikaj pustych haseł marketingowych. Pisz precyzyjnie o problemach i rozwiązaniach.`,
    });

    // Dodanie unikalnych kluczy _key i typu _type wymaganych przez tablice Sanity
    const formatWithKeys = <T extends Record<string, any>>(items: T[], typeName: string) =>
      items.map((item, index) => ({
        _type: typeName,
        _key: `ai_${Date.now()}_${index}`,
        ...item,
      }));

    const updatePayload = {
      tagline: generatedContent.tagline,
      description: generatedContent.description,
      challenges: formatWithKeys(generatedContent.challenges || [], 'challenge'),
      solutions: formatWithKeys(generatedContent.solutions || [], 'solution'),
      gains: formatWithKeys(generatedContent.gains || [], 'gain'),
      usage: formatWithKeys(generatedContent.usage || [], 'usage'),
      faq: formatWithKeys(generatedContent.faq || [], 'faq'),
    };

    // Zapisujemy bezpośrednio do podanego ID (np. draftu w Sanity Studio)
    // createIfNotExists zabezpiecza przed błędem, gdy dokument roboczy jeszcze nie został utrwalony
    const targetId = productId.startsWith('drafts.') ? productId : `drafts.${productId}`;

    await writeClient
      .transaction()
      .createIfNotExists({
        _id: targetId,
        _type: 'product',
        name: productName,
      })
      .patch(targetId, (patch) => patch.set(updatePayload))
      .commit();

    return NextResponse.json({ success: true, data: generatedContent });
  } catch (error: any) {
    console.error('Błąd generowania AI:', error);
    return NextResponse.json({ error: error.message || 'Wystąpił nieoczekiwany błąd' }, { status: 500 });
  }
}