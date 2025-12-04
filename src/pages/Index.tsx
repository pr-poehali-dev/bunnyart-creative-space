import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';

type Section = 'home' | 'photos' | 'videos' | 'tracks' | 'texts' | 'news' | 'contact';

interface MediaItem {
  id: number;
  title: string;
  type: 'photo' | 'video' | 'track' | 'text';
  url: string;
  thumbnail?: string;
  likes: number;
  comments: Comment[];
}

interface Comment {
  id: number;
  author: string;
  text: string;
  date: string;
}

export default function Index() {
  const [currentSection, setCurrentSection] = useState<Section>('home');
  const [selectedItem, setSelectedItem] = useState<MediaItem | null>(null);
  const [commentText, setCommentText] = useState('');

  const mediaItems: MediaItem[] = [
    {
      id: 1,
      title: 'Творческий абстракт',
      type: 'photo',
      url: 'https://cdn.poehali.dev/projects/0087cf7c-124a-4d10-ab16-c06edb0e8d5d/files/353ce9a4-1531-4786-8e2d-ee8d9c0ac902.jpg',
      thumbnail: 'https://cdn.poehali.dev/projects/0087cf7c-124a-4d10-ab16-c06edb0e8d5d/files/353ce9a4-1531-4786-8e2d-ee8d9c0ac902.jpg',
      likes: 42,
      comments: []
    },
    {
      id: 2,
      title: 'Художественная мастерская',
      type: 'photo',
      url: 'https://cdn.poehali.dev/projects/0087cf7c-124a-4d10-ab16-c06edb0e8d5d/files/9f64844c-a47c-4328-bdce-9535945373d1.jpg',
      thumbnail: 'https://cdn.poehali.dev/projects/0087cf7c-124a-4d10-ab16-c06edb0e8d5d/files/9f64844c-a47c-4328-bdce-9535945373d1.jpg',
      likes: 38,
      comments: []
    },
    {
      id: 3,
      title: 'Музыкальная студия',
      type: 'track',
      url: 'https://cdn.poehali.dev/projects/0087cf7c-124a-4d10-ab16-c06edb0e8d5d/files/7fc17d9c-3bb2-41d9-85bc-f67e7857b5fd.jpg',
      thumbnail: 'https://cdn.poehali.dev/projects/0087cf7c-124a-4d10-ab16-c06edb0e8d5d/files/7fc17d9c-3bb2-41d9-85bc-f67e7857b5fd.jpg',
      likes: 56,
      comments: []
    }
  ];

  const menuItems = [
    { id: 'home' as Section, label: 'Главная', icon: 'Home' },
    { id: 'photos' as Section, label: 'Фото', icon: 'Image' },
    { id: 'videos' as Section, label: 'Видео', icon: 'Video' },
    { id: 'tracks' as Section, label: 'Треки', icon: 'Music' },
    { id: 'texts' as Section, label: 'Тексты', icon: 'FileText' },
    { id: 'news' as Section, label: 'Новости', icon: 'Newspaper' },
    { id: 'contact' as Section, label: 'Контакты', icon: 'Mail' }
  ];

  const socialLinks = [
    { name: 'TikTok', icon: 'Music', url: '#' },
    { name: 'Telegram', icon: 'Send', url: '#' },
    { name: 'Likee', icon: 'Heart', url: '#' },
    { name: 'VK', icon: 'Users', url: '#' }
  ];

  const handleLike = (itemId: number) => {
    console.log(`Liked item ${itemId}`);
  };

  const handleComment = (itemId: number) => {
    if (commentText.trim()) {
      console.log(`Comment on item ${itemId}: ${commentText}`);
      setCommentText('');
    }
  };

  const renderHome = () => (
    <div className="space-y-12 animate-fade-in">
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden rounded-3xl">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20" />
        <div className="absolute inset-0 bg-black/40" />
        <img 
          src="https://cdn.poehali.dev/projects/0087cf7c-124a-4d10-ab16-c06edb0e8d5d/files/353ce9a4-1531-4786-8e2d-ee8d9c0ac902.jpg" 
          alt="Hero" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="relative z-10 text-center px-6 space-y-6">
          <h1 className="text-6xl md:text-8xl font-heading font-bold text-gradient">
            BunnyArt
          </h1>
          <p className="text-xl md:text-2xl text-foreground/90 max-w-2xl mx-auto">
            Творческое пространство, где искусство встречается с технологией
          </p>
          <div className="flex gap-4 justify-center">
            <Button size="lg" className="hover-scale">
              <Icon name="Sparkles" size={20} />
              Смотреть работы
            </Button>
            <Button size="lg" variant="outline" className="hover-scale">
              <Icon name="Mail" size={20} />
              Связаться
            </Button>
          </div>
        </div>
      </section>

      <section className="space-y-8">
        <div className="text-center space-y-4">
          <h2 className="text-4xl font-heading font-bold">Последние работы</h2>
          <p className="text-muted-foreground text-lg">Мои новые творения</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mediaItems.map((item) => (
            <Card 
              key={item.id} 
              className="group cursor-pointer hover-scale overflow-hidden border-border/50 bg-card/50 backdrop-blur"
              onClick={() => setSelectedItem(item)}
            >
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={item.thumbnail} 
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <h3 className="text-xl font-heading font-semibold text-white">{item.title}</h3>
                </div>
              </div>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleLike(item.id);
                      }}
                      className="flex items-center gap-2 text-muted-foreground hover:text-accent transition-colors"
                    >
                      <Icon name="Heart" size={20} />
                      <span>{item.likes}</span>
                    </button>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Icon name="MessageCircle" size={20} />
                      <span>{item.comments.length}</span>
                    </div>
                  </div>
                  <Icon name={item.type === 'photo' ? 'Image' : item.type === 'video' ? 'Video' : item.type === 'track' ? 'Music' : 'FileText'} size={20} className="text-primary" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="space-y-8">
        <div className="text-center space-y-4">
          <h2 className="text-4xl font-heading font-bold">О творчестве</h2>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            BunnyArt — это место, где я делюсь своими фотографиями, музыкой, видео, текстами и книгами. 
            Здесь каждая работа рассказывает свою историю, и каждая история ждёт своего зрителя.
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { icon: 'Image', label: 'Фото', count: '150+' },
            { icon: 'Video', label: 'Видео', count: '45+' },
            { icon: 'Music', label: 'Треки', count: '80+' },
            { icon: 'FileText', label: 'Тексты', count: '120+' }
          ].map((stat) => (
            <Card key={stat.label} className="p-6 text-center hover-scale bg-card/50 backdrop-blur border-border/50">
              <Icon name={stat.icon as any} size={32} className="mx-auto mb-3 text-primary" />
              <div className="text-3xl font-heading font-bold mb-1">{stat.count}</div>
              <div className="text-muted-foreground">{stat.label}</div>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );

  const renderGallery = (type: 'photo' | 'video' | 'track' | 'text') => {
    const filteredItems = mediaItems.filter(item => item.type === type);
    const titles = {
      photo: 'Фотогалерея',
      video: 'Видеогалерея',
      track: 'Музыкальная коллекция',
      text: 'Тексты и книги'
    };

    return (
      <div className="space-y-8 animate-fade-in">
        <div className="text-center space-y-4">
          <h2 className="text-4xl font-heading font-bold">{titles[type]}</h2>
          <p className="text-muted-foreground text-lg">Мои работы в категории {titles[type].toLowerCase()}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <Card 
              key={item.id} 
              className="group cursor-pointer hover-scale overflow-hidden border-border/50 bg-card/50 backdrop-blur"
              onClick={() => setSelectedItem(item)}
            >
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={item.thumbnail} 
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <CardContent className="p-4">
                <h3 className="text-lg font-heading font-semibold mb-2">{item.title}</h3>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleLike(item.id);
                    }}
                    className="flex items-center gap-2 hover:text-accent transition-colors"
                  >
                    <Icon name="Heart" size={18} />
                    <span>{item.likes}</span>
                  </button>
                  <div className="flex items-center gap-2">
                    <Icon name="MessageCircle" size={18} />
                    <span>{item.comments.length}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-20">
            <Icon name="Inbox" size={64} className="mx-auto mb-4 text-muted-foreground/50" />
            <p className="text-muted-foreground text-lg">Пока нет работ в этой категории</p>
          </div>
        )}
      </div>
    );
  };

  const renderNews = () => (
    <div className="space-y-8 animate-fade-in">
      <div className="text-center space-y-4">
        <h2 className="text-4xl font-heading font-bold">Новости</h2>
        <p className="text-muted-foreground text-lg">Последние обновления и анонсы</p>
      </div>

      <div className="space-y-6 max-w-4xl mx-auto">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="p-6 hover-scale border-border/50 bg-card/50 backdrop-blur">
            <div className="flex gap-4">
              <div className="flex-1 space-y-3">
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <Icon name="Calendar" size={16} />
                  <span>15 ноября 2024</span>
                </div>
                <h3 className="text-2xl font-heading font-semibold">Новая коллекция работ</h3>
                <p className="text-muted-foreground">
                  Рад представить вам новую серию фотографий, созданных в этом месяце. 
                  Эксперименты со светом и цветом открыли новые горизонты творчества.
                </p>
                <Button variant="link" className="p-0 h-auto">
                  Читать далее <Icon name="ArrowRight" size={16} />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderContact = () => (
    <div className="space-y-8 animate-fade-in max-w-4xl mx-auto">
      <div className="text-center space-y-4">
        <h2 className="text-4xl font-heading font-bold">Контакты</h2>
        <p className="text-muted-foreground text-lg">Свяжитесь со мной</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <Card className="p-6 space-y-6 border-border/50 bg-card/50 backdrop-blur">
          <h3 className="text-2xl font-heading font-semibold">Социальные сети</h3>
          <div className="space-y-4">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.url}
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors group"
              >
                <Icon name={social.icon as any} size={24} className="text-primary group-hover:scale-110 transition-transform" />
                <span className="text-lg">{social.name}</span>
              </a>
            ))}
          </div>
          
          <Separator />
          
          <div className="space-y-3">
            <h4 className="font-heading font-semibold">Email</h4>
            <a href="mailto:contact@bunnyart.com" className="flex items-center gap-3 text-primary hover:underline">
              <Icon name="Mail" size={20} />
              contact@bunnyart.com
            </a>
          </div>
        </Card>

        <Card className="p-6 space-y-6 border-border/50 bg-card/50 backdrop-blur">
          <h3 className="text-2xl font-heading font-semibold">Написать мне</h3>
          <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); }}>
            <div className="space-y-2">
              <label className="text-sm font-medium">Имя</label>
              <Input placeholder="Ваше имя" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Email</label>
              <Input type="email" placeholder="your@email.com" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Сообщение</label>
              <Textarea placeholder="Ваше сообщение..." rows={5} />
            </div>
            <Button type="submit" className="w-full">
              <Icon name="Send" size={20} />
              Отправить в Telegram
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-background/80 border-b border-border/50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button 
              onClick={() => setCurrentSection('home')}
              className="text-2xl font-heading font-bold text-gradient hover-scale"
            >
              BunnyArt
            </button>
            
            <nav className="hidden md:flex items-center gap-2">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setCurrentSection(item.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                    currentSection === item.id 
                      ? 'bg-primary text-primary-foreground' 
                      : 'hover:bg-muted text-foreground/70 hover:text-foreground'
                  }`}
                >
                  <Icon name={item.icon as any} size={18} />
                  <span>{item.label}</span>
                </button>
              ))}
            </nav>

            <div className="md:hidden">
              <Button variant="ghost" size="icon">
                <Icon name="Menu" size={24} />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        {currentSection === 'home' && renderHome()}
        {currentSection === 'photos' && renderGallery('photo')}
        {currentSection === 'videos' && renderGallery('video')}
        {currentSection === 'tracks' && renderGallery('track')}
        {currentSection === 'texts' && renderGallery('text')}
        {currentSection === 'news' && renderNews()}
        {currentSection === 'contact' && renderContact()}
      </main>

      <footer className="border-t border-border/50 mt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-muted-foreground">© 2024 BunnyArt. Все права защищены.</p>
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  <Icon name={social.icon as any} size={20} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>

      {selectedItem && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setSelectedItem(null)}
        >
          <div 
            className="max-w-4xl w-full bg-card rounded-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative">
              <img 
                src={selectedItem.url} 
                alt={selectedItem.title}
                className="w-full max-h-[60vh] object-contain"
              />
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 right-4 p-2 bg-black/50 rounded-full hover:bg-black/70 transition-colors"
              >
                <Icon name="X" size={24} />
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              <h3 className="text-2xl font-heading font-bold">{selectedItem.title}</h3>
              
              <div className="flex items-center gap-6">
                <button 
                  onClick={() => handleLike(selectedItem.id)}
                  className="flex items-center gap-2 text-muted-foreground hover:text-accent transition-colors"
                >
                  <Icon name="Heart" size={24} />
                  <span className="text-lg">{selectedItem.likes}</span>
                </button>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Icon name="MessageCircle" size={24} />
                  <span className="text-lg">{selectedItem.comments.length}</span>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="font-heading font-semibold">Комментарии</h4>
                
                <ScrollArea className="h-40">
                  {selectedItem.comments.length === 0 ? (
                    <p className="text-muted-foreground text-center py-8">Пока нет комментариев</p>
                  ) : (
                    <div className="space-y-3">
                      {selectedItem.comments.map((comment) => (
                        <div key={comment.id} className="p-3 bg-muted rounded-lg">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-semibold">{comment.author}</span>
                            <span className="text-xs text-muted-foreground">{comment.date}</span>
                          </div>
                          <p className="text-sm">{comment.text}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </ScrollArea>

                <div className="flex gap-2">
                  <Input 
                    placeholder="Напишите комментарий..." 
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleComment(selectedItem.id)}
                  />
                  <Button onClick={() => handleComment(selectedItem.id)}>
                    <Icon name="Send" size={20} />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
