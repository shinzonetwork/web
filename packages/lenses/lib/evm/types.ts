import { JSON } from "assemblyscript-json/assembly";

export class AbiInput {
  name: string;
  typeName: string;
  indexed: bool;

  constructor(name: string, typeName: string, indexed: bool) {
    this.name = name;
    this.typeName = typeName;
    this.indexed = indexed;
  }
}

export class AbiEvent {
  name: string;
  signature: string;
  selector: string;
  inputs: AbiInput[];

  constructor(name: string, signature: string, selector: string, inputs: AbiInput[]) {
    this.name = name;
    this.signature = signature;
    this.selector = selector;
    this.inputs = inputs;
  }
}

export class DecodedArgument {
  name: string;
  type: string;
  value: string;

  constructor(name: string, type: string, value: string) {
    this.name = name;
    this.type = type;
    this.value = value;
  }
}

export class DecodedLog {
  name: string = "Unknown";
  event: string = "Unknown";
  signature: string = "";
  selector: string = "";
  arguments: DecodedArgument[] = [];

  getArg(name: string): string | null {
    for (let i = 0; i < this.arguments.length; i++) {
      if (this.arguments[i].name == name) {
        return this.arguments[i].value;
      }
    }

    return null;
  }
}

export class EvmTransactionContext {
  hash: string = "";
  from: string = "";
  to: string = "";
}

export class EvmLogDocument {
  address: string = "";
  topics: string[] = [];
  data: string = "";
  blockNumber: i64 = 0;
  transaction: EvmTransactionContext = new EvmTransactionContext();

  static fromJson(doc: JSON.Obj): EvmLogDocument {
    const log = new EvmLogDocument();

    const address = doc.getString("address");
    if (address != null) log.address = address.valueOf();

    const blockNumber = doc.getInteger("blockNumber");
    if (blockNumber != null) log.blockNumber = blockNumber.valueOf();

    const data = doc.getString("data");
    if (data != null) log.data = data.valueOf();

    const topics = doc.getArr("topics");
    if (topics != null) {
      const values = topics.valueOf();
      for (let i = 0; i < values.length; i++) {
        if (values[i].isString) {
          log.topics.push((<JSON.Str>values[i]).valueOf());
        }
      }
    }

    const tx = doc.getObj("transaction");
    if (tx != null) {
      const hash = tx.getString("hash");
      if (hash != null) log.transaction.hash = hash.valueOf();
      const from = tx.getString("from");
      if (from != null) log.transaction.from = from.valueOf();
      const to = tx.getString("to");
      if (to != null) log.transaction.to = to.valueOf();
    }

    return log;
  }
}
