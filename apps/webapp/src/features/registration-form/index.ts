export { RegistrationFormV2 } from "./ui/registration-form-v2";
export {
  useVerifyAssertion,
  waitForGeneratorAssertionVerification,
} from "./hooks/use-verify-assertion";
export {
  buildGeneratorAssertionUrl,
  buildGeneratorAssertionUrlFromSearchParams,
  buildGeneratorRegistrationUrl,
} from "./lib/build-registration-url";
export {
  getAssertionFormPrefilledFields,
  getGeneratorAssertionFormPrefill,
  getGeneratorAssertionPrefill,
  getRegistrationPrefillV2,
  getRegistrationPrefillV2Params,
  getRegistrationPrefilledFieldsV2,
  readSearchParams,
} from "./lib/prefill-data";
export type {
  GeneratorAssertionFormPrefill,
  GeneratorAssertionPrefill,
  PrefillDataV2,
  RegistrationPrefillV2Params,
} from "./lib/prefill-data";
