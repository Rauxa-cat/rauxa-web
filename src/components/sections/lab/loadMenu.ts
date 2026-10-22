import { getTranslations } from 'next-intl/server';
import { KITCHEN, WINES } from '@/lib/content/menu';

export async function loadMenu() {
  const t = await getTranslations('lab.menu');

  return {
    kitchen: KITCHEN.map((section) => ({
      id: section.id,
      name: t(`sections.${section.id}`),
      dishes: section.dishes.map((dish) => ({
        id: dish.id,
        name: t(`dishes.${dish.id}.name`),
        description: t.has(`dishes.${dish.id}.desc`)
          ? t(`dishes.${dish.id}.desc`)
          : undefined,
        price: dish.price,
        perUnit: 'perUnit' in dish && dish.perUnit,
      })),
    })),
    wines: WINES.map((group) => ({
      id: group.id,
      name: t(`sections.${group.id}`),
      wines: group.wines,
    })),
  };
}

export type Menu = Awaited<ReturnType<typeof loadMenu>>;
