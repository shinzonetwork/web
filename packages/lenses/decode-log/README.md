# Decode Log Lens

`decode-log` is a generic EVM log decoder built with `createEvmLens(...)`.

It accepts an ABI at runtime, matches logs by `topic0`, decodes the matched event arguments, and emits the original input row plus decoded enrichment fields.

Logs whose selector does not match any event in the supplied ABI are skipped.

## Arguments

- `abi` (required): the contract ABI used for event decoding
  - may be passed as an inline JSON array
  - may also be passed as a JSON string

## Expected Input

The lens expects an EVM log stream. At minimum, include:

```graphql
Ethereum__Mainnet__Log {
  address
  topics
  data
  blockNumber
  transaction { hash from to }
}
```

If you want those fields preserved in the output, you can also include additional fields such as:

```graphql
Ethereum__Mainnet__Log {
  address
  topics
  data
  blockNumber
  logIndex
  block { timestamp }
  transaction { hash from to }
}
```

## Output

For each matched log, the lens emits the original input row plus:

- `hash`: transaction hash from `transaction.hash`
- `from`: transaction sender from `transaction.from`
- `to`: transaction recipient from `transaction.to`
- `logAddress`: the log's contract address
- `event`: matched ABI event name
- `signature`: matched ABI event signature
- `arguments`: JSON array of decoded event arguments

Each `arguments` item has this shape:

```json
{ "name": "value", "type": "uint256", "value": "1000" }
```

Note that top-level `from` and `to` come from transaction context. Decoded event arguments with the same names are available inside `arguments`.

## Example SDL

If you want to preserve nested JSON values like `topics`, `block`, `transaction`, and `arguments`, declare them as `JSON` in the SDL:

```graphql
type DecodedLog @materialized(if: false) {
  address: String
  topics: JSON
  data: String
  blockNumber: Int
  logIndex: Int
  block: JSON
  transaction: JSON
  hash: String
  from: String
  to: String
  logAddress: String
  event: String
  signature: String
  arguments: JSON
}
```

## Example Usage

```bash
./build/viewkit view add lens \
  --name decoded-logs \
  --label decode-log \
  --path ./packages/lenses/decode-log/lens.wasm \
  --args '{"abi":[{"type":"event","name":"Transfer","inputs":[{"name":"from","type":"address","indexed":true},{"name":"to","type":"address","indexed":true},{"name":"value","type":"uint256","indexed":false}]}]}'
```

## Notes

- unmatched selectors emit no output row
- supported value decoding follows the current AssemblyScript EVM decoder
- unsupported ABI shapes still surface as `"unsupported type: ..."`
