# Carbon pool registry widget

Hoe berekenen we de 4 getallen?

Verra heeft credits. 1000 kilo = 1 ton = 1 VCU = 1 CARBON = 1 CarbonSINK

VCU kan active of retired zijn.
In stellar sinken we CARBON. Er is een atomic swap van de gebruikers CARBON naar CarbonSINK. Vanuit het perspectief van CARBON verdwijnt er een CARBON token die wordt teruggestuurd naar de issuer. CarbonSINK wordt dan pas uitgekeerd door Stellarcarbon backend met de CarbonSINK issuer.

/carbon/stats carbon_stored is de optelsom van wat we in onze inventaris hebben en wat er al sunk is. Staat op de homepage.

### carbonpoolVerra

Hoeveel hebben we in onze inventaris. Hoeveel credits zijn nog niet retired. Zegt niets over of ze wel of niet verkocht zijn.

/stats carbon_stored - carbon_retired

### carbonpoolStellar

Er is een CARBON distribution account en de hele voorraad die nu nog beschikbaar is om te kopen die zit daarop. Dit is de hoeveelheid die wij op dit moment kunnen aanbieden.

/stats carbon_stored - carbon_sunk

### carbonpoolVerra - carbonpoolStellar = amount pending

Dit is om te controleren.

### carbonsinkVerra

Tokens onbruikbaar op Verra. Dit heet in Verra retirements.

/carbon/stats carbon_retired

### carbonsinkStellar

Maakt tokens onbruikbaar. Dit heet bij ons Sinken van CARBON.

/carbon/stats carbon_sunk

### carbonsinkStellar - carbonsinkVerra = amount pending

/carbon/stats carbon_pending
Dit is om te controleren. zelfde verschil

# Explain pagina

Uitleg over hoe Stellarcarbon werkt en waarom je ons zou kiezen.

### Voor wie is het gemaakt?

Stellar gebruikers & Stellar ontwikkelaars. Ze hoeven niet heel diep erin zitten,
maar ze moeten wel een wallet met XLM hebben. Integratie partner kan de XLM verbergen,
dus dan hoeft de eindgebruiker niks met stellar te maken te hebben.

## Wat is de visie van Stellarcarbon?

Er zijn 3 problemen die we oplossen.

### Vraag decentralizeren

Er zijn veel mooie klimaat/biodiversity projecten en die hebben geld nodig, tot nu toe
komen de meeste geld stromen van gov/bigcorp. Overheid wil het aan de markt overlaten,
kan alleen heel sloom nieuwe regelgeving uitgeven, wordt niet afgedwongen door overheden.
70% van de vraag naar carbon credits waren vervuilende olie en auto fabrikanten.
Fabrikanten maken ook zelf carbon credits.
Projecten die iets willen doen tegen klima zijn afhankelijk van de fabrikanten daardoor, want 70% van hun inkomen.
Het aanbod en methodologie en verificatie van dit soort carbon credits wordt ook door de
fabrikanten geregeld.
Daarom willen we de vrijwillige koolstofmarkt aanbieden. Beloftes zijn niet waargemaakt en
dat komt doordat de vraag geconcentreerd is bij grote fabrikanten, dan spelen hun belangen
een grote rol.
Toegang bieden aan mensen of gezinnen. Fabrikanten hebben een te grote vinger in de pap.
Verschil in kwwaliteit van Carbon Credits.

Verra zorgt voor basic safeguards, geen credits van projecten die niet bestaan bijv. Ten eerste beheren zij de methodologien (soorten projecten) project moet kiezen en daarbij horen dan regels. Je moet ook aantonen dat je dat correct gaat implementeren.
Monitoring moet gedaan worden en gedocumenteerd zijn. Verified on door onafhankelijk audits. Verification & Validation Bodies.
Hierdoor kunnen we de kwaliteit van Carbon Credits/Units verifieren en controleren.

Stellarcarbon doet nog een extra verificatie bovenop de documentatie van de Verra registratie. Contact met de organisatie om het succes van het project goed te volgen.

We willen de vraag decentralizeren. Aanbod is goed, vraagkant te geclusterd. Behoefte aan kleinere partijen met ieder een beetje vraag. Mensen, gezinnen, verenigingen, gemeentes. Deze partijen willen we toegang geven

### Betrouwbare emissie compensatie

Verwarrende informatie. Huishoudens en gemeenschappen worden overgehaald die impact beloven, maar zijn ook op de hoogte van schandalen met carbon credits. Je hoort mooie beloftes, maar je weet ook dat regelmatig misgaat. Het is niet makkelijk om het kaf van het koren te scheiden. Je wilt graag geld geven, maar je kunt geen betrouwbare verkoper vinden. Wij doen dat onderscheid maken voor je.

Stellarcarbon lost dit op door extra validatie op Terra te doen. We maken zelf contact met project ontwikkelaars en onderzoeken of het project integer is. Verder dragen we bij aan transparantie door projecten financiele transacties met stablecoins te laten doen.
Door geldstromen binnen het project transparanter te maken, moedigen we de projecten aan om hun financiele transacties via Stellar te doen om de auditability nog beter te maken.
Voor deze partijen maakt het bank-kosten lager en helpen met het verkleinen van afstand tot cash doordat Stellar gebruik maakt van Moneygram. Dit is sneller en beter bereikbaar dan bank en pin systemen in dit type gebieden.

### SME dienstverlening

SME heeft niet de capaciteit om het zelf uit te zoeken hoe ze hun uitstoot kunnen compenseren of het aan te bieden aan hun eigen klanten. Verder willen deze bedrijven een betrouwbare boekhouding hebben van de CO2 certificaten die zij hebben gekocht. Zo beschermen we ze tegen de reputatieschade van het steunen van onbetrouwbare CO2 reductie projecten. SMEs willen claims maken op basis van de projecten die ze steunen, maar dat het vaak onduidelijk is welke claims gerechtvaardigd zijn. Bij Stellarcarbon zijn gedetailleerde gegevens beschikbaar over de gereduceerde CO2 certificaten.

Verificatie instanties zorgen ervoor dat 1 CC maar op 1 plek in de markt te vinden is, zodat er maar 1 koper is. Maar er is een andere manier waarop uitstoot wordt geteld en dat is de overheid van het land waar het project wordt uitgevoerd. In VN context hebben alle landen de plicht om te rapporteren over uitstoot en reducties. Regelgeving wordt steeds stricter, grote bedrijven kunnen hiervoor consultancies inschakelen maar in SME's ligt dit anders en die willen ook groen zijn. Wij nemen onze klanten de zorg uit handen dat hun compensatie betrouwbaar en verifieerbaar is. Ze kunnen contact met ons opnemen om hulp te krijgen bij de claims die ze willen maken. Wij kunnen helpen bij het maken van een marketing claim die daadwerkelijk ondersteund wordt door de credits die je gebruikt hebt.

## Onze oplossing

Met Stellar een integratie met Verra maken en projecten verifieren door persoonlijk contact. In Stellar kun je transparant immutable transacties presenteren. Door de blockchain zijn ze final. Verra gebruik we voor hun methodologieen omdat de meeste projecten daar zijn aangesloten en bieden ze de safeguards van traditionele registries, zoals het voorkomen van double counting.

Wij hebben de voorkeur om projecten te steunen die biodiversiteit steunen naast het koolstof aspec. Verder vinden we het ook belangrijk dat lokale gemeenschappen er voordeel uit halen. Biodiversiteit is nog belangrijker dan alleen CO2 compensatie omdat we op die manier ook soorten en hun leefomgeving kunnen beschermen naast de CO2 compensatie.

## Overige Ideeen

Waarom en hoe we een koppeling maken met Verra.

Het is gemaakt voor Stellar gebruikers. Daarom niet teveel aandacht aan Stellar & Blockchain. Veel uitleggen over wat Verra is en waarom we daar zitten en wat zijn CO2
certificaten eigenlijk? Hoe heeft biodiversiteit daar wat mee te maken?
Hoe werkt de CO2 markt en waarom wil ik daar iets mee te maken hebben?
Daarmee prikkelen om het te gebruiken.

# SCF submission

### sinking automatiseren.

har-file van verra acties.
gebruik maken van onze api moeten docs voor komen.

### "software" pagina

met daarop sc-api en sc-audit (verhaaltje + link naar github etc.)
sc-api is public en iedereen kan er gebruik van maken. Contact zoeken met Alex aanmoedigen "laagdrempelig".

#### Custodial of wallet

Allebei enduser wallet.

        Custodial: geen wallet app, maar wel stellar account en de software die ze gebruiken doet de signing.

--

        Wallet: gebruiker logt in via wallet app

Dit is relevant for dApp developers.

`Alles wat je nodig hebt om SC API te gebruiken is een valide transactie voorstel.`

### Apps op Soroban kunnen we nog niet goed mee integreren

- Productie klaar krijgen
- Gaat groot deel van de tijd kosten

### Testnet implementatie mist nog

- Content/teksten overal.
- Fouten afhandelen.
- Tests ontwikkelen.
- USDC spawn werkt nog niet, met circle support contact opnemen.
- Mocken van Verra voor automatische retirements.
