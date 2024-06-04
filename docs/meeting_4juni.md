# Refactor stellarcarbon api

subapp voor testnet versie.

testnet_poc.py referentie code

testnet 4x per jaar gereset

we moeten dus checken of deze reset is geweest (1x per dag bijv. en bij 't opstarten). testnet specifieke wrapper code.

Deze is eind mei geweest.

Circle Sandbox gebruiken voor USDC. Je kunt niet vanuitgaan dat liquide markt van USDC beschikbaar is. Dus we gaan onze eigen USDC maken. (line 29)
https://developers.circle.com/circle-mint/v1.2/docs/usdc-on-testnet

# API invetarisatie/schema:

Geen horizon calls in de app, behalve USDC to XLM conversion ratio.

Inventariseren wat ik nodig heb en wil en dat voorleggen aan Alex.

Probeer pagination te vermijden voor nu.

# Frontend notities:

sink form submission flow aanpassing:
api request --> confirmation in website (evt trustlines & sandwich informatie) --> confirmation in wallet

Pending retirements:

- Roundup actie.
- Optioneel een "retire mn hele tonnen"-actie. === "request certificate"
  - Dit is een API request + iets ondertekenen met wallet. Hier is onduidelijkheid hoe dit eruit gaat zien.
  - Bevestigen in dialog + uitleg.
  - Niet wachten op succes. Opsturen en gebruiker terug naar dashboard. Completion is nu nog handwerk voor Alex. Check back later.
  - Latere fase van ontwikkeling wordt dit nog wel geautomatiseerd.

Tegels op pending retirements hetzelfde als op Past Transactions. Behalve:

- Er moet een countdown bij.
- Hoeveel van het totaalbedrag in deze transactie is al retired?
