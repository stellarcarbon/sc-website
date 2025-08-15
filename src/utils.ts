import { useEffect, useState, useRef, RefObject } from "react";
import { useRouter } from "next/navigation";
import { NavigateOptions } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { isEmail } from "validator";

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

export const formatDate = (date: Date): string => {
  const day = date.getDate().toString();

  const month = date.toLocaleDateString("en-US", { month: "long" });

  const year = date.getFullYear();

  return `${day} ${month} ${year}`;
};

export function validateEmail(email: string): boolean {
  return isEmail(email, {
    allow_utf8_local_part: false,
    allow_ip_domain: false,
    require_tld: true,
  });
}
