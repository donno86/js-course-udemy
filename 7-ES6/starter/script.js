// Let and const
/*
// ES5 || Function scoped
var name5 = 'Jane Smith';
var age5 = 23;
name5 = 'Jane Miller';
console.log(name5);

// ES6 || Block scoped
const name6 = 'Jane Smith';
let age6 = 23;
name6 = 'Jane Miller'
console.log(name6);
*/

// ES5
/*
function driversLicense(passedTest){
    if (passedTest){
        var firstName = 'John';
        var yearOfBirth = 1990;
        
    }
    console.log(firstName + yearOfBirth);
}
driversLicense(true);



// ES6
function driversLicense6(passedTest){
    if (passedTest){
        let firstName = 'John';
        const yearOfBirth = 1990;
       
    }
    console.log(firstName + yearOfBirth);
}
driversLicense6(true);

*/
///////////////////////
//Lecture: Maps

const question = new Map();
question.set('question', 'What is the official name of the latest major JS version?');
question.set(1,'ES5');
question.set(2, 'ES6');
question.set(3, 'ES2015');
question.set(4, 'ES7');
question.set('correct', 3);

question.set(true, 'Correct answer');
question.set(false, 'Wrong,try again');

// console.log(question.get('question'));
// console.log(question.size);

if(question.has(4)){
    //console.log('Answer 4 is here');
}

// question.forEach((value, key) =>
//     console.log(`this is ${key}, and it's set to ${value}`));

    for (let [key, value] of question.entries()) {
      if (typeof(key) === 'number' ) {
          console.log(`Answer ${key}: ${value}`);
      }
    }

    const ans = parseInt(prompt('Write the correct answer'));

    console.log(question.get(ans === question.get('correct')));