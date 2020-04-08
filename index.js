require('dotenv').config();

const Table = require('cli-table3');
const chalk = require('chalk');
const ora = require('ora');

const runPSI = require('./src/run');
const utils = require('./src/utils');

const url = process.env.PAGE_URL;
const apiKey = process.env.API_KEY;
const device = process.env.DEVICE || 'mobile';
const hitNumber = process.env.RUN || 1;
const quantile = process.env.QUANTILE || 0.75;

// run immediately function
(async () => {
	if (!url) {
		console.log(chalk.red(`Please pass url to be test with parameter 'u', e.g: node index.js --u=https://mazipan.space`));
		process.exit(1)
	}

	console.log(chalk.green('\n==== WELCOME TO WEB PERF PSI ====\n'));
	console.log(chalk.yellow(`URL: ${url}`));
	console.log(chalk.yellow(`Device: ${device}`));
	console.log(chalk.yellow(`Run: ${hitNumber}`));
	console.log(chalk.yellow(`Quantile: ${quantile}\n`));

	const apiUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(url)}&key=${apiKey}&strategy=${device}`;

	const rangeHit = [];
	for (let index = 0; index < hitNumber; index++) {
		rangeHit.push(index)
	}

	const allReports = [];
	for (const i of rangeHit) {
		if (i > 0) {
			console.log(`\n`);
		}

		const spinner = ora(`Processing task ${i+1}...\n`).start();
		const data = await runPSI(apiUrl);

		const tableLog = new Table({
			head: ['Perf', 'TTFB', 'FCP', 'TTI'],
		});
		tableLog.push([data.perf, data.ttfb, data.fcp, data.tti]);
		console.log(`\n${i+1}. Result for ${url} - ${device}`);
		console.log(`${tableLog.toString()}\n`);
		allReports.push(data);

		spinner.stopAndPersist({
			symbol: '✅',
			text: 'Done'
		});
	}

	if (hitNumber > 1) {
		console.log(chalk.green('\n==== FINAL RESULT AFTER CALCULATION ====\n'));
		const tableLog = new Table({
			head: ['Perf', 'TTFB', 'FCP', 'TTI'],
		});
		const report = utils.quantile(allReports, parseFloat(quantile), 'perf');
		tableLog.push([report.perf, report.ttfb, report.fcp, report.tti]);
		console.log(tableLog.toString());
	}
})();
