import { length } from 'ramda'

const myInfoMask = ({ name, value }) => {
  const maskSpec = {
    document: (value) => {
      return value
        .toUpperCase()
        .replace(/[^\d|X]/g, '')
        .replace(/(\d{2})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d|X)/, '$1-$2')
        .replace(/(-[\d|X]{1})\d+?$/, '$1')
    },

    phone: (value) => {
      if (length(value) <= 14) {
        return value
          .replace(/\D/g, '')
          .replace(/(\d)/, '($1')
          .replace(/(\d{2})(\d)/, '$1) $2')
          .replace(/(\d{4})(\d)/, '$1-$2')
          .replace(/(-\d{4})\d+?$/, '$1')
      } else {
        return value
          .replace(/\D/g, '')
          .replace(/(\d)/, '($1')
          .replace(/(\d{2})(\d)/, '$1) $2')
          .replace(/(\d{5})(\d)/, '$1-$2')
          .replace(/(-\d{4})\d+?$/, '$1')
      }
    }
  }

  const applyMask = maskSpec[name] || ((value) => value)

  return { name, value: applyMask(value) }
}

export default myInfoMask
