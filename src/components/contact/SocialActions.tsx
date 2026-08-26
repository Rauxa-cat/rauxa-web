import { Button } from '@/components/ui/button';
import { MessageCircle } from 'lucide-react';
import { InstagramIcon } from '@/components/icons/InstagramIcon';
import { cn } from '@/lib/utils';

type SocialActionsProps = {
  whatsappUrl: string;
  instagramUrl: string;
  className?: string;
  size?: 'default' | 'lg';
};

export function SocialActions({
  whatsappUrl,
  instagramUrl,
  className,
  size = 'default',
}: SocialActionsProps) {
  const baseBtn = cn(
    'rounded-none font-semibold',
    size === 'lg' ? 'h-13 px-6' : 'h-11 px-5',
  );

  return (
    <div className={cn('flex flex-wrap gap-3', className)}>
      <Button asChild size={size} variant="outline" className={baseBtn}>
        <a href={whatsappUrl} target="_blank" rel="noreferrer">
          <MessageCircle className="mr-2 size-4" />
          WhatsApp
        </a>
      </Button>

      <Button asChild size={size} variant="outline" className={baseBtn}>
        <a href={instagramUrl} target="_blank" rel="noreferrer">
          <InstagramIcon className="mr-2 size-4" />
          Instagram
        </a>
      </Button>
    </div>
  );
}
