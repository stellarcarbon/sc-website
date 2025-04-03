import { useEffect, useState, useRef, RefObject } from "react";
import { useRouter } from "next/navigation";
import { NavigateOptions } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { RequestCertificateResponse } from "@/client";

export function debounce<T extends (...args: any[]) => void>(
  func: T,
  wait: number
): { call: (...args: Parameters<T>) => void; cancel: () => void } {
  let timeout: NodeJS.Timeout | null = null;

  const call = (...args: Parameters<T>) => {
    const later = () => {
      timeout = null;
      func(...args);
    };

    if (timeout) {
      clearTimeout(timeout);
    }

    timeout = setTimeout(later, wait);
  };

  const cancel = () => {
    if (timeout) {
      clearTimeout(timeout);
      timeout = null;
    }
  };

  return { call, cancel };
}

// Used for parallax scrolling behavior
export const useIntersectionObserver = (
  options: IntersectionObserverInit
): [RefObject<HTMLDivElement>, boolean] => {
  const [isIntersecting, setIntersecting] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIntersecting(entry.isIntersecting);
    }, options);

    if (ref.current) {
      observer.observe(ref.current);
    }

    const delRef = ref.current;

    return () => {
      if (delRef) {
        observer.unobserve(delRef);
      }
    };
  }, [ref, options]);

  return [ref, isIntersecting];
};

const defaultNavigationOptions = {
  scroll: true,
};

export function useSCRouter() {
  const router = useRouter();

  const scPush = (url: string, options: NavigateOptions = {}) => {
    const mergedOptions = { ...defaultNavigationOptions, ...options };
    router.push(url, mergedOptions);
    if (mergedOptions.scroll) {
      window.scrollTo({ top: 0, behavior: "instant" });
    }
  };

  return {
    ...router,
    push: scPush,
  };
}

export const useViewportWidth = () => {
  const mf = () => {
    if (typeof window !== "undefined") {
      return window.innerWidth > 768;
    } else {
      return false;
    }
  };

  const [isWide, setIsWide] = useState(mf);

  useEffect(() => {
    const handleResize = () => {
      setIsWide(window.innerWidth > 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isWide;
};

/**
 * Had to recreate this function from the api client because we cannot inject headers.
 */
export const mRequestCertificate = async ({
  recipientAddress,
  email,
  jwt,
}: {
  /**
   * the account for which a retirement certificate will be issued
   */
  recipientAddress: string;
  /**
   * email address that will receive the Verra certificate (also supports `Your Name <account@domain.xyz>` format)
   */
  email: string;
  // jwt used to prove identity for this request
  jwt: string;
}): Promise<RequestCertificateResponse | undefined> => {
  let baseUrl;
  if (process.env.NEXT_PUBLIC_PRODUCTION === "development") {
    baseUrl = "http://localhost:8000";
    // OpenAPI.BASE = "https://api.stellarcarbon.io";
  } else if (process.env.NEXT_PUBLIC_PRODUCTION === "production") {
    baseUrl = "https://api.stellarcarbon.io";
  } else {
    baseUrl = "https://api.stellarcarbon.io/test";
  }

  const response = await fetch(
    `${baseUrl}/recipients/${recipientAddress}/request-certificate?email=${email}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    }
  );

  if (response.ok) {
    const body = await response.json();
    const result: RequestCertificateResponse = {
      account: body["account"],
      certificate_amount: body["certificate_amount"],
      pending_balance_after_retirement:
        body["pending_balance_after_retirement"],
    };
    return result;
  }
};

export const isValidEmail = (addr: string) => {
  const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  return regex.test(addr);
};

export const formatDate = (date: Date): string => {
  const day = date.getDate().toString();

  const month = date.toLocaleDateString("en-US", { month: "long" });

  const year = date.getFullYear();

  return `${day} ${month} ${year}`;
};
