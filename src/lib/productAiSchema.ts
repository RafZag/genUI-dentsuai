import { z } from 'zod';

export const ProductAiGenerationSchema = z.object({
  tagline: z.string().describe('Jednozdaniowy, chwytliwy nagłówek wartości (max 80 znaków)'),
  description: z.string().describe('2-3 zwięzłe zdania opisujące produkt i jego cel'),
  challenges: z.array(
    z.object({
      header: z.string().describe('Tytuł problemu / wyzwania klienta'),
      body: z.string().describe('Opis trudności i jej konsekwencji'),
    })
  ).min(2).max(4).describe('Główne problemy, które produkt eliminuje'),
  solutions: z.array(
    z.object({
      header: z.string().describe('Tytuł rozwiązania'),
      body: z.string().describe('Jak funkcja produktu rozwiązuje powyższe wyzwanie'),
    })
  ).min(2).max(4).describe('Konkretne rozwiązania odpowiadające wyzwaniom'),
  gains: z.array(
    z.object({
      header: z.string().describe('Główny zysk / korzyść (np. "Oszczędność czasu")'),
      body: z.string().describe('Szczegóły wartości biznesowej lub operacyjnej'),
    })
  ).min(3).max(6).describe('Kluczowe korzyści z wdrożenia'),
  usage: z.array(
    z.object({
      header: z.string().describe('Kiedy użyć / Scenariusz użycia'),
      body: z.string().describe('Opis sytuacji, w której to narzędzie jest niezastąpione'),
    })
  ).min(2).max(4).describe('Rekomendowane scenariusze użycia'),
  faq: z.array(
    z.object({
      question: z.string().describe('Pytanie rozwiewające obiekcję klienta'),
      answer: z.string().describe('Konkretna, bezpośrednia odpowiedź'),
    })
  ).min(3).max(5).describe('Często zadawane pytania pod SEO i konwersję'),
});