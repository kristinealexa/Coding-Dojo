var smallerStringA1 = 'abcd'
var smallerStringB1 = 'efg'
var expected = 'efgabcd'

var smallerStringA2 = 'sunnyside up eggs'
var smallerStringB2 = 'biscuits and gravy'
var expected = 'sunnyside up eggsbiscuits and gravy'

/**
 * Combine two given strings together with the smaller string being added
 * in the front. If they are the same length, the first string will be
 * added to the front.
 * NOTE: How do we get the length of a string?
 * @returns {string} The combined strings.
**/
function combineSmallerStringFirst(s1, s2) {
    if (s1.length <= s2.length) {
        answer = s1 + s2
    }
    else {
        answer=s2+s1
    } 
    return answer

}


console.log(combineSmallerStringFirst(smallerStringA1, smallerStringB1))
console.log(combineSmallerStringFirst(smallerStringA2, smallerStringB2))

/************************************************************************************************/

var stringToRepeat1 = 'Birria Tacos'
var numberToRepeat1 = 5
var repeatedExpected = 'Birria TacosBirria TacosBirria TacosBirria TacosBirria Tacos'

var stringToRepeat2 = 'margherita pizza'
var numberToRepeat2 = 2
var repeatedExpected = 'margherita pizzamargherita pizza'

/**
 * Given a string and an integer representing how many times the string should
 * be repeated, create a new string that is the given string repeated that
 * many times.
 * @returns {string} The given string repeated the specified amount of times.
*/
function stringRepeat(str, num) {
    var answer=""
    for (var i = 0; i < num; i += 1) {
        answer += str

    }
    return answer 
}

console.log(stringRepeat(stringToRepeat1, numberToRepeat1))
console.log(stringRepeat(stringToRepeat2, numberToRepeat2))


/************************************************************************************************/

var wordArray = ['shawn', 'jim', 'tyler', 'heidi', 'john', 'alfredo', 'michael']

/**
 * Determines the average length of the words in the given array.
 * average = sum / number of things
 * @returns {number} The average length of the given words.
 */
function avgWordLength(arr) {
    var sum=0
    for (var i = 0; i < arr.length; i += 1) {
        sum+=arr[i].length
    }
    return sum/arr.length
}

console.log(avgWordLength(wordArray))

/**
 * Finds the longest word in the given array of words.
 * @returns {string} The longest word. If there are multiple words with the same
 *    length, this should be the last word in the array with that length.
 */
function findLongestWord(arr) {
   var max=""
    for (var i = 0; i < arr.length; i += 1) {
        
        if (arr[i].length >= max.length) {
            max = arr[i]
        }
    }
    return max
}

console.log(findLongestWord(wordArray))

/************************************************************************************************/

var rangeA1 = 10
var rangeB1 = 15
var rangeExpected = 75



/**
 * Calculates the sum of the given range, inclusive. I.e., the sum of the first
 * number through the last number, inclusive.
 * @returns {number} The sum of the given range, inclusive.
 */
function inclusiveRangeSum(start, stop) {
    var sum = 0
    for (var i = start; i <= stop; i += 1) {
        sum+=i
    }
    return sum
}

console.log(inclusiveRangeSum(rangeA1, rangeB1))