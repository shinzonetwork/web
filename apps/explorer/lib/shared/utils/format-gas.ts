export const formatGasUsed = (gasUsed: string, gasLimit: string) => {
  const used = Number(gasUsed)
  const limit = Number(gasLimit)
  const percentage = ((used / limit) * 100).toFixed(2)
  return `${(used / 1e6).toFixed(2)}M (${percentage}%)`
};
