"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { SetPointMark } from "@/components/layout/Logo";
import { ButtonLink } from "@/components/ui/Button";
import { site } from "@/lib/site";

/**
 * Mark plus wordmark.
 *
 * Through V.3 this was type alone, with the differentiation carried by a weight
 * split — "Water Heater" muted, "Advisor" emphasised — on the argument that the
 * site's whole claim sits in that second word. The set-point mark now carries
 * that job better than a weight change can, so the type runs at one weight and
 * the mark does the distinguishing. Every plumbing competitor in the SERP is a
 * geometric sans logotype next to a phone number; this should not be mistaken
 * for one before a visitor has read a word.
 */
function Wordmark() {
  return (
    <Link href="/" className="group inline-flex items-center gap-2.5 font-heading">
      <SetPointMark width={46} className="text-foreground" />
      <span className="text-[1.0625rem] font-extrabold tracking-tight text-navy transition-colors group-hover:text-blue">
        Water Heater Advisor
      </span>
    </Link>
  );
}

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/85 backdrop-blur-sm">
      <div className="mx-auto w-full max-w-5xl px-5 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-6">
          <Wordmark />

          <nav aria-label="Primary" className="hidden md:block">
            <ul className="flex items-center gap-7">
              {site.nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="hidden md:block">
            <ButtonLink href="/quiz" size="md">
              Find my system
            </ButtonLink>
          </div>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            className="-mr-2 inline-flex size-11 items-center justify-center rounded-md text-foreground md:hidden"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {open ? (
        <div id="mobile-nav" className="border-t border-border bg-background md:hidden">
          <nav aria-label="Primary mobile" className="mx-auto w-full max-w-5xl px-5 py-4">
            <ul className="space-y-1">
              {site.nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="flex min-h-11 items-center rounded-md px-2 text-[0.9375rem] hover:bg-muted"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <ButtonLink
              href="/quiz"
              size="lg"
              className="mt-4 w-full"
              onClick={() => setOpen(false)}
            >
              Find my system
            </ButtonLink>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
