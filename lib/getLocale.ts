import "server-only";

import { cookies } from "next/headers";
import { cache } from "react";

import { LOCALE_COOKIE, type Locale } from "@/lib/dictionaries";

/**
 * Aktuální jazyk ze cookie (server-side). Bez cookie = čeština.
 * `cache()` = jedno čtení na request, i když ho volá víc komponent.
 */
export const getLocale = cache(async (): Promise<Locale> => {
  const store = await cookies();
  return store.get(LOCALE_COOKIE)?.value === "en" ? "en" : "cs";
});
