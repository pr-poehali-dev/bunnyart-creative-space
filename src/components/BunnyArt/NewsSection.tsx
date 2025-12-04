import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export default function NewsSection() {
  return (
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
}
