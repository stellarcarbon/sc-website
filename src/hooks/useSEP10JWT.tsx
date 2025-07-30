import { useAppContext } from "@/context/appContext";
import { buildSinkCarbonXdr } from "@stellarcarbon/sc-sdk";
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
} from "react";

export function useSEP10JWT(
  jwt: string | undefined,
  setJwt: Dispatch<SetStateAction<string | undefined>>
) {
  const updateJwt = useCallback(
    (newJwt: string) => {
      SEP10JWTService.setJWT(newJwt);
      setJwt(newJwt);
    },
    [setJwt]
  );

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

  useEffect(() => {
    const storedToken = SEP10JWTService.getJWT();
    if (storedToken !== null) {
      setJwt(storedToken);
    }
  }, [setJwt]);

  return {
    updateJwt,
    expired,
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
