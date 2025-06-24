"use client";

import posthog from "posthog-js";
import { PostHogProvider as PHProvider, usePostHog } from "posthog-js/react";
import { Suspense, useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    async function initPosthog() {
      // TODO: try to fix this fallback mechanism
      // let apiHost = "https://eu.i.posthog.com";
      // try {
      //   await fetch(apiHost, { method: "HEAD", mode: "no-cors" });
      // } catch (error) {
      //   apiHost = "/ingest";
      // }
      let apiHost = "/prettylog";
      posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
        autocapture: false,
        api_host: apiHost,
        ui_host: "https://eu.posthog.com",
        persistence: "localStorage",
        capture_pageview: false, // We capture pageviews manually
        capture_pageleave: true, // Enable pageleave capture
      });

      if (posthog.has_opted_in_capturing()) {
        posthog.set_config({ autocapture: true });
      }
    }

    initPosthog();
  }, []);

  return (
    <PHProvider client={posthog}>
      <SuspendedPostHogPageView />
      {children}
    </PHProvider>
  );
}

function PostHogPageView() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const posthog = usePostHog();

  useEffect(() => {
    if (pathname && posthog) {
      let url = window.origin + pathname;
      const search = searchParams.toString();
      if (search) {
        url += "?" + search;
      }
      posthog.capture("$pageview", { $current_url: url });
    }
  }, [pathname, searchParams, posthog]);

  return null;
}

function SuspendedPostHogPageView() {
  return (
    <Suspense fallback={null}>
      <PostHogPageView />
    </Suspense>
  );
}
