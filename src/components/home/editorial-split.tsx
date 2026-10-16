import Image from "next/image";
import { ButtonLink, Eyebrow, Heading, Text } from "@/components/ui";
import type { CatalogImage } from "@/lib/catalog";
import { cn } from "@/lib/cn";

type EditorialSplitProps = {
  eyebrow: string;
  title: string;
  body: string;
  cta: string;
  href: string;
  image: CatalogImage;
  /** Put the image on the right on desktop. */
  reverse?: boolean;
};

/** Edge-to-edge image half beside a quiet copy half; stacks on phones. */
export function EditorialSplit({ eyebrow, title, body, cta, href, image, reverse }: EditorialSplitProps) {
  return (
    <section className="grid border-t md:grid-cols-2">
      <div className={cn("relative aspect-portrait md:aspect-auto md:min-h-[42rem]", reverse && "md:order-2")}>
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes="(min-width: 48rem) 50vw, 100vw"
          style={image.position ? { objectPosition: image.position } : undefined}
          className="object-cover"
        />
      </div>
      <div className="flex items-center px-gutter py-section md:px-[clamp(2rem,6vw,7rem)]">
        <div className="flex max-w-md flex-col items-start gap-6">
          <Eyebrow className="text-muted">{eyebrow}</Eyebrow>
          <Heading size="h1">{title}</Heading>
          <Text size="lead" className="text-ink-soft">{body}</Text>
          <ButtonLink href={href} variant="secondary" className="mt-2">
            {cta}
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
