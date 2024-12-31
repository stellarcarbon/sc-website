# Stellarcarbon Technical Architecture

We have been building the infrastructure needed to connect legacy carbon markets with the new digital economy taking place on public ledgers. Other companies building on Stellar are able to integrate our backend service into their products and services, to give users easy access to eco-credit retirements. On top of this infrastructure, Stellarcarbon itself wants to develop and launch a retail shop aimed at individuals and businesses.

This document first briefly gives an overview of our latest progress, before going into detail on what we want to add in our SCF #33 submission.

TODO: TOC

## Progress

Our infrastructure enables the integration between the Stellar network and traditional carbon credit registries. For our pilot project we've built a connection with the Verra Registry, where we hold an inventory of credits (with additional community and biodiversity benefits) that can be retired on behalf of our users.

At a high level of abstraction, the integration between Stellar and the Verra Registry looks like this:

![High level overview of Verra integration](img/stellar-verra-integration.png)

In 2024, we've hit several major development milestones. We've delivered the full fractional retirements functionality we set out to build at the beginning of the year:

- Open-source data structures, monitoring and auditing [tool](https://github.com/stellarcarbon/sc-audit)
- Public mainnet [data dumps](https://github.com/stellarcarbon/sc-data/tree/main/sc-audit) for those without access to full-history Horizon
- 8 new [API](https://api.stellarcarbon.io/docs) releases, providing account management and a testnet environment
- A new [dApp frontend](https://github.com/stellarcarbon/sc-website/tree/develop) with built in shop and fractional retirements support, to replace our old website

For an extensive description of these milestones, see our [previous architecture doc](/docs/architecture-fractional.md).

As a bonus achievement, we've launched a working (mainnet) [demo dApp](https://new.stellarcarbon.io/) featuring a flight emissions calculator in time for Meridian 2024. Give it a spin!

## Soroban Interface

We want to develop a simple smart contract that allows the atomic swap of our payment token (CARBON) for our locked retirement token (CarbonSINK) to be done with Soroban. The Stellar Asset Contract (SAC) will be used to interact with the existing tokens. This will allow further automation through smart contracts, and let integration partners choose between Soroban and a classic Stellar + HTTP API approach, with equivalent functionality.

To enable payments through Soroban, we aim to use a Soroswap liquidity pool for CARBON/USDC as an alternative for the built in payment functionality of our API. It will be of limited size (since all our CARBON is fully backed), and the Stellarcarbon backend will automatically replenish the pool to keep its price in line with our primary sales. We'll start with a constant product pool on testnet but we'll migrate to a concentrated liquidity pool as soon as Soroswap launches it.

### SAC for CARBON

This contract is used to interact with the CARBON asset on behalf of the transaction invoker.

**Admin:** CARBON issuer

### SAC for CarbonSINK

This contract is used to interact with the CarbonSINK asset within the sink carbon contract. It needs to be able to execute the authorization sandwitch without needing additional signatures.

**Admin:** sink carbon contract

### Sink Carbon Contract

Our sink carbon contract implements one user-facing function `sink_carbon`. With admin privileges, it also needs to enable resetting the CarbonSINK SAC admin and toggling a circuit breaker.

**Admin:** CarbonSINK issuer

**Instance TTL:** threshold 29 days, extend amount 30 days

**Instance storage:**

- Admin: Account
- CarbonSinkID: Address
- Paused: bool

**fn __constructor:**

- admin: will be set to the CarbonSINK issuer
- carbonsink_id: CarbonSINK SAC address

Additionally puts Paused: false in instance storage.

**fn sink_carbon:**

**fn reset_admin:**

**fn toggle_paused:**
