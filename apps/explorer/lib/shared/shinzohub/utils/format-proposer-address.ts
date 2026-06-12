export const formatProposerAddress = (address: string): string => {
  return address.startsWith('0x') ? address : `0x${address.toLowerCase()}`;
};