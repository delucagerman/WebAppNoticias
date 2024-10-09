import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import ArticleGrid, { Article as ArticleGridArticle } from '../../components/ArticleGrid';
import { filterArticles, processTags } from "@/app/utils/dataProcessing";
import { Article as ApiArticle } from '@/app/types/Article';
import { getData } from '../../services/api';

export const revalidate = 3600; // revalidate every hour

export default async function TagPage({ params }: { params: { tag: string } }) {
  const tag = params.tag;
  const data = await getData();
  
  const articles = Array.isArray(data.articles) ? data.articles : [];
  
  const filteredArticles = filterArticles(articles).filter((article: ApiArticle) => 
    article.taxonomy?.tags?.some(t => t.slug === tag)
  ) as ArticleGridArticle[];

  if (filteredArticles.length === 0) {
    notFound();
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Artículos sobre {tag.split('-')[0]}</h1>
      <Suspense fallback={<div>Cargando artículos...</div>}>
        <ArticleGrid articles={filteredArticles} />
      </Suspense>
    </div>
  );
}

export async function generateStaticParams() {
  const data = await getData();
  const articles = Array.isArray(data.articles) ? data.articles : [];
  const tags = processTags(articles);

  return tags.map((tag) => ({
    tag: tag.slug,
  }));
}
