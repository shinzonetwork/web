# ERC20 Transfers Lens

Example usage with `viewkit` CLI:

```bash
# create a view with name "erc20-transfers"
./build/viewkit view init erc20-transfers

# basic query to pull in raw log data from Ethereum mainnet, with some nested transaction fields
./build/viewkit view add query "Ethereum__Mainnet__Log { address topics data blockNumber transaction { hash from to } }" --name erc20-transfers

# an SDL that returns transformed log data with event names from decoded ABI
./build/viewkit view add sdl "type Erc20Transfer @materialized(if: false) {                                                               
tokenAddress: String
hash: String
blockNumber: Int
from: String
to: String
amount: String
}" --name erc20-transfers

# attaching a recently-built ERC-20 transfers lens
./build/viewkit view add lens \
--name erc20-transfers \
--label erc20-transfers \
--path ./as/build/erc20-transfers/erc20-transfers.wasm \
--args '{"tokenAddress":"0xdac17f958d2ee523a2206206994597c13d831ec7"}'

# deploy to a local DefraDB with mock data
./build/viewkit view deploy erc20-transfers --target local

# deploy to ShinzoHub, so that a host can pick it up and run it against devnet data
./build/viewkit view deploy erc20-transfers --target devnet --rpc http://rpc.devnet.shinzo.network:8545
```
