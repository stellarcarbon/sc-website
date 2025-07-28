import { useCallback, useMemo, useState } from "react";

export function useSEP10JWT() {
  const [jwt, setJwt] = useState<string>();

  const updateJwt = useCallback((newJwt: string) => {
    SEP10JWTService.setJWT(newJwt);
    setJwt(newJwt);
  }, []);

  const expired = useMemo(() => {
    if (!jwt) return true;

    try {
      const [, payload] = jwt.split(".");
      const decoded = JSON.parse(atob(payload));
      if (!decoded.exp) return true;

      const now = Math.floor(Date.now() / 1000);
      return decoded.exp < now;
    } catch {
      return true;
    }
  }, [jwt]);

  return {
    jwt,
    updateJwt,
    expired,
  };
}

class SEP10JWTService {
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
