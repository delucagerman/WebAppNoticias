interface Tag {
    slug: string;
    text: string;
    count: number;
  }
  
  interface Article {
    subtype: string;
    display_date: string;
    headline: {
      basic: string;
    };
    promo_items: {
      basic: {
        url: string;
      };
    };
    taxonomy: {
      tags: Array<{
        slug: string;
        text: string;
      }>;
    };
  }
  
  export function processTags(articles: Article[] | null | undefined): Tag[] {
    if (!articles || !Array.isArray(articles)) {
      console.error('Articles is not an array:', articles);
      return [];
    }

    const tagCount: { [key: string]: Tag } = {};

    articles.forEach(article => {
      if (article.taxonomy && Array.isArray(article.taxonomy.tags)) {
        article.taxonomy.tags.forEach(tag => {
          if (tagCount[tag.slug]) {
            tagCount[tag.slug].count++;
          } else {
            tagCount[tag.slug] = { ...tag, count: 1 };
          }
        });
      }
    });

    return Object.values(tagCount)
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);
  }
  
  export function filterArticles(articles: Article[] | null | undefined): Article[] {
    if (!articles || !Array.isArray(articles)) {
      console.error('Articles is not an array:', articles);
      return [];
    }

    return articles
      .filter(article => article.subtype === "7")
      .map(article => ({
        ...article,
        display_date: article.display_date ? formatDate(article.display_date) : 'No date available'
      }));
  }
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    let formattedDate = date.toLocaleDateString('es-ES', options);
    
    // Capitalizar el primer carácter del mes
    formattedDate = formattedDate.replace(/^(\d+)\s+de\s+(\w)(\w+)/, (_, day, firstChar, restOfMonth) => 
      `${day} de ${firstChar.toUpperCase()}${restOfMonth}`
    );
    
    // Eliminar "de" antes del año
    formattedDate = formattedDate.replace(/ de (\d{4})$/, ' $1');
    
    return formattedDate;
  };