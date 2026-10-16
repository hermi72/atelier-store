import NextLink from "next/link";
import { Link } from "@/components/ui";
import { navigation } from "@/lib/catalog";
import { AccountIcon, BagIcon, SearchIcon } from "./icons";
import { MobileMenu } from "./mobile-menu";

export function SiteHeader() {
  return (
    <>
      <p className="bg-ink px-gutter py-2.5 text-center eyebrow text-paper">
        Complimentary shipping and returns
      </p>
      <header className="sticky top-0 z-40 border-b bg-paper/95 backdrop-blur-sm">
        {/* Three equal columns keep the wordmark optically centered. */}
        <div className="container-page grid h-header grid-cols-[1fr_auto_1fr] items-center lg:h-header-lg">
          <div className="flex items-center">
            <MobileMenu items={navigation} />
            <nav aria-label="Main" className="hidden lg:block">
              <ul className="flex gap-7">
                {navigation.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="eyebrow">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <NextLink href="/" className="font-serif text-[1.625rem] leading-none tracking-[0.28em] uppercase lg:text-[2rem]">
            Atelier
          </NextLink>

          <div className="flex items-center justify-end gap-1 sm:gap-3">
            <NextLink href="/search" className="p-2" aria-label="Search">
              <SearchIcon />
            </NextLink>
            <NextLink href="/account" className="hidden p-2 sm:block" aria-label="Account">
              <AccountIcon />
            </NextLink>
            <NextLink href="/bag" className="-mr-2 flex items-center gap-1 p-2" aria-label="Shopping bag, 0 items">
              <BagIcon />
              <span className="text-label tabular-nums">0</span>
            </NextLink>
          </div>
        </div>
      </header>
    </>
  );
}
