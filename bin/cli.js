#!/usr/bin/env node
const argv = require('yargs').argv
const main = require('../src/index');

const url = argv.u || 'https://mazipan.space';
const device = argv.d || 'mobile';
const apiKey = argv.k;
const hit = argv.h || 1;
const quantile = argv.q || 0.75;

async function mainBin() {
	if (!apikey) {
		console.log(chalk.red(`Please type your api key, read https://s.id/apikey`));
		process.exit(1)
	}

	await main({
		url: url,
		apiKey: apiKey,
		device: device,
		hitNumber: parseInt(hit, 10),
		quantile: parseFloat(quantile),
		logResult: true
	})
}

mainBin();
