// cheerio是一个NodeJS的三方库，可以方便的把它理解为一个NodeJS的jquery，使用方式和jquery基本相同。

var cheerio = require('cheerio'); 

var $ = cheerio.load('<h2 class="title">Hello</h2>');
$('h2.title').text('Hello hhydexk.com!');
$('h2').addClass('welcome');

console.log($.html());