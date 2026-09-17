# GenLayer Consensus Console — Submission Matrix

This document is the source of truth for the new contribution submission. Every advertised write action is mapped to a checked-in contract method and an active Bradbury deployment. The legacy prediction deployment `0x72f6BE503a8319A40515641536C1d74378623914` is intentionally excluded.

## Contract and action matrix

| Contract | Advertised action | Checked-in source | Active deployment / proof |
|---|---|---|---|
| Content Moderator | `moderate()` | `apps/content-moderator/contracts/moderator.py` — `@gl.public.write def moderate` | `0x235F51b11b9F96d6673df37553Ef58373c4324F9` |
| Content Moderator | `enforce()` | `apps/content-moderator/contracts/moderator.py` — `@gl.public.write def enforce` | `0x235F51b11b9F96d6673df37553Ef58373c4324F9` |
| Content Moderator | `appeal(note)` | `apps/content-moderator/contracts/moderator.py` — `@gl.public.write def appeal` | `0x235F51b11b9F96d6673df37553Ef58373c4324F9` |
| Content Moderator | `resolve_appeal()` | `apps/content-moderator/contracts/moderator.py` — `@gl.public.write def resolve_appeal` | `0x235F51b11b9F96d6673df37553Ef58373c4324F9` |
| Prediction Market | `stake(side)` payable | `apps/prediction-market/contracts/prediction_market.py` — `@gl.public.write.payable def stake` | Showcase `0x2dc09cDbb8319303eAc78E85D5d055BB53bdA6BE`; lifecycle proof `0x390CAd661cEf8e2bBAc9b6a1B8A152d9083F8ba0` |
| Prediction Market | `resolve()` | `apps/prediction-market/contracts/prediction_market.py` — `@gl.public.write def resolve` | `0x390CAd661cEf8e2bBAc9b6a1B8A152d9083F8ba0` |
| Prediction Market | `dispute(reason)` | `apps/prediction-market/contracts/prediction_market.py` — `@gl.public.write def dispute` | `0x390CAd661cEf8e2BBAc9b6a1B8A152d9083F8ba0` |
| Prediction Market | `resolve_dispute()` | `apps/prediction-market/contracts/prediction_market.py` — `@gl.public.write def resolve_dispute` | `0x390CAd661cEf8e2bBAc9b6a1B8A152d9083F8ba0` |
| Prediction Market | `settle()` | `apps/prediction-market/contracts/prediction_market.py` — `@gl.public.write def settle` | `0x390CAd661cEf8e2bBAc9b6a1B8A152d9083F8ba0` |
| Prediction Market | `claim()` | `apps/prediction-market/contracts/prediction_market.py` — `@gl.public.write def claim` | `0x390CAd661cEf8e2bBAc9b6a1B8A152d9083F8ba0` |
| Multi-Source Oracle | `update(key)` | `apps/multi-source-oracle/contracts/oracle.py` — `@gl.public.write def update` | `0x9bEcbdF8f3Cd6fABAeE5F737CE5B1B765ef9a1F5` |

The prediction contract also implements `void()`, `finalize()`, and `refund()`. These are included in the UI only as lifecycle recovery actions and must not be omitted from source evidence if they are described as advertised capabilities. The oracle also implements feed administration methods; the submission description focuses on the deployed feed update flow.

## Accepted-receipt lifecycle

Every frontend write is routed through `src/lib/genlayer.ts`:

```text
writeContract()
  -> waitForTransactionReceipt(status = ACCEPTED)
  -> classify txExecutionResultName
  -> success only for FINISHED or FINISHED_WITH_RETURN
  -> only after success: refresh get_state / contract state
```

`FINISHED_WITH_ERROR`, `NOT_VOTED`, `UNDETERMINED`, `LEADER_TIMEOUT`, transport ambiguity, and unknown results are not treated as success. The dashboard does not refresh state for those outcomes. A pending hash may remain visible for explorer verification, but it does not produce an optimistic state update.

The main contract action panel is implemented in `src/components/actions-panel.tsx`. The escrow route uses the same `sendWriteEx` gate and refreshes only after `confirmed === true`.

## Evidence rules for the new submission

Use only the new repository URLs, the new live deployment URL, the active addresses above, exact contract source-file URLs, and explorer transaction/address URLs that correspond to those deployments. Do not include the legacy `0x72f6...` address or links to the rejected contribution.
