import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';

type Section = 'home' | 'photos' | 'videos' | 'tracks' | 'texts' | 'news' | 'contact';

interface HeaderProps {
  currentSection: Section;
  onSectionChange: (section: Section) => void;
}

const menuItems = [
  { id: 'home' as Section, label: 'Главная', icon: 'Home' },
  { id: 'photos' as Section, label: 'Фото', icon: 'Image' },
  { id: 'videos' as Section, label: 'Видео', icon: 'Video' },
  { id: 'tracks' as Section, label: 'Треки', icon: 'Music' },
  { id: 'texts' as Section, label: 'Тексты', icon: 'FileText' },
  { id: 'news' as Section, label: 'Новости', icon: 'Newspaper' },
  { id: 'contact' as Section, label: 'Контакты', icon: 'Mail' }
];

export default function Header({ currentSection, onSectionChange }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-background/80 border-b border-border/50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <button 
            onClick={() => onSectionChange('home')}
            className="text-2xl font-heading font-bold text-gradient hover-scale"
          >
            BunnyArt
          </button>
          
          <nav className="hidden md:flex items-center gap-2">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onSectionChange(item.id)}
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
  );
}
