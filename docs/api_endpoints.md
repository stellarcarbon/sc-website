# Endpoints inventarisatie

Hieronder een poging alle benodigde endpoints stellarcarbon API op te sommen vanuit frontend perspectief.

# Transacties

### Totale transactie lijst

Returned alle transacties op Stellarcarbon. (voor transactions page)

### Laatste 5 transacties

Returned de laatste 5 transacties op Stellarcarbon. (voor homepage)

### Dashboard transactie lijsten

Returned alle transactions voor 1 wallet. Dit lijkt me handig om te doen voor elke keer dat iemand het dashboard bezoekt. Kunnen meerdere views mee gemaakt worden en bevat Last Transaction, Total Sinked en Pending Certificate Claims (my dashboard overview ding).

#### Params

- Wallet pubkey

## Velden "Transaction" object

- Hash
- Date
- Sunk
- Price
- Memo
- Lijst van bijbehorende retirements
- Retirement status (pending of fully retired)
- Countdown tot community retirement (optioneel)

# Sinking

### carbon_quote (GET)

Hoeveel dollar kost X ton CARBON?

#### Params

- carbon_amount

### usd_quote (GET)

Hoeveel CARBON kan ik krijgen voor X dollar?

#### Params

- usd_amount

### sink-carbon (POST)

Stuur voorstel transactie op, API returned ondertekende transactie klaar om te submitten naar blockchain.

Details omitted.

# Registry

### inventory

#### Nodig voor /explain

Show Stellarcarbon's inventory held in the CARBON Pool in the Verra Registry.

Return all batches of credits that are held in the CARBON Pool sub-account. These batches include credits that can still be used as well as credits that have been sunk through Stellarcarbon but whose retirement has yet to be finalized in the Verra Registry, e.g. because of incomplete fractional retirements.

The field total_inventory_credits contains the sum of all batches in the inventory.

### retirements

#### Nodig voor /explain en /dashboard

Fetch the list of finalized CARBON retirements from the Verra Registry.

Return all retirements made to the Carbon Sink in the Verra Registry. All information on the retired instruments and their retirement events is directly copied from Verra. We have added a total_amount_retired field for convenience, to be able to quickly access the number of tonnes for which Stellarcarbon has finalized their retirement in the registry.

This endpoint can be slow to respond due to the upstream query that is done in the Verra Registry.

# Stats

### stats

Als het mogelijk is een endpoint om op te halen:

- \# of Carbon stored on Stellar Network
- \# kilograms of Carbon sunk by users

Nodig voor homepage "mission" widget.
