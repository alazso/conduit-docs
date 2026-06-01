import { source } from '@/lib/source';
import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import { baseOptions } from '@/lib/layout.shared';
import Link from 'next/link';

export default function Layout({ children }: LayoutProps<'/docs'>) {
  return (
    <DocsLayout
      tree={source.getPageTree()}
      {...baseOptions()}
      sidebar={{
        banner: (
          <Link
            href="/docs"
            className="block rounded-lg border border-fd-border bg-gradient-to-br from-fd-primary/10 to-transparent p-3 transition-colors hover:border-fd-primary/40"
          >
            <span className="flex items-center gap-2 font-semibold text-fd-foreground">
              <span
                aria-hidden
                className="inline-flex size-5 items-center justify-center rounded bg-fd-primary text-[10px] text-fd-primary-foreground"
              >
                ⚡
              </span>
              Conduit
            </span>
            <span className="mt-1 block text-xs text-fd-muted-foreground">
              Async, BigDecimal, UUID-first economy for Paper/Folia.
            </span>
          </Link>
        ),
      }}
    >
      {children}
    </DocsLayout>
  );
}
