"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import NextLink from "next/link";
import { CloseIcon, MenuIcon } from "./icons";

type MobileMenuProps = {
  items: Array<{ label: string; href: string }>;
};

export function MobileMenu({ items }: MobileMenuProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        className="-ml-2 p-2 lg:hidden"
        aria-label="Open menu"
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={() => setOpen(true)}
      >
        <MenuIcon />
      </button>

      {/* Portal: the header's backdrop-filter would otherwise become the
          containing block for this fixed overlay. */}
      {open &&
        createPortal(
          <div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            className="fixed inset-0 z-50 flex flex-col bg-paper lg:hidden"
          >
            <div className="flex h-header items-center border-b px-gutter">
              <button
                type="button"
                className="-ml-2 p-2"
                aria-label="Close menu"
                onClick={() => setOpen(false)}
                autoFocus
              >
                <CloseIcon />
              </button>
            </div>
            <nav className="flex-1 overflow-y-auto px-gutter py-6">
              <ul>
                {items.map((item) => (
                  <li key={item.href} className="border-b">
                    <NextLink href={item.href} className="block py-5 font-serif text-h3" onClick={() => setOpen(false)}>
                      {item.label}
                    </NextLink>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="flex flex-col gap-4 border-t px-gutter py-6">
              <NextLink href="/account" className="eyebrow" onClick={() => setOpen(false)}>
                Account
              </NextLink>
              <NextLink href="/client-services" className="eyebrow" onClick={() => setOpen(false)}>
                Client services
              </NextLink>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
