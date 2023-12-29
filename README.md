# sc-website

www.stellarcarbon.io
Needs to work on mobile & desktop devices

Staging: https://sc-website-eosin.vercel.app/

## sitemap

- home

  - contact
  - privacy policy
  - terms of use
  - call to action!
  - social links
  - about us

- explainer + audit

  - how does SC integrate Stellar and Verra?
  - counter of kgs/tonnes "stored on Stellar"
  - verify CARBON in Pool on Verra
  - verify inventory on Stellar (minting + available)
  - verify CARBON retired into Sink on Verra
  - verify CarbonSINK total + transactions on Stellar

- nature projects list

  - project details
    - sink carbon (go to checkout)

- dashboard
  - connect wallet
  - list retirements (Stellar Horizon queries)
    - (phase 2: finalize fractions)
  - sink carbon

Two flows:

- user wants to compensate for known emissions
  - emissions calculator???
- user wants to support a project for a known amount

## tech stack

- Typescript
- React
- Next.js?
- https://creit-tech.github.io/Stellar-Wallets-Kit/ (see https://github.com/stellarcarbon/sc-checkout)
- https://api-beta.stellarcarbon.io/openapi.json (see https://github.com/stellarcarbon/sc-checkout)
- [Stellar Horizon](https://developers.stellar.org/api/horizon)
- SEO compatibility (i.e. project detail page is indexed)
- CI/CD push to deploy (GitHub actions?)
- Hosting TBD: Cloudflare, Digital Ocean, ...

## multirepo setup

https://github.com/stellarcarbon/sc-website
Development/vercel fork: https://github.com/hlgrondijs/sc-website

https://jeffkreeftmeijer.com/git-multiple-remotes/

## timeline

Iterate on the look, feel, and static content.

- dev setup
- wallet connection
- page stubs
  - Explainer/Audit (op homepage)
  - Hamburger (indented in [], alleen op mobile): Home [Project list (staat op homepage, naartoe scrollen), Explainer/Audit], Dashboard, About us
  - Footer: PP & ToU, Contact gegevens, Social links
- sink form (aka checkout)
- explainer + audit
- finally: make the UX good

## misc

[SCF project](https://communityfund.stellar.org/project/drafts.recEJspjbO9LaMl3R) (UX designs)
[Checkout prototype](http://offset-gui.surge.sh/)

## ideeen

- Share my retirements link

  - Shared retirements list lijkt op de lijst op dashboard, maar "read only".

- Retirements list item knopje: "doe deze transactie nog een keer".
