class Database {
  constructor() {
    this.emails = []
  }

  getEmails() {
    return this.emails
  }

  checkEmail(email) {
    const emailRegExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    if (!emailRegExp.test(email)) {
      throw new Error('Invalid email')
    }

    let result = this.getEmails().find((item) => item.email === email)
    if (result) {
      throw new Error('This email was added before.')
    }
  }

  addEmail(email) {
    this.checkEmail(email)

    let newEmail = { id: Date.now(), email }
    this.emails.push(newEmail)
    return newEmail
  }
}

export default new Database()
