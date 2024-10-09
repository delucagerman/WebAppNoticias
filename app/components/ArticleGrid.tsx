import { Article as ImportedArticle } from '../types/Article';
import Link from 'next/link';
import Image from 'next/image';

// Modificar la interfaz Article para que coincida con ImportedArticle y exportarla
export interface Article extends ImportedArticle {
  _id: string;
  headlines: {
    basic?: string;
  };
}

interface ArticleGridProps {
  articles: Article[];
}

const ArticleGrid: React.FC<ArticleGridProps> = ({ articles }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
      {articles.map((article) => {
        const tagSlug = article.taxonomy?.tags?.[0]?.slug || 'default';
        const imageUrl = article.promo_items?.basic?.url;

        return (
          <Link href={`/tema/${tagSlug}`} key={article._id}>
            <div className="border p-4 rounded-lg cursor-pointer hover:shadow-lg transition-shadow duration-300">
              {imageUrl && (
                <div className="w-full h-48 mb-2 overflow-hidden">
                  <Image 
                    src={imageUrl}
                    alt={article.headlines?.basic || 'Imagen del artículo'}
                    width={300}
                    height={200}
                    layout="responsive"
                  />
                </div>
              )}
              <h2 className="text-lg font-bold mb-2">
                {article.headlines?.basic || 'Título no disponible'}
              </h2>
              <p className="text-sm text-gray-600">
                {article.display_date}
              </p>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default ArticleGrid;