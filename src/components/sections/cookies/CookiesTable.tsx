import { getTranslations } from 'next-intl/server';
import type { CookieEntry } from '@/lib/content/cookies';

const COLUMNS = ['name', 'owner', 'purpose', 'duration'] as const;

// Below md each row stacks into a card and every cell carries its own label,
// since four columns of prose do not fit a phone without scrolling sideways.
export async function CookiesTable({
  group,
  cookies,
}: {
  group: string;
  cookies: readonly CookieEntry[];
}) {
  const t = await getTranslations('cookies');

  return (
    <table className="w-full border-collapse text-sm max-md:block md:text-base">
      <thead className="max-md:hidden">
        <tr className="border-b">
          {COLUMNS.map((column) => (
            <th
              key={column}
              scope="col"
              className="py-3 pr-4 text-left font-semibold last:pr-0"
            >
              {t(`table.${column}`)}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="max-md:block">
        {cookies.map((cookie) => {
          const cells = {
            name: (
              <>
                <code className="rounded bg-muted px-2 py-1 text-sm text-foreground">
                  {cookie.name}
                </code>
                {cookie.storage !== 'cookie' && (
                  <span className="mt-2 block text-xs text-muted-foreground">
                    {t(`storage.${cookie.storage}`)}
                  </span>
                )}
              </>
            ),
            owner: t(`owner.${cookie.owner}`),
            purpose: t(`groups.${group}.cookies.${cookie.key}`),
            duration: t(`duration.${cookie.duration}`),
          };

          return (
            <tr
              key={cookie.name}
              className="border-b max-md:grid max-md:gap-2 max-md:py-4"
            >
              {COLUMNS.map((column) => (
                <td
                  key={column}
                  className="align-top text-muted-foreground max-md:grid max-md:grid-cols-[7rem_1fr] max-md:gap-3 md:py-4 md:pr-4 md:last:pr-0"
                >
                  <span className="font-semibold text-foreground md:hidden">
                    {t(`table.${column}`)}
                  </span>
                  <span>{cells[column]}</span>
                </td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
