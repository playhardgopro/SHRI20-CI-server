function saveSettings(payload) {
  console.log(payload, 'payload')
  return {
    type: 'SAVE_SETTINGS',
    payload,
  }
}

export { saveSettings }
