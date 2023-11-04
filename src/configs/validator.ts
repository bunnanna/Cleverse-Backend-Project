export class ValidationError extends Error {
  readonly name: string = 'ValidationError'
  readonly statuscode: number = 400
}
export class Validatestr {
  private str: string
  constructor(str: string, private name: string = 'String') {
    if (str !== '' && !str) throw new ValidationError(`${this.name} field is required`)
    this.str = `${str}`
  }
  notEmpty() {
    if (this.str.length === 0) throw new ValidationError(`${this.name} can not be empty.`)
    return this
  }
  length(min: number, max?: number) {
    if (this.str.length < min) throw new ValidationError(`${this.name} can not shorter than ${min}`)
    if (max && this.str.length > max) throw new ValidationError(`${this.name} can not longer than ${max}`)
    return this
  }
  value() {
    return this.str
  }
}

export class Validatenum {
  private num: number
  constructor(num: number | string, private name: string = 'Number') {
    if (num !== 0 && !num) throw new ValidationError(`${this.name} required`)
    this.num = +num
  }
  notZero() {
    if (this.num === 0) throw new ValidationError(`${this.name} can not be 0.`)
    return this
  }
  between(min: number, max?: number) {
    if (this.num < min) throw new ValidationError(`${this.name} can not less than ${min}`)
    if (max && this.num > max) throw new ValidationError(`${this.name} can not more than ${max}`)
    return this
  }
  value() {
    return this.num
  }
  toString() {
    return `${this.num}`
  }
}

export class Validatedate {
  private date: Date
  constructor(date: number | string | Date, private name: string = 'Date') {
    this.date = new Date(date)
    if (this.date.toString() === 'Invalid Date') throw new ValidationError(`${this.name} is invalid Date Format`)
  }

  before(date: Date) {
    date = new Date(date)
    if (this.date < date) throw new ValidationError(`${this.name} not come before ${date}`)
    return this
  }
  after(date: Date) {
    date = new Date(date)
    if (this.date > date) throw new ValidationError(`${this.name} not come after ${date}`)
    return this
  }
  value() {
    return this.date
  }
}
