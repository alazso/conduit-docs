import Link from 'next/link';

const features = [
  {
    title: 'Async by default',
    body: 'Every operation returns a CompletableFuture. There is no blocking facade, so a database call never freezes the main thread.',
  },
  {
    title: 'BigDecimal everywhere',
    body: 'No double anywhere in the public API. Floating-point money drift is structurally impossible.',
  },
  {
    title: 'UUID-first',
    body: 'Accounts are keyed by UUID. Names change; UUIDs do not.',
  },
  {
    title: 'Capability-aware',
    body: 'Ask what a provider supports, structurally and via flags, before you call it. No UnsupportedOperationException surprises.',
  },
  {
    title: 'Typed results & events',
    body: 'Sealed EconomyResult cases, post-commit events, and synchronous pre-auth interceptors.',
  },
  {
    title: 'Not a Vault fork',
    body: 'Conduit is its own API under so.alaz.conduit. It does not shim, wrap, or pretend to be Vault.',
  },
];

const snippet = `Conduit.whenProviderAvailable(Economy.class, economy ->
    economy.deposit(playerId, new BigDecimal("100.00"), "daily reward")
        .thenAccept(result -> result.ifSuccess(s ->
            getLogger().info("New balance: " + economy.format(s.newBalance())))));`;

export default function HomePage() {
  return (
    <main className="flex flex-1 flex-col">
      {/* Hero */}
      <section className="mx-auto flex max-w-4xl flex-col items-center px-4 py-20 text-center">
        <div className="mb-5 flex flex-wrap items-center justify-center gap-2 text-xs font-medium text-fd-muted-foreground">
          <span className="rounded-full border border-fd-border px-3 py-1">Paper / Folia</span>
          <span className="rounded-full border border-fd-border px-3 py-1">Java 25</span>
          <span className="rounded-full border border-fd-border px-3 py-1">Async-first</span>
          <span className="rounded-full border border-fd-border px-3 py-1">BigDecimal</span>
        </div>

        <h1 className="bg-gradient-to-b from-fd-foreground to-fd-foreground/70 bg-clip-text text-5xl font-bold tracking-tight text-transparent sm:text-6xl">
          Conduit
        </h1>
        <p className="mt-4 text-lg font-medium text-fd-foreground sm:text-xl">
          A modern Economy abstraction for Minecraft.
        </p>
        <p className="mt-3 max-w-2xl text-fd-muted-foreground">
          One interface, many backends, zero coupling between the plugins that spend money and the
          plugin that stores it. Async-first, BigDecimal-everywhere, UUID-native.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/docs"
            className="rounded-lg bg-fd-primary px-5 py-2.5 text-sm font-semibold text-fd-primary-foreground transition-opacity hover:opacity-90"
          >
            Get Started
          </Link>
          <Link
            href="/docs/migration-from-vault"
            className="rounded-lg border border-fd-border px-5 py-2.5 text-sm font-semibold text-fd-foreground transition-colors hover:bg-fd-accent"
          >
            Migrating from Vault
          </Link>
          <a
            href="https://github.com/alazso/Conduit"
            target="_blank"
            rel="noreferrer"
            className="rounded-lg border border-fd-border px-5 py-2.5 text-sm font-semibold text-fd-foreground transition-colors hover:bg-fd-accent"
          >
            GitHub
          </a>
        </div>
      </section>

      {/* Code snippet */}
      <section className="mx-auto w-full max-w-3xl px-4">
        <div className="overflow-hidden rounded-xl border border-fd-border bg-fd-card shadow-sm">
          <div className="flex items-center gap-1.5 border-b border-fd-border px-4 py-2.5">
            <span className="size-3 rounded-full bg-red-400/80" />
            <span className="size-3 rounded-full bg-yellow-400/80" />
            <span className="size-3 rounded-full bg-green-400/80" />
            <span className="ml-2 text-xs text-fd-muted-foreground">RewardPlugin.java</span>
          </div>
          <pre className="overflow-x-auto p-4 text-sm leading-relaxed">
            <code className="text-fd-foreground">{snippet}</code>
          </pre>
        </div>
        <p className="mt-3 text-center text-sm text-fd-muted-foreground">
          Resolve the active economy, move money, and react to the typed result. Off the main
          thread, with no load-order races.
        </p>
      </section>

      {/* Features */}
      <section className="mx-auto w-full max-w-5xl px-4 py-20">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <div
              key={f.title}
              className="rounded-xl border border-fd-border bg-fd-card p-5 transition-colors hover:border-fd-foreground/20"
            >
              <h3 className="font-semibold text-fd-foreground">{f.title}</h3>
              <p className="mt-2 text-sm text-fd-muted-foreground">{f.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="mx-auto w-full max-w-3xl px-4 pb-24 text-center">
        <h2 className="text-2xl font-bold text-fd-foreground">Build on Conduit</h2>
        <p className="mx-auto mt-3 max-w-xl text-fd-muted-foreground">
          Whether you are spending money in a plugin, implementing an economy backend, or bridging an
          existing one, the guides walk you through it.
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-sm font-medium">
          <Link href="/docs/consumer-guide" className="text-fd-foreground underline-offset-4 hover:underline">
            Consumer Guide
          </Link>
          <span className="text-fd-muted-foreground">·</span>
          <Link href="/docs/provider-guide" className="text-fd-foreground underline-offset-4 hover:underline">
            Provider Guide
          </Link>
          <span className="text-fd-muted-foreground">·</span>
          <Link href="/docs/building-a-bridge" className="text-fd-foreground underline-offset-4 hover:underline">
            Building a Bridge
          </Link>
          <span className="text-fd-muted-foreground">·</span>
          <Link href="/docs/how-to" className="text-fd-foreground underline-offset-4 hover:underline">
            How-To Recipes
          </Link>
        </div>
      </section>
    </main>
  );
}
