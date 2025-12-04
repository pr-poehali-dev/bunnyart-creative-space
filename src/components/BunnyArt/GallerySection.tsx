import Icon from '@/components/ui/icon';
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

interface GallerySectionProps {
  type: 'photo' | 'video' | 'track' | 'text';
  mediaItems: MediaItem[];
  onItemClick: (item: MediaItem) => void;
  onLike: (itemId: number) => void;
}

const titles = {
  photo: 'Фотогалерея',
  video: 'Видеогалерея',
  track: 'Музыкальная коллекция',
  text: 'Тексты и книги'
};

export default function GallerySection({ type, mediaItems, onItemClick, onLike }: GallerySectionProps) {
  const filteredItems = mediaItems.filter(item => item.type === type);

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
            onClick={() => onItemClick(item)}
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
                    onLike(item.id);
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
}
