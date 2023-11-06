export class ValidationError extends Error {
  readonly name: string = 'ValidationError'
  readonly statuscode: number = 400
}
export class Validatestr {
  private cb: any[] = []
  constructor(private name: string) {}
  notEmpty() {
    this.cb.push((str: string) => {
      if (str.length === 0) throw new ValidationError(`${this.name} can not be empty.`)
    })
    return this
  }
  length(min: number, max?: number) {
    this.cb.push((str: string) => {
      if (str.length < min) throw new ValidationError(`${this.name} can not shorter than ${min}`)
      if (max && str.length > max) throw new ValidationError(`${this.name} can not longer than ${max}`)
    })
    return this
  }
  apply(str: string) {
    if (str !== '' && !str) throw new ValidationError(`${this.name} field is required`)
    str = `${str}`
    this.cb.forEach((cb) => cb(str))
    return str
  }
}

export class Validatenum {
  private cb: any[] = []
  constructor(private name: string) {}
  notZero() {
    this.cb.push((num: number) => {
      if (num === 0) throw new ValidationError(`${this.name} can not be 0.`)
    })
    return this
  }
  between(min: number, max?: number) {
    this.cb.push((num: number) => {
      if (num < min) throw new ValidationError(`${this.name} can not less than ${min}`)
      if (max && num > max) throw new ValidationError(`${this.name} can not more than ${max}`)
    })
    return this
  }
  apply(num: any): number {
    if (num !== 0 && !num) throw new ValidationError(`${this.name} field required`)
    num = +num
    this.cb.forEach((cb) => cb(num))
    return num
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
