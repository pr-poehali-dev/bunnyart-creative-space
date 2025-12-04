import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface MediaItem {
  id: number;
  title: string;
  type: 'photo' | 'video' | 'track' | 'text';
  url: string;
  thumbnail?: string;
  likes: number;
  comments: Comment[];
}

interface HomeSectionProps {
  mediaItems: MediaItem[];
  onItemClick: (item: MediaItem) => void;
  onLike: (itemId: number) => void;
}

export default function HomeSection({ mediaItems, onItemClick, onLike }: HomeSectionProps) {
  return (
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
              onClick={() => onItemClick(item)}
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
                        onLike(item.id);
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
}
