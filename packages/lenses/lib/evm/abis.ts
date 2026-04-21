export const ERC20_ABI: string =
  "[" +
  "{\"type\":\"event\",\"name\":\"Transfer\",\"inputs\":[" +
  "{\"name\":\"from\",\"type\":\"address\",\"indexed\":true}," +
  "{\"name\":\"to\",\"type\":\"address\",\"indexed\":true}," +
  "{\"name\":\"value\",\"type\":\"uint256\",\"indexed\":false}" +
  "]}," +
  "{\"type\":\"event\",\"name\":\"Approval\",\"inputs\":[" +
  "{\"name\":\"owner\",\"type\":\"address\",\"indexed\":true}," +
  "{\"name\":\"spender\",\"type\":\"address\",\"indexed\":true}," +
  "{\"name\":\"value\",\"type\":\"uint256\",\"indexed\":false}" +
  "]}" +
  "]";

export const ENS_CORE_ABI: string = `[
  {"type":"event","name":"Transfer","inputs":[{"name":"node","type":"bytes32","indexed":true},{"name":"owner","type":"address","indexed":false}]},
  {"type":"event","name":"NewOwner","inputs":[{"name":"node","type":"bytes32","indexed":true},{"name":"label","type":"bytes32","indexed":true},{"name":"owner","type":"address","indexed":false}]},
  {"type":"event","name":"NewResolver","inputs":[{"name":"node","type":"bytes32","indexed":true},{"name":"resolver","type":"address","indexed":false}]},
  {"type":"event","name":"NewTTL","inputs":[{"name":"node","type":"bytes32","indexed":true},{"name":"ttl","type":"uint64","indexed":false}]},
  {"type":"event","name":"NameRegistered","inputs":[{"name":"id","type":"uint256","indexed":true},{"name":"owner","type":"address","indexed":true},{"name":"expires","type":"uint256","indexed":false}]},
  {"type":"event","name":"NameRenewed","inputs":[{"name":"id","type":"uint256","indexed":true},{"name":"expires","type":"uint256","indexed":false}]},
  {"type":"event","name":"Transfer","inputs":[{"name":"from","type":"address","indexed":true},{"name":"to","type":"address","indexed":true},{"name":"tokenId","type":"uint256","indexed":true}]},
  {"type":"event","name":"NameRegistered","inputs":[{"name":"name","type":"string","indexed":false},{"name":"label","type":"bytes32","indexed":true},{"name":"owner","type":"address","indexed":true},{"name":"cost","type":"uint256","indexed":false},{"name":"expires","type":"uint256","indexed":false}]},
  {"type":"event","name":"NameRenewed","inputs":[{"name":"name","type":"string","indexed":false},{"name":"label","type":"bytes32","indexed":true},{"name":"cost","type":"uint256","indexed":false},{"name":"expires","type":"uint256","indexed":false}]},
  {"type":"event","name":"NameRegistered","inputs":[{"name":"name","type":"string","indexed":false},{"name":"label","type":"bytes32","indexed":true},{"name":"owner","type":"address","indexed":true},{"name":"baseCost","type":"uint256","indexed":false},{"name":"premium","type":"uint256","indexed":false},{"name":"expires","type":"uint256","indexed":false}]},
  {"type":"event","name":"NameRenewed","inputs":[{"name":"name","type":"string","indexed":false},{"name":"label","type":"bytes32","indexed":true},{"name":"cost","type":"uint256","indexed":false},{"name":"expires","type":"uint256","indexed":false}]},
  {"type":"event","name":"NameRegistered","inputs":[{"name":"label","type":"string","indexed":false},{"name":"labelhash","type":"bytes32","indexed":true},{"name":"owner","type":"address","indexed":true},{"name":"baseCost","type":"uint256","indexed":false},{"name":"premium","type":"uint256","indexed":false},{"name":"expires","type":"uint256","indexed":false},{"name":"referrer","type":"bytes32","indexed":false}]},
  {"type":"event","name":"NameRenewed","inputs":[{"name":"label","type":"string","indexed":false},{"name":"labelhash","type":"bytes32","indexed":true},{"name":"cost","type":"uint256","indexed":false},{"name":"expires","type":"uint256","indexed":false},{"name":"referrer","type":"bytes32","indexed":false}]},
  {"type":"event","name":"NameWrapped","inputs":[{"name":"node","type":"bytes32","indexed":true},{"name":"name","type":"bytes","indexed":false},{"name":"owner","type":"address","indexed":false},{"name":"fuses","type":"uint32","indexed":false},{"name":"expiry","type":"uint64","indexed":false}]},
  {"type":"event","name":"NameUnwrapped","inputs":[{"name":"node","type":"bytes32","indexed":true},{"name":"owner","type":"address","indexed":false}]},
  {"type":"event","name":"FusesSet","inputs":[{"name":"node","type":"bytes32","indexed":true},{"name":"fuses","type":"uint32","indexed":false}]},
  {"type":"event","name":"ExpiryExtended","inputs":[{"name":"node","type":"bytes32","indexed":true},{"name":"expiry","type":"uint64","indexed":false}]},
  {"type":"event","name":"TransferSingle","inputs":[{"name":"operator","type":"address","indexed":true},{"name":"from","type":"address","indexed":true},{"name":"to","type":"address","indexed":true},{"name":"id","type":"uint256","indexed":false},{"name":"value","type":"uint256","indexed":false}]},
  {"type":"event","name":"TransferBatch","inputs":[{"name":"operator","type":"address","indexed":true},{"name":"from","type":"address","indexed":true},{"name":"to","type":"address","indexed":true},{"name":"ids","type":"uint256[]","indexed":false},{"name":"values","type":"uint256[]","indexed":false}]},
  {"type":"event","name":"ABIChanged","inputs":[{"name":"node","type":"bytes32","indexed":true},{"name":"contentType","type":"uint256","indexed":true}]},
  {"type":"event","name":"AddrChanged","inputs":[{"name":"node","type":"bytes32","indexed":true},{"name":"a","type":"address","indexed":false}]},
  {"type":"event","name":"AddressChanged","inputs":[{"name":"node","type":"bytes32","indexed":true},{"name":"coinType","type":"uint256","indexed":false},{"name":"newAddress","type":"bytes","indexed":false}]},
  {"type":"event","name":"AuthorisationChanged","inputs":[{"name":"node","type":"bytes32","indexed":true},{"name":"owner","type":"address","indexed":true},{"name":"target","type":"address","indexed":true},{"name":"isAuthorised","type":"bool","indexed":false}]},
  {"type":"event","name":"ContenthashChanged","inputs":[{"name":"node","type":"bytes32","indexed":true},{"name":"hash","type":"bytes","indexed":false}]},
  {"type":"event","name":"InterfaceChanged","inputs":[{"name":"node","type":"bytes32","indexed":true},{"name":"interfaceID","type":"bytes4","indexed":true},{"name":"implementer","type":"address","indexed":false}]},
  {"type":"event","name":"NameChanged","inputs":[{"name":"node","type":"bytes32","indexed":true},{"name":"name","type":"string","indexed":false}]},
  {"type":"event","name":"PubkeyChanged","inputs":[{"name":"node","type":"bytes32","indexed":true},{"name":"x","type":"bytes32","indexed":false},{"name":"y","type":"bytes32","indexed":false}]},
  {"type":"event","name":"TextChanged","inputs":[{"name":"node","type":"bytes32","indexed":true},{"name":"indexedKey","type":"string","indexed":true},{"name":"key","type":"string","indexed":false}]},
  {"type":"event","name":"TextChanged","inputs":[{"name":"node","type":"bytes32","indexed":true},{"name":"indexedKey","type":"string","indexed":true},{"name":"key","type":"string","indexed":false},{"name":"value","type":"string","indexed":false}]},
  {"type":"event","name":"VersionChanged","inputs":[{"name":"node","type":"bytes32","indexed":true},{"name":"newVersion","type":"uint64","indexed":false}]}
]`;
