import { Container, Eyebrow, Link, Text } from "@/components/ui";

const services = [
  {
    title: "Complimentary delivery",
    body: "Free express shipping and returns on every order, wrapped in our signature box.",
    href: "/client-services/shipping",
    cta: "Shipping details",
  },
  {
    title: "Book an appointment",
    body: "Shop in person or by video with a client advisor, at a time that suits you.",
    href: "/client-services/appointments",
    cta: "Book now",
  },
  {
    title: "Personalisation",
    body: "Hot-stamped initials on selected leather goods, added in our workshop.",
    href: "/client-services/personalisation",
    cta: "Learn more",
  },
];

export function Services() {
  return (
    <section className="border-t">
      <Container>
        <ul className="grid divide-y md:grid-cols-3 md:divide-x md:divide-y-0">
          {services.map((service) => (
            <li key={service.title} className="flex flex-col items-center gap-4 px-6 py-12 text-center md:py-16">
              <Eyebrow>{service.title}</Eyebrow>
              <Text size="small" muted className="max-w-xs">
                {service.body}
              </Text>
              <Link href={service.href} variant="underline" className="text-small">
                {service.cta}
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
