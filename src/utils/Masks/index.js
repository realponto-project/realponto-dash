import customer from './customerMasks'

export const customerMask = customer

const mask = (pattern) => (value) => {
  let i = 0
  const v = String(value)
  return pattern.replace(/#/g, () => v[i++] || '')
}

export default mask
