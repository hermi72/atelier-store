import Image from "next/image";
import NextLink from "next/link";
import { Container, Eyebrow, Heading, Section } from "@/components/ui";
import { collections } from "@/lib/catalog";

/** Swipeable on phones, a three-up grid from tablet width. */
export function CollectionRow() {
  return (
    <Section>
      <Container>
        <div className="mb-10 flex flex-col gap-3">
          <Eyebrow className="text-muted">Shop by category</Eyebrow>
          <Heading size="h2">The collections</Heading>
        </div>
      </Container>
      <div className="container-page">
        <ul className="-mx-gutter flex snap-x snap-mandatory gap-2 overflow-x-auto scroll-px-gutter px-gutter [scrollbar-width:none] sm:mx-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:overflow-visible sm:px-0">
          {collections.map((collection) => (
            <li key={collection.slug} className="w-[78%] shrink-0 snap-start sm:w-auto">
              <NextLink href={`/collections/${collection.slug}`} className="group block">
                <div className="relative aspect-portrait overflow-hidden bg-surface">
                  <Image
                    src={collection.image.src}
                    alt={collection.image.alt}
                    fill
                    sizes="(min-width: 40rem) 33vw, 78vw"
                    className="object-cover transition-transform duration-700 ease-luxe group-hover:scale-[1.03]"
                  />
                </div>
                <div className="mt-4 flex items-baseline justify-between gap-4">
                  <span className="font-serif text-h3">{collection.title}</span>
                  <span className="eyebrow link-reveal group-hover:bg-size-[100%_1px]">Shop</span>
                </div>
              </NextLink>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
