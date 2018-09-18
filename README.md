# NPM Module Boilerplate

[![Build Status](https://travis-ci.org/flexdinesh/npm-module-boilerplate.svg?branch=master)](https://travis-ci.org/flexdinesh/npm-module-boilerplate) [![dependencies Status](https://david-dm.org/flexdinesh/npm-module-boilerplate/status.svg)](https://david-dm.org/flexdinesh/npm-module-boilerplate) [![devDependencies Status](https://david-dm.org/flexdinesh/npm-module-boilerplate/dev-status.svg)](https://david-dm.org/flexdinesh/npm-module-boilerplate?type=dev) [![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

**Start developing your NPM module in seconds** ✨

Readymade boilerplate setup with all the best practices to kick start your npm/node module development.

Happy hacking =)

# Features

-   **ES6/ESNext** - Write _ES6_ code and _Babel_ will transpile it to ES5 for backwards compatibility
-   **Test** - _Mocha_ with _Istanbul_ coverage
-   **Lint** - Preconfigured _ESlint_ with _Airbnb_ config
-   **CI** - _TravisCI_ configuration setup
-   **Minify** - Built code will be minified for performance

# Development

-   `npm run clean` - Remove `lib/` directory
-   `npm test` - Run tests with linting and coverage results.
-   `npm test:only` - Run tests without linting or coverage.
-   `npm test:watch` - You can even re-run tests on file changes!
-   `npm test:prod` - Run tests with minified code.
-   `npm run test:examples` - Test written examples on pure JS for better understanding module usage.
-   `npm run lint` - Run ESlint with airbnb-config
-   `npm run cover` - Get coverage report for your code.
-   `npm run build` - Babel will transpile ES6 => ES5 and minify the code.
-   `npm run prepublish` - Hook for npm. Do all the checks before publishing your module.

# Installation

Just clone this repo and remove `.git` folder.

# License

MIT © Dinesh Pandiyan

# API

## Functions

<dl>
<dt><a href="#price">price(unit)</a> ⇒ <code>number</code></dt>
<dd><p>Retrieve the current price for submitting data to The Registry</p>
</dd>
<dt><a href="#get">get(_address)</a> ⇒ <code>string</code> | <code>string</code></dt>
<dd><p>Retrieve metadata for this address</p>
</dd>
<dt><a href="#storeMetadata">storeMetadata(_address, _name, _data, _callback)</a> ⇒ <code>string</code></dt>
<dd><p>Stores address metadata on The Registry</p>
</dd>
<dt><a href="#storeJsonFileIPFS">storeJsonFileIPFS(Blob)</a> ⇒ <code>string</code></dt>
<dd><p>Reads content of a JSON file and stores it on IPFS</p>
</dd>
<dt><a href="#storeDataFileIPFS">storeDataFileIPFS(Blob)</a> ⇒ <code>string</code></dt>
<dd><p>Reads content of a Plaintext file and stores it on IPFS</p>
</dd>
<dt><a href="#convertBlobToBase64">convertBlobToBase64(Blob)</a> ⇒ <code>string</code></dt>
<dd><p>Converts an image blob to a base64 string</p>
</dd>
<dt><a href="#lookUp">lookUp(IPFS)</a> ⇒ <code>string</code></dt>
<dd><p>Reads content of a JSON file and stores it on IPFS</p>
</dd>
</dl>

<a name="price"></a>

## price(unit) ⇒ <code>number</code>
Retrieve the current price for submitting data to The Registry

**Kind**: global function  
**Returns**: <code>number</code> - Current price  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| unit | <code>string</code> | <code>&quot;ether&quot;</code> | Unit to convert the price to (defaults to 'ether') |

<a name="get"></a>

## get(_address) ⇒ <code>string</code> \| <code>string</code>
Retrieve metadata for this address

**Kind**: global function  
**Returns**: <code>string</code> - Address Metadata object with received metadata or null when no metadata available<code>string</code> - Name Metadata object with received metadata or null when no metadata available  

| Param | Type |
| --- | --- |
| _address | <code>string</code> | 

<a name="storeMetadata"></a>

## storeMetadata(_address, _name, _data, _callback) ⇒ <code>string</code>
Stores address metadata on The Registry

**Kind**: global function  
**Returns**: <code>string</code> - TX Hash of the submitted file  

| Param | Type | Description |
| --- | --- | --- |
| _address | <code>string</code> | Address for which you are submitting data |
| _name | <code>string</code> | Name of the address |
| _data | <code>string</code> | Metadata object |
| _callback | <code>function</code> | Callback for when the transaction receipt is returned |

<a name="storeJsonFileIPFS"></a>

## storeJsonFileIPFS(Blob) ⇒ <code>string</code>
Reads content of a JSON file and stores it on IPFS

**Kind**: global function  
**Returns**: <code>string</code> - IPFS Hash of stored file  

| Param | Type | Description |
| --- | --- | --- |
| Blob | <code>blob</code> | accepted by Filereader |

<a name="storeDataFileIPFS"></a>

## storeDataFileIPFS(Blob) ⇒ <code>string</code>
Reads content of a Plaintext file and stores it on IPFS

**Kind**: global function  
**Returns**: <code>string</code> - IPFS Hash of stored file  

| Param | Type | Description |
| --- | --- | --- |
| Blob | <code>blob</code> | accepted by Filereader |

<a name="convertBlobToBase64"></a>

## convertBlobToBase64(Blob) ⇒ <code>string</code>
Converts an image blob to a base64 string

**Kind**: global function  
**Returns**: <code>string</code> - base64 encoded image file  

| Param | Type | Description |
| --- | --- | --- |
| Blob | <code>blob</code> | accepted by Filereader |

<a name="lookUp"></a>

## lookUp(IPFS) ⇒ <code>string</code>
Reads content of a JSON file and stores it on IPFS

**Kind**: global function  
**Returns**: <code>string</code> - JSON contents returned from IPFS  

| Param | Type | Description |
| --- | --- | --- |
| IPFS | <code>string</code> | address to look up |



* * *

&copy; 2018 - Alexander Mangel