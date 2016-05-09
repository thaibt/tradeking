# tradeking

JavaScript wrapper to interface with [Tradeking's API](https://developers.tradeking.com/Documentation). Supports both promises and callbacks.


# Usage

```javascript
var Tradeking = require('Tradeking');

// Info on API access here: https://developers.tradeking.com/documentation/getting-started
var credentials = {
	consumer_key: 'CONSUMER_KEY',
    consumer_secret: 'CONSUMER_SECRET',
    access_token: 'ACCESS_TOKEN',
    access_secret: 'ACCESS_SECRET',
};

// For format options see: https://developers.tradeking.com/documentation/response-structure
var format = 'json';

var tradeking = new Tradeking(credentials, format);

// Callback Support
// See: https://developers.tradeking.com/documentation/accounts-get
tradeking.accountsInfo(function(err, res) {
    if (err) {
		// handle error
        return;
    }

    // do something with response
});

// Promise Support
// See: https://developers.tradeking.com/documentation/market-ext-quotes-get-post
tradeking.marketQuotes({
    symbols: 'Symbol1,Symbol2',
    fields: 'fid1,fid2,fid3',
}).then((response) => {
    // do something with response
}).catch((error) => {
    // handle error
});
```

See [./src/tradeking.js](./src/tradeking.js) for a full list of available methods.


# References

- [Tradeking's API Documentation](https://developers.tradeking.com/Documentation)


# License

MIT License

Copyright (c) 2016 Austin Dillon Urlaub

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
