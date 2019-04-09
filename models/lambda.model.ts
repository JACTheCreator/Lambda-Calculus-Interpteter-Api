import { launch } from 'puppeteer'

class Lambda {
	private equation: string;

	constructor(equation: string) {
		this.equation = equation
	}

	async getAnswer() {
		const browser = await launch({
			headless: true
		});

		const page = await browser.newPage();

		await page.goto('http://www.cburch.com/lambda/');

		//dom element selectors
		const INPUT_SELECTOR = '#reduceForm input';
		const BUTTON_SELECTOR = '.imgbutton';
		const INTERMEDIATE_STEPS_SELECTOR = '#showform button';

		await page.click(INPUT_SELECTOR);
		await page.keyboard.type(this.equation);

		await page.click(BUTTON_SELECTOR);

		try {
			await page.click(INTERMEDIATE_STEPS_SELECTOR);
		}
		catch(e){

		}

		let steps = await page.evaluate(() =>{
			const elements = document.querySelectorAll('#reduction');
			return Array.from(elements).map(element => element.innerText);
		});

		steps = steps[0].split('\n')

		for(let i in steps) {
			steps[i] = steps[i].replace(/⇒\t/, '')
			console.log(steps[i])
		}

		browser.close();
		return steps;
	}
}

export default Lambda;