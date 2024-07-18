import { useEffect, useState, useRef, RefObject } from "react";
import { useRouter } from "next/navigation";
import { NavigateOptions } from "next/dist/shared/lib/app-router-context.shared-runtime";

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
      window.scrollTo(0, 0);
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
