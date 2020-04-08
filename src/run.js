const fetch = require('node-fetch');

module.exports = async function run(apiUrl) {
	const resp = await fetch(apiUrl, {
		method: 'GET',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		}
	});

	const result = await resp.json();
	if (result) {
		const categories = result.lighthouseResult.categories || null;
		const audits = result.lighthouseResult.audits || null;
		const totalResources = audits['resource-summary'].details.items[0] || null;

		const data = {
			perf: categories.performance.score * 100 || 0,

			fcp: audits['first-contentful-paint'].numericValue || 0,
			ttfb: audits['time-to-first-byte'].numericValue || 0,
			fci: audits['first-cpu-idle'].numericValue || 0,
			tti: audits['interactive'].numericValue || 0,
			si: audits['speed-index'].numericValue || 0,

			size: totalResources.size || 0,
			req: totalResources.requestCount || 0,
		};

		return data;
	}

	return null;
};
