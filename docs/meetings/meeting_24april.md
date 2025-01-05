# Deliverable 8

- 3 tabs

  - Sink CARBON, Pending retirements, Past transactions

- Connection blokje

  - Welke wallet?
  - PubKey
  - Totale hoeveelheid sunk
  - Totale hoeveelheid pending
  - Edit knop
  - Remove/Disconnect knop

- Altijd 3 decimalen tonen als het om de eenheid CARBON gaat (want het zijn kilo's).
- Hoeveelheid CARBON moet "intypbaar" zijn.
- Kijken of het werkt om de min/max aan te passen als de gebruiker het getal intypt

- Reden dat we niet two-way input velden hebben zoals bij Valuta conversie websites is lastige functie.
- In de toekomst komt er een liquidity pool die dit oplost, maar onduidelijk wanneer/if.
- Kijkje nemen of ik calculate_cost in https://github.com/aolieman/stellarcarbon-mvp/blob/master/public/pricing.py kan inverteren. Prijs benaderd $22.85 per ton CARBON.

## Openstaande pending balance afronden

Als iemand een pending balance open heeft staan, dit bij het checkout formulier (Sink CARBON) tonen en user de optie bieden om deze pending hoeveelheid af te ronden in een keer in het formulier in te vullen.
Deze functionaliteit zo ook in het Connection blokje kunnen komen. Of misschien zelfs/ook in Pending retirements

Pending retirements worden na X dagen (90) op de grote hoop gegooid. Deze teller willen we tonen onder Pending retirements.

Elke rij in pending retirements is de pending "fractie" van 1 sink carbon actie. Dus het kan zo zijn dat deze rijen optellen tot meer dan 1. De gebruiker moet de optie hebben om dat gemakkelijk te doen. Hier moet een extra bevestigingsscherm bij.

- 0.35 (nieuwste)
- 0.7
- 0.4
- 0.1 (oudste)
  totaal: 1.55 ---> user heeft knopje (optie) om naar boven af te ronden --> klik --> sinkCarbon scherm met 0.45 ingevuld.

Elke rij in de TX history, is ofwel onderdeel van een individuele of een collective retirement. Het verschil willen we aanduiden (icoontje?) (hier kan ook gelinked worden naar de bijbehorende retirement).

## Staging version

Werkt met Stellar Testnet en een mock van Verra. Alle functionaliteiten zullen werken, maar niet met echt geld.

staging.stellarcarbon.io ?

2 app platforms op digital ocean wss nodig vanwege subdomein "bug".
