# webperf-psi

Easy to use, PSI API hit using Node.js to collect Web Performance Metrics

## Get your own API Key

Visit [https://developers.google.com/speed/docs/insights/v5/get-started](https://developers.google.com/speed/docs/insights/v5/get-started)

## Update the Parameters

We use `.env` file for, you see on the `.env-example`

+ `API_KEY`: Your PSI API key
+ `PAGE_URL`: URL to be analyzed
+ `DEVICE`: Device (optional, default to be `mobile`)
+ `RUN`: Number of run you want to hit PSI (optional, the default value is `1`)
+ `QUANTILE`: Quantile value, range value is from 0 to 1 (optional, default is `0.75`)

## Run the analyze

```bash
$ node index.js
```

---

© 2020 Crafted by Irfan Maulana
