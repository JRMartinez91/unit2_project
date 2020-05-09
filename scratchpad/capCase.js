const capCase = (phrase) => {

    //split phrase into an array of letters
    let phraseArray = phrase.split("");
    
    //capitalize first letter of the array
    phraseArray[0] = phraseArray[0].toUpperCase();

    //for remaining letters...
    for(let i = 1; i < phraseArray.length; i++){
        //...capitalize the letter if the previous character is a space
        if(phraseArray[i-1]==" "){
            phraseArray[i] = phraseArray[i].toUpperCase();
        }
    }
    //convert array to string
    const newPhrase = phraseArray.reduce((acc,cur)=>{
        return acc + cur;
    })


    return newPhrase
}

//return an array of strings with Each Word In Each String Capitalized
const arrayCapCase = (arrayOfTags) => {

    let newTags = [];

    for(i = 0; i < arrayOfTags.length; i++){
        newTags.push(capCase(arrayOfTags[i]));
    }

    return newTags;
}

console.log(capCase("god's in his heaven, all's right with the world"))

testCase = ["i'm singing in the rain","never tell me the odds","you talkin' to me?"]

console.log(arrayCapCase(testCase));