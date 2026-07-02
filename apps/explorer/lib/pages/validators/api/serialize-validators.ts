import type {
  ListValidatorsResult,
  ShinzoHubValidator,
} from "@shinzo/shinzohub";
import type {
  ShinzohubValidator,
  ShinzohubValidatorsResponse,
} from "@/shared/shinzohub/types";

export function serializeValidatorsList(
  result: ListValidatorsResult,
): ShinzohubValidatorsResponse {
  return {
    blockHeight: result.blockHeight.toString(),
    validators: result.validators.map(serializeValidator),
    count: result.count,
    total: result.total,
  };
}

function serializeValidator(
  validator: ShinzoHubValidator,
): ShinzohubValidator {
  return {
    address: validator.address,
    pubKey: { ...validator.pubKey },
    votingPower: validator.votingPower.toString(),
    proposerPriority: validator.proposerPriority.toString(),
  };
}
