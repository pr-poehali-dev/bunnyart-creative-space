import { useState, useEffect } from 'react';
import Icon from '@/components/ui/icon';
import { Card } from '@/components/ui/card';

const NEWS_API = 'https://functions.poehali.dev/26c10365-5e08-4f37-964b-419be38966ab';

interface NewsItem {
  id: number;
  title: string;
  description: string;
  content?: string;
  image_url?: string;
  created_at: string;
}

export default function NewsSection() {
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);

  useEffect(() => {
    loadNews();
  }, []);

  const loadNews = async () => {
    try {
      const response = await fetch(NEWS_API);
      const data = await response.json();
      setNewsItems(data);
    } catch (error) {
      console.error('Failed to load news:', error);
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="text-center space-y-4">
        <h2 className="text-4xl font-heading font-bold">Новости</h2>
        <p className="text-muted-foreground text-lg">Последние обновления и анонсы</p>
      </div>

      <div className="space-y-6 max-w-4xl mx-auto">
        {newsItems.length === 0 ? (
          <Card className="p-12 text-center border-border/50 bg-card/50 backdrop-blur">
            <Icon name="Newspaper" size={48} className="mx-auto mb-4 text-muted-foreground/50" />
            <p className="text-muted-foreground">Пока нет новостей</p>
          </Card>
        ) : (
          newsItems.map((item) => (
            <Card key={item.id} className="p-6 hover-scale border-border/50 bg-card/50 backdrop-blur">
              <div className="flex gap-4">
                <div className="flex-1 space-y-3">
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <Icon name="Calendar" size={16} />
                    <span>{new Date(item.created_at).toLocaleDateString('ru-RU')}</span>
                  </div>
                  <h3 className="text-2xl font-heading font-semibold">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}