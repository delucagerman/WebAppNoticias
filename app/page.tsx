import { Suspense } from 'react';
import { getData } from './services/api';
import ArticleGrid, { Article } from './components/ArticleGrid';
import { filterArticles } from "./utils/dataProcessing";

export default async function Home() {
  const data = await getData();
  
  const articles = Array.isArray(data.articles) ? data.articles : [];
  const filteredArticles = filterArticles(articles);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Acumulado Grilla</h1>
      <Suspense fallback={<div>Cargando artículos...</div>}>
        <ArticleGrid articles={filteredArticles as Article[]} />
      </Suspense>
    </div>
  );
}
