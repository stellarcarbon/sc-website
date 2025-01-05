### Scenario

Twee transacties:

2020 airflight: 1.5
2021 airflight: 1.2

Staan allebei onder pending tab.

- 1.5
- 1.2

Gebruiker heeft nu keuze "round-up" EN "omlaag afronden".

"round-up" actie maakt een 3e transactie:

Rounding: 0.3 --> Alex krijgt een alert
Alex logt in bij Verra, vult retirement formulier in met de hashes van alledrie de transacties.
Als de gebruiker niet anoniem was, wordt zijn/haar email hier ingevuld en krijgt de gebruiker direct een email van Verra.

Periodiek wordt bij Verra gecheckt welke retirements er zijn. Op dit moment wordt dus pas de transactie van pending afgehaald in onze systemen (en dus website).

"omlaag afronden" / "request certificate now" actie

Request een certificate voor de hele tonnen in je pending balance. In dit geval een certificaat voor 2 ton.

Bericht "hou je inbox in de gaten" of "check back later" als anoniem.

---

### Pending retirements view

Als pending balance niet rond is, dan "round-up" actie tonen.
Als pending balance > 1 is, dan "omlaag afronden" actie tonen.
Als pending balance een rond getal is maar niet 0, dan staan er geen acties. Toon bericht dat de transacties in de lijst nu worden verwerkt in Verra. Geduld aub, kan enkele dagen duren.
Als pending balance 0 is, dan zijn er geen items in de lijst. Empty scherm tonen.

Voor beide acties:

Een certificaat aanvragen voor een anoniem account heeft eigenlijk geen zin, want de certificaten worden uiteindelijk toch wel gemaakt.

Dus we kunnen de gebruiker aansporen om zijn/haar account te ont-anonimiseren in de popup. Afbreken actie of het emailadres/username invoeren op diezelfde dialog pagina.

---

### PDF

wie: normaal een stellar account. Bij community retirements "de SC community".
welk project.
hoeveel tonnen.
wanneer.

GiveCredit gaat deze PDF's minten en publiceren om zo te bewijzen hoeveel CO2 reductie ze doen.

---

### Overig

Walletkit update voegt Lobster wallet optie toe.
