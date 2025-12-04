import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';

const socialLinks = [
  { name: 'TikTok', icon: 'Music', url: '#' },
  { name: 'Telegram', icon: 'Send', url: '#' },
  { name: 'Likee', icon: 'Heart', url: '#' },
  { name: 'VK', icon: 'Users', url: '#' }
];

export default function ContactSection() {
  return (
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
}
