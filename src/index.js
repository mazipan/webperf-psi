const chalk = require('chalk');
const ora = require('ora');

const runPSI = require('./run');
const utils = require('./utils');

module.exports = async function main({ url, apiKey, device = 'mobile', hitNumber = 1, quantile = 0.75, logResult }) {
	if (logResult) {
		console.log(chalk.green('\n==== WELCOME TO WEB PERF PSI ====\n'));
	}

	const apiUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(url)}&key=${apiKey}&strategy=${device}`;

	const rangeHit = [];
	for (let index = 0; index < hitNumber; index++) {
		rangeHit.push(index)
	}

	const allReports = [];
	for (const i of rangeHit) {
		const spinner = ora(`Processing task ${i + 1}...\n`).start();
		const data = await runPSI(apiUrl);
		allReports.push(data);
		spinner.stopAndPersist({
			symbol: '✅',
			text: 'Done'
		});
	}

	console.log(chalk.green('\n==== RESULT SUMMARY ====\n'));
	const report = utils.quantile(allReports, parseFloat(quantile), 'perf');

	if (logResult) {
		console.log(`
---------------------------------
Result for ${url}
---------------------------------
Perf              : ${report.perf}
TTFB              : ${report.ttfb}
FCI               : ${report.fci}
FCP               : ${report.fcp}
TTI               : ${report.tti}
SI                : ${report.si}
Total Size        : ${report.size}
Resources Count   : ${report.req}
---------------------------------
		`);

		console.log(chalk.green('\nThank you for using this tools, you can support me by giving a star on the github repo\n'));
	}

	return report;
};
