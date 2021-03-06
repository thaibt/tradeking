'use strict'

var OAuth = require('oauth').OAuth;
var querystring = require('querystring');

const accountsEndpoint = 'https://api.tradeking.com/v1/accounts';
const marketEndpoint = 'https://api.tradeking.com/v1/market';
const memberEndpoint = 'https://api.tradeking.com/v1/member';
const utilityEndpoint = 'https://api.tradeking.com/v1/utility';
const watchlistEndpoint = 'https://api.tradeking.com/v1/watchlists';

class Tradeking {
    constructor(credentials, format) {
        this.format = format;
        this.token = credentials.access_token;
        this.tokenSecret = credentials.access_secret;
        this.oa = new OAuth(
            null,
            null,
            credentials.consumer_key,
            credentials.consumer_secret,
            "1.0",
            null,
            "HMAC-SHA1"
        );
    }

    get(endpoint, params = {}, callback) {
        var promise = new Promise((resolve, reject) => {
            this.oa.get(
                endpoint  + '?' + querystring.stringify(params),
                this.token,
                this.tokenSecret,
                (err, data, res) => {
                    if (err) reject(err);
                    else resolve(data);
                }
            );
        });

        if (!callback) return promise;

        promise
            .then((res) => { callback(null, res); })
            .catch((err) => { callback(err); });

        return null;
    }

    post(endpoint, bodyParams = {}, callback) {
        var promise = new Promise((resolve, reject) => {
            this.oa.post(
                endpoint,
                this.token,
                this.tokenSecret,
                querystring.stringify(bodyParams),
                'application/x-www-form-urlencoded',
                (err, data, res) => {
                    if (err) reject(err);
                    else resolve(data);
                }
            );
        });

        if (!callback) return promise;

        promise
            .then((res) => { callback(null, res); })
            .catch((err) => { callback(err); });

        return null;
    }

    // Account Calls
    // -------------------------------------------------------------------------
    accountsInfo(callback) {
        return this.get(
            accountsEndpoint + '.' + this.format,
            undefined,
            callback
        );
    }

    accountsBalances(callback) {
        return this.get(
            accountsEndpoint + '/balances.' + this.format,
            undefined,
            callback
        );
    }

    accountInfo(id, callback) {
        return this.get(
            accountsEndpoint + '/' + id + '.' + this.format,
            undefined,
            callback
        );
    }

    accountBalances(id, callback) {
        return this.get(
            accountsEndpoint + '/' + id + '/balances.' + this.format,
            undefined,
            callback
        );
    }

    accountHistory(id, params, callback) {
        if (typeof params === 'function') {
            callback = params;
            params = undefined;
        }

        return this.get(
            accountsEndpoint + '/' + id + '/history.' + this.format,
            params,
            callback
        );
    }

    accountHoldings(id, callback) {
        return this.get(
            accountsEndpoint + '/' + id + '/holdings.' + this.format,
            undefined,
            callback
        );
    }

    // Market Calls
    // -------------------------------------------------------------------------
    marketClock(callback) {
        return this.get(
            marketEndpoint + '/clock.' + this.format,
            undefined,
            callback
        );
    }

    marketQuotes(params, callback) {
        if (typeof params === 'function') {
            callback = params;
            params = undefined;
        }

        return this.get(
            marketEndpoint + '/ext/quotes.' + this.format,
            params,
            callback
        );
    }

    marketNewsSearch(params, callback) {
        if (typeof params === 'function') {
            callback = params;
            params = undefined;
        }

        return this.get(
            marketEndpoint + '/news/search.' + this.format,
            params,
            callback
        );
    }

    marketNewsArticle(id, callback) {
        return this.get(
            marketEndpoint + '/news/' + id + '.' + this.format,
            undefined,
            callback
        );
    }

    marketOptionsSearch(params, callback) {
        if (typeof params === 'function') {
            callback = params;
            params = undefined;
        }

        return this.get(
            marketEndpoint + '/options/search.' + this.format,
            params,
            callback
        );
    }

    marketOptionsStrikes(params, callback) {
        if (typeof params === 'function') {
            callback = params;
            params = undefined;
        }

        return this.get(
            marketEndpoint + '/options/strikes.' + this.format,
            params,
            callback
        );
    }

    marketOptionsExpirations(params, callback) {
        if (typeof params === 'function') {
            callback = params;
            params = undefined;
        }

        return this.get(
            marketEndpoint + '/options/expirations.' + this.format,
            params,
            callback
        );
    }

    marketTimesales(params, callback) {
        if (typeof params === 'function') {
            callback = params;
            params = undefined;
        }

        return this.get(
            marketEndpoint + '/timesales.' + this.format,
            params,
            callback
        );
    }

    marketToplists(list, params, callback) {
        if (typeof params === 'function') {
            callback = params;
            params = undefined;
        }

        return this.get(
            marketEndpoint + '/toplists/' + list + '.' + this.format,
            params,
            callback
        );
    }

    // Member Calls
    // -------------------------------------------------------------------------
    memberProfile(callback) {
        return this.get(
            memberEndpoint + '/profile.' + this.format,
            undefined,
            callback
        );
    }

    // Utility Calls
    // -------------------------------------------------------------------------
    utilityStatus(callback) {
        return this.get(
            utilityEndpoint + '/status.' + this.format,
            undefined,
            callback
        );
    }

    utilityVersion(callback) {
        return this.get(
            utilityEndpoint + '/version.' + this.format,
            undefined,
            callback
        );
    }

    // Watchlist Calls
    // -------------------------------------------------------------------------
    getWatchlists(callback) {
        return this.get(
            watchlistEndpoint + '.' + this.format,
            undefined,
            callback
        );
    }

    createWatchlist(bodyParams, callback) {
        if (typeof bodyParams === 'function') {
            callback = bodyParams;
            bodyParams = undefined;
        }

        return this.post(
            watchlistEndpoint + '.' + this.format,
            bodyParams,
            callback
        );
    }

    getWatchlist(id, callback) {
        return this.get(
            watchlistEndpoint + '/' + id + '.' + this.format,
            undefined,
            callback
        );
    }

    addToWatchlist(id, bodyParams, callback) {
        if (typeof bodyParams === 'function') {
            callback = bodyParams;
            bodyParams = undefined;
        }

        return this.post(
            watchlistEndpoint + '/' + id + '/symbols.' + this.format,
            bodyParams,
            callback
        );
    }
};

module.exports = Tradeking;
