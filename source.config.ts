import { defineConfig, defineDocs } from 'fumadocs-mdx/config';
import { metaSchema, pageSchema } from 'fumadocs-core/source/schema';
import type { Node, Parent, Literal } from 'unist';

// Single source of truth for the published version shown in install snippets.
// CI can override this via the CONDUIT_VERSION env var (e.g. from the latest
// GitHub release); otherwise it falls back to this baseline.
const CONDUIT_VERSION = process.env.CONDUIT_VERSION || '0.2.3';
const CONDUIT_SNAPSHOT_VERSION =
  process.env.CONDUIT_SNAPSHOT_VERSION || '0.3.2-beta-SNAPSHOT';
// Note: this fallback is cosmetic. In CI the real value is stamped from
// Conduit's gradle.properties, so the published docs always track the current
// snapshot regardless of this string.

// Replaces version tokens in text/code nodes at build time, before syntax
// highlighting runs, so dependency snippets stay highlighted and copy-pasteable
// with the real versions. The snapshot token is replaced first so it cannot be
// partially clobbered by the stable token.
function remarkConduitVersion() {
  return (tree: Node) => {
    const walk = (node: Node) => {
      const literal = node as Literal;
      if (typeof literal.value === 'string') {
        literal.value = literal.value
          .split('CONDUIT_SNAPSHOT_VERSION')
          .join(CONDUIT_SNAPSHOT_VERSION)
          .split('CONDUIT_VERSION')
          .join(CONDUIT_VERSION);
      }
      const parent = node as Parent;
      if (Array.isArray(parent.children)) parent.children.forEach(walk);
    };
    walk(tree);
  };
}

// You can customize Zod schemas for frontmatter and `meta.json` here
// see https://fumadocs.dev/docs/mdx/collections
export const docs = defineDocs({
  dir: 'content/docs',
  docs: {
    schema: pageSchema,
    postprocess: {
      includeProcessedMarkdown: true,
    },
  },
  meta: {
    schema: metaSchema,
  },
});

export default defineConfig({
  mdxOptions: {
    remarkPlugins: [remarkConduitVersion],
    // Catppuccin syntax themes pair well with the violet brand palette.
    rehypeCodeOptions: {
      themes: {
        light: 'catppuccin-latte',
        dark: 'catppuccin-mocha',
      },
    },
  },
});
