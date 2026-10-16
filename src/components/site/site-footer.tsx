import { Container, Eyebrow, Link, Text } from "@/components/ui";

const columns = [
  {
    title: "Client services",
    links: [
      { label: "Contact us", href: "/client-services" },
      { label: "Shipping", href: "/client-services/shipping" },
      { label: "Returns", href: "/client-services/returns" },
      { label: "Care guide", href: "/client-services/care" },
    ],
  },
  {
    title: "The house",
    links: [
      { label: "About Atelier", href: "/about" },
      { label: "Craftsmanship", href: "/about/craft" },
      { label: "Stores", href: "/stores" },
      { label: "Careers", href: "/careers" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy policy", href: "/legal/privacy" },
      { label: "Terms of sale", href: "/legal/terms" },
      { label: "Cookie settings", href: "/legal/cookies" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="border-t bg-surface">
      <Container className="grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr] lg:py-20">
        <div className="flex max-w-sm flex-col gap-4">
          <span className="font-serif text-h3 tracking-[0.28em] uppercase">Atelier</span>
          <Text size="small" muted>
            Leather goods, ready-to-wear and accessories, made in small runs by the workshops we know by name.
          </Text>
        </div>
        {columns.map((column) => (
          <nav key={column.title} aria-label={column.title} className="flex flex-col gap-5">
            <Eyebrow>{column.title}</Eyebrow>
            <ul className="flex flex-col gap-3">
              {column.links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-small text-ink-soft">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </Container>
      <Container className="flex flex-col gap-2 border-t py-6 sm:flex-row sm:justify-between">
        <Text size="small" muted>© 2026 Atelier. All rights reserved.</Text>
        <Text size="small" muted>Photography courtesy of Unsplash.</Text>
      </Container>
    </footer>
  );
}
