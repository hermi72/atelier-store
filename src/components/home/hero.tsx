import Image from "next/image";
import { ButtonLink, Eyebrow, Heading, Text } from "@/components/ui";
import { heroImage } from "@/lib/catalog";

/**
 * Editorial split: the campaign image takes the larger share edge-to-edge and
 * the copy sits on paper beside it, so text never fights the photograph.
 * Stacks image-over-copy on phones.
 */
export function Hero() {
  return (
    <section className="grid md:min-h-[min(88svh,56rem)] md:grid-cols-[3fr_2fr]">
      <div className="relative aspect-[4/5] sm:aspect-[4/3] md:aspect-auto">
        <Image
          src={heroImage.src}
          alt={heroImage.alt}
          fill
          preload
          sizes="(min-width: 48rem) 60vw, 100vw"
          style={{ objectPosition: heroImage.position }}
          className="object-cover"
        />
      </div>
      <div className="flex items-center px-gutter py-12 md:py-section lg:px-[clamp(2.5rem,5vw,6rem)]">
        <div className="flex max-w-md flex-col items-start gap-6">
          <Eyebrow>Autumn–Winter 2026</Eyebrow>
          <Heading as="h1" size="display">
            The Quiet <em className="italic">Season</em>
          </Heading>
          <Text size="lead" className="text-ink-soft">
            Oversized wool, sculpted leather and a palette pared back to black.
          </Text>
          <div className="mt-2 flex flex-wrap gap-3">
            <ButtonLink href="/collections/autumn-winter">Discover the collection</ButtonLink>
            <ButtonLink href="/collections/new-in" variant="secondary">
              New in
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
