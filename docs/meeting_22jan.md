# Stellarcarbon "stats" voor op homepage & explainpage

## Homepage

Audit: We hebben data nodig van Horizon EN Verra. Zie beschrijving hieronder.

Lijstje met laatste 5 transacties.

- List items lijken sterk op dashboard history, maar velden net anders. Andere look dan op dashboard zodat verschil duidelijk is.
  - Wanneer
  - Hoeveelheid carbon sinked
  - memo
  - pubkey (?) i.p.v. hash
  - Niet clickable

### Presentatie

Laat op homepage 1,2,4 en 5 zien. Verder laten zien 6 met het sommetje erbij (4 - 5 = 6) en (1 - 2 = 6).

- (1 - 2) en (4 - 5) onder mekaar gerepresenteerd.
- 6 in een veld laten zien.

```
202,000 (1 + 5, is btw gelijk aan 2+4. Let op dat je geen rounding errors krijgt.) (CountUp, text-xl)
Kilograms of carbon stored on the Stellar Network. Hoeveelheid die in beheer is door Stellarcarbon.io.

Uitgebreide uitleg: Tekst die het systeem beschrijft en de label shorthands bold/underline weergeeft. Die shorthands dan gebruiken in onderstaande widget.

|  1 - 2  |      |
----------|  = 6 |
|  4 - 5  |      |
```

- In deze mockup is zijn de elementen tuples (name, value). Name boven het getal tonen in een kleiner font, getal gecentreerd onder het label.

### Data

1. Verify the total amount of CARBON available in the CARBON Pool on Verra. "CARBON pool". https://registry.verra.org/mymodule/rpt/myRpt.asp?r=205&idSubAccount=11273

   - Shorthand: "(Verra) CARBON pool"
   - Dit kan op een of andere manier in .csv format worden gedownload.
   - Som van Quantity of Credits = CARBON POOL total

2. Hoeveel CARBON is er nog liquide op stellar totaal. Dat is

   - Shorthand: "CARBON" of "CARBON asset"
   - https://horizon.stellar.org/assets?asset_code=CARBON&asset_issuer=GCBOATLWKXACOWKRRWORARDI2HFDSYPALMTS23YBZKHOB6XLW6CARBON
     - "amount" van records[0] is totaal op stellar.

3. 1 moet groter zijn dan 2. Anders is de CARBON "ongedekt" (onvoldoende "goud in de kluis"). Dan kunnen er geen nieuwe transacties worden gemaakt.

   - De max-limiet van de transactie "amount slider" is hoeveelheid liquid CARBON in de distribution account. (nice to have)

4. Hoeveelheid CarbonSINK op stellar. Dit zijn dus alle transacties die al gedaan zijn. https://horizon.stellar.org/assets?asset_code=CarbonSINK&asset_issuer=GC7CDWMCWNCY7JYUW5UBEOLNBSTNDKKZSFTHKGZNPPSOXLFYFX3CSINK

   - Shorthand: "CarbonSINK" of "CarbonSINK asset"
   - balances.unauthorized van records[0]

5. Hoeveelheid Carbon in de sink op Verra. https://registry.verra.org/mymodule/rpt/myRpt.asp?r=205&idSubAccount=11274

   - Shorthand: "(Verra) CARBON Sink"
   - Dit kan op een of andere manier in .csv format worden gedownload.

6. 4 moet groter of gelijk zijn aan 5.
   - Het verschil tussen 4 en 5 moet gelijk zijn aan het verschil tussen 1 en 2.
     - Dit kunnen we checken op de frontend. Warning tonen als het systeem niet in goeie staat is.
   - Het verschil is de hoeveelheid "pending".
