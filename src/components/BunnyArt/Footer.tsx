import Icon from '@/components/ui/icon';

const socialLinks = [
  { name: 'TikTok', icon: 'Music', url: '#' },
  { name: 'Telegram', icon: 'Send', url: '#' },
  { name: 'Likee', icon: 'Heart', url: '#' },
  { name: 'VK', icon: 'Users', url: '#' }
];

export default function Footer() {
  return (
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
  );
}
