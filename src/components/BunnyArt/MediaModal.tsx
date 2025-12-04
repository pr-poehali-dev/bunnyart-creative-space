import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';

interface Comment {
  id: number;
  author: string;
  text: string;
  date: string;
}

interface MediaItem {
  id: number;
  title: string;
  type: 'photo' | 'video' | 'track' | 'text';
  url: string;
  thumbnail?: string;
  likes: number;
  comments: Comment[];
}

interface MediaModalProps {
  item: MediaItem | null;
  commentText: string;
  onClose: () => void;
  onLike: (itemId: number) => void;
  onComment: (itemId: number) => void;
  onCommentChange: (text: string) => void;
}

export default function MediaModal({ 
  item, 
  commentText, 
  onClose, 
  onLike, 
  onComment, 
  onCommentChange 
}: MediaModalProps) {
  if (!item) return null;

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 animate-fade-in"
      onClick={onClose}
    >
      <div 
        className="max-w-4xl w-full bg-card rounded-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative">
          <img 
            src={item.url} 
            alt={item.title}
            className="w-full max-h-[60vh] object-contain"
          />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-black/50 rounded-full hover:bg-black/70 transition-colors"
          >
            <Icon name="X" size={24} />
          </button>
        </div>
        
        <div className="p-6 space-y-4">
          <h3 className="text-2xl font-heading font-bold">{item.title}</h3>
          
          <div className="flex items-center gap-6">
            <button 
              onClick={() => onLike(item.id)}
              className="flex items-center gap-2 text-muted-foreground hover:text-accent transition-colors"
            >
              <Icon name="Heart" size={24} />
              <span className="text-lg">{item.likes}</span>
            </button>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Icon name="MessageCircle" size={24} />
              <span className="text-lg">{item.comments.length}</span>
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <h4 className="font-heading font-semibold">Комментарии</h4>
            
            <ScrollArea className="h-40">
              {item.comments.length === 0 ? (
                <p className="text-muted-foreground text-center py-8">Пока нет комментариев</p>
              ) : (
                <div className="space-y-3">
                  {item.comments.map((comment) => (
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
                onChange={(e) => onCommentChange(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && onComment(item.id)}
              />
              <Button onClick={() => onComment(item.id)}>
                <Icon name="Send" size={20} />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
