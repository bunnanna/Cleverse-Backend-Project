class str {
	constructor(private str: string, private name: string = "String") {
		if (typeof this.str !== "string") {
			throw new Error(`${this.name} is not string`);
		}
	}
	notEmpty() {
		if (this.str.length === 0) throw new Error(`${this.name} is empty string`);
		return this;
	}
	length(min: number, max?: number) {
		if (this.str.length < min)
			throw new Error(`${this.name} shorter than ${min}`);
		if (max && this.str.length > max)
			throw new Error(`${this.name} longer than ${max}`);
		return this;
	}
	value() {
		return this.str;
	}
	toNum() {
		const result = +this.str;

		if (isNaN(result)) throw new Error(`${this.name} can not parse to number`);
		return result;
	}
}

class num {
	constructor(private num: number, private name: string = "Number") {
		if (typeof this.num !== "number")
			throw new Error(`${this.name} is not number`);
	}
	notZero() {
		if (this.num === 0) throw new Error(`${this.name} can not be 0.`);
		return this;
	}
	between(min: number, max?: number) {
		if (this.num < min)
			throw new Error(`${this.name} can not less than ${min}`);
		if (max && this.num > max)
			throw new Error(`${this.name} can not more than ${max}`);
		return this;
	}
	value() {
		return this.num;
	}
	toString() {
		return `${this.num}`;
	}
}

class date {
	private date: Date;
	constructor(date: number | string | Date, private name: string = "Date") {
		this.date = new Date(date);
		if (this.date.toString() === "Invalid Date")
			throw new Error(`${this.name} is invalid Date Format`);
	}

	before(date: Date) {
		date = new Date(date);
		if (this.date < date)
			throw new Error(`${this.name} not come before ${date}`);
		return this;
	}
	after(date: Date) {
		date = new Date(date);
		if (this.date > date)
			throw new Error(`${this.name} not come after ${date}`);
		return this;
	}
	value() {
		return this.date;
	}
}

const Validator = { str, num, date };
export default Validator;
