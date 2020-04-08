const Utils = require('../utils');

describe('Utils', () => {
	test('should return sorted', () => {
		const res = Utils.sortAsc([{ perf: 0.4 }, { perf: 0.2 }, { perf: 0.1 }, { perf: 0.3 }], 'perf');
		expect(res[0].perf).toBe(0.1)
		expect(res[3].perf).toBe(0.4)
	})

	test('should return quantile', () => {
		const res1 = Utils.quantile([{ perf: 1 }, { perf: 2 }, { perf: 3 }, { perf: 4 }, { perf: 5 }], 0.25, 'perf');
		expect(res1.perf).toBe(2)

		const res2 = Utils.quantile([{ perf: 1 }, { perf: 2 }, { perf: 3 }, { perf: 4 }, { perf: 5 }], 0.50, 'perf');
		expect(res2.perf).toBe(3)

		const res3 = Utils.quantile([{ perf: 1 }, { perf: 2 }, { perf: 3 }, { perf: 4 }, { perf: 5 }], 0.75, 'perf');
		expect(res3.perf).toBe(4)

		const res4 = Utils.quantile([{ perf: 1 }, { perf: 2 }, { perf: 3 }, { perf: 4 }, { perf: 5 }], 0.95, 'perf');
		expect(res4.perf).toBe(5)
	})
})
