import pagarme from 'pagarme'

const createCardHash = (cardPayload) => {
  return pagarme.client
    .connect({ encryption_key: process.env.REACT_APP_ENCRYPTION_KEY })
    .then((client) => client.security.encrypt(cardPayload))
}

export { createCardHash }
