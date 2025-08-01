import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
} from "react";

export function useSEP10JWT(
  setJwt: Dispatch<SetStateAction<string | undefined>>
) {
  const updateJwt = useCallback(
    (newJwt: string) => {
      SEP10JWTService.setJWT(newJwt);
      setJwt(newJwt);
    },
    [setJwt]
  );

  const isJwtExpired = useCallback((token: string) => {
    try {
      const [, payload] = token.split(".");
      const decoded = JSON.parse(atob(payload));
      if (!decoded.exp) return true;

      const now = Math.floor(Date.now() / 1000);
      const safetyMargin = 3 * 3600; // Make sure there is a least 3 hours remaining
      return decoded.exp < now + safetyMargin;
    } catch {
      return true;
    }
  }, []);

  useEffect(() => {
    const storedToken = SEP10JWTService.getJWT();
    if (storedToken === null) return;

    if (isJwtExpired(storedToken)) {
      SEP10JWTService.removeJWT();
      return;
    }

    setJwt(storedToken);
  }, [setJwt, isJwtExpired]);

  return {
    updateJwt,
  };
}

export class SEP10JWTService {
  private static LOCAL_STORAGE_KEY = "sc_account_token";

  public static setJWT(jwt: string): void {
    localStorage.setItem(this.LOCAL_STORAGE_KEY, jwt);
  }

  public static getJWT(): string | null {
    return localStorage.getItem(this.LOCAL_STORAGE_KEY);
  }

  public static removeJWT(): void {
    localStorage.removeItem(this.LOCAL_STORAGE_KEY);
  }
}
