import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';

interface MediaItem {
  id: number;
  title: string;
  type: 'photo' | 'video' | 'track' | 'text';
  url: string;
  thumbnail?: string;
  likes: number;
  created_at: string;
}

interface NewsItem {
  id: number;
  title: string;
  description: string;
  content?: string;
  image_url?: string;
  created_at: string;
}

const MEDIA_API = 'https://functions.poehali.dev/70267a36-8967-4037-bd39-69cef143b46d';
const NEWS_API = 'https://functions.poehali.dev/26c10365-5e08-4f37-964b-419be38966ab';

export default function Admin() {
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(false);

  const [newMedia, setNewMedia] = useState({
    title: '',
    type: 'photo' as 'photo' | 'video' | 'track' | 'text',
    url: '',
    thumbnail: ''
  });

  const [newNews, setNewNews] = useState({
    title: '',
    description: '',
    content: '',
    image_url: ''
  });

  useEffect(() => {
    loadMedia();
    loadNews();
  }, []);

  const loadMedia = async () => {
    try {
      const response = await fetch(MEDIA_API);
      const data = await response.json();
      setMediaItems(data);
    } catch (error) {
      console.error('Failed to load media:', error);
    }
  };

  const loadNews = async () => {
    try {
      const response = await fetch(NEWS_API);
      const data = await response.json();
      setNewsItems(data);
    } catch (error) {
      console.error('Failed to load news:', error);
    }
  };

  const handleAddMedia = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(MEDIA_API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...newMedia,
          thumbnail: newMedia.thumbnail || newMedia.url
        })
      });

      if (response.ok) {
        setNewMedia({ title: '', type: 'photo', url: '', thumbnail: '' });
        loadMedia();
      }
    } catch (error) {
      console.error('Failed to add media:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddNews = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(NEWS_API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newNews)
      });

      if (response.ok) {
        setNewNews({ title: '', description: '', content: '', image_url: '' });
        loadNews();
      }
    } catch (error) {
      console.error('Failed to add news:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-heading font-bold text-gradient">Админ-панель</h1>
          <Button variant="outline" onClick={() => window.location.href = '/'}>
            <Icon name="Home" size={18} />
            На главную
          </Button>
        </div>

        <Tabs defaultValue="media" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="media">
              <Icon name="Image" size={18} className="mr-2" />
              Медиа-контент
            </TabsTrigger>
            <TabsTrigger value="news">
              <Icon name="Newspaper" size={18} className="mr-2" />
              Новости
            </TabsTrigger>
          </TabsList>

          <TabsContent value="media" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Добавить новый контент</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleAddMedia} className="space-y-4">
                  <div className="space-y-2">
                    <Label>Название</Label>
                    <Input
                      value={newMedia.title}
                      onChange={(e) => setNewMedia({ ...newMedia, title: e.target.value })}
                      placeholder="Введите название"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Тип контента</Label>
                    <Select
                      value={newMedia.type}
                      onValueChange={(value: any) => setNewMedia({ ...newMedia, type: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="photo">Фото</SelectItem>
                        <SelectItem value="video">Видео</SelectItem>
                        <SelectItem value="track">Трек</SelectItem>
                        <SelectItem value="text">Текст</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>URL файла</Label>
                    <Input
                      value={newMedia.url}
                      onChange={(e) => setNewMedia({ ...newMedia, url: e.target.value })}
                      placeholder="https://example.com/file.jpg"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>URL миниатюры (опционально)</Label>
                    <Input
                      value={newMedia.thumbnail}
                      onChange={(e) => setNewMedia({ ...newMedia, thumbnail: e.target.value })}
                      placeholder="https://example.com/thumb.jpg"
                    />
                  </div>

                  <Button type="submit" disabled={loading} className="w-full">
                    <Icon name="Plus" size={18} />
                    Добавить
                  </Button>
                </form>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Все медиа ({mediaItems.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mediaItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center gap-4 p-4 border border-border rounded-lg"
                    >
                      <img
                        src={item.thumbnail}
                        alt={item.title}
                        className="w-20 h-20 object-cover rounded"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold">{item.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          {item.type} • {item.likes} лайков
                        </p>
                      </div>
                      <Icon
                        name={
                          item.type === 'photo'
                            ? 'Image'
                            : item.type === 'video'
                            ? 'Video'
                            : item.type === 'track'
                            ? 'Music'
                            : 'FileText'
                        }
                        size={24}
                        className="text-primary"
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="news" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Добавить новость</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleAddNews} className="space-y-4">
                  <div className="space-y-2">
                    <Label>Заголовок</Label>
                    <Input
                      value={newNews.title}
                      onChange={(e) => setNewNews({ ...newNews, title: e.target.value })}
                      placeholder="Введите заголовок"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Краткое описание</Label>
                    <Textarea
                      value={newNews.description}
                      onChange={(e) => setNewNews({ ...newNews, description: e.target.value })}
                      placeholder="Краткое описание новости"
                      rows={3}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Полный текст (опционально)</Label>
                    <Textarea
                      value={newNews.content}
                      onChange={(e) => setNewNews({ ...newNews, content: e.target.value })}
                      placeholder="Полное содержание новости"
                      rows={6}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>URL изображения (опционально)</Label>
                    <Input
                      value={newNews.image_url}
                      onChange={(e) => setNewNews({ ...newNews, image_url: e.target.value })}
                      placeholder="https://example.com/image.jpg"
                    />
                  </div>

                  <Button type="submit" disabled={loading} className="w-full">
                    <Icon name="Plus" size={18} />
                    Опубликовать
                  </Button>
                </form>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Все новости ({newsItems.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {newsItems.map((item) => (
                    <div key={item.id} className="p-4 border border-border rounded-lg space-y-2">
                      <h3 className="font-semibold text-lg">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(item.created_at).toLocaleDateString('ru-RU')}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
