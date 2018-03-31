//Jan 1st 1970 00:00:10 am
// let date = new Date(); 
// console.log(date.getMonth());

let moment = require('moment');

// let date = moment();
// date.add(1, 'year').subtract(12, 'months');
// console.log(date.format('Do MMM, YYYY'));

// new Date().getTime()

let someTimestamp = moment().valueOf();
console.log(someTimestamp);

let createdAt = 1234;
let date = moment(createdAt);
console.log(date.format('h:mm a'));