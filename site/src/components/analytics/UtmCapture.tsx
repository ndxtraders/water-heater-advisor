"use client";

import { useEffect } from "react";

import { captureUtm } from "@/lib/quiz/utm";

/**
 * Captures campaign parameters once, on first load, anywhere on the site.
 *
 * It has to live in the root layout rather than in the quiz. A homeowner
 * arrives on a guide page with `?utm_source=...`, reads for five minutes, then
 * clicks through to the quiz — by which point `location.search` is long gone.
 * Reading it at the landing page and stashing it in sessionStorage is what
 * connects the eventual lead back to the channel that produced it.
 *
 * Renders nothing, writes nothing to the DOM, and cannot fail visibly.
 */
export default function UtmCapture() {
  useEffect(() => {
    captureUtm();
  }, []);
  return null;
}
