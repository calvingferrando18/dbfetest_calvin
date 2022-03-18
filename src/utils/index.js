export const extractErrors = (errors) => {
  let message = ''
  for (const prop in errors) {
    if (errors[prop]) {
      message = errors[prop]
        .map(err => `${prop} ${err}`)
        .join('\n')
    }
  }
  return message || 'Something went wrong'
}