#!/usr/bin/env node
const initPrompt = require('./prompt');
const chalk = require('chalk');
const main = require('../src/index');

async function mainBin() {
	const answer = await initPrompt();
	if (!answer.apikey) {
		console.log(chalk.red(`Please type your api key, read https://s.id/apikey`));
		process.exit(1)
	}

	await main({
		url: answer.url,
		apiKey: answer.apikey,
		device: answer.device,
		hitNumber: parseInt(answer.hit, 10),
		quantile: parseFloat(answer.quantile),
		logResult: true
	})
}

try {
	mainBin();
} catch (error) {
	console.log(chalk.red(`[webperf-psi] top level error`), error);
}
