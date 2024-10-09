export interface Article {
  id: string;
  title: string;
  content: string;
  subtype: string;
  display_date: string;
  headline: {
    basic: string;
  };
  promo_items?: {
    basic?: {
      url?: string;
    };
  };
  taxonomy?: {
    tags?: Array<{
      slug: string;
      text: string;
    }>;
  };
}
