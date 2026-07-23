export const STELLAR_NETWORKS = {
  PUBLIC: "Public Global Stellar Network ; September 2015",
  TESTNET: "Test SDF Network ; September 2015",
} as const;

export type StellarNetworkPassphrase =
  (typeof STELLAR_NETWORKS)[keyof typeof STELLAR_NETWORKS];

export const isPublicNetwork = (network: string): boolean => {
  return network === STELLAR_NETWORKS.PUBLIC;
};
