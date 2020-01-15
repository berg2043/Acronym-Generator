module.exports = function permute(arrOfArrs) {
  // creates permutations of all combinations of words
  const permutations = []
  const acronymLength = arrOfArrs.length-1;
  function helper(arr, i) {
      for (let j=0, k=arrOfArrs[i].length; j<k; j++) {
          let holderArr = arr.slice(0); // clone arr
          holderArr.push(arrOfArrs[i][j]);
          if (i==acronymLength)
              permutations.push(holderArr);
          else
              helper(holderArr, i+1);
      }
  }
  helper([], 0);

  // Creates an object that has accronyms that references the words that create them
  const finalObject = permutations.reduce((outer, inner)=>{
    let word = inner.reduce((str, i)=>{
      str += i[0]
      return str;
    },'')
    outer[word]? outer[word].push(inner):outer[word]=[inner]
    return outer;
  },{})

  return finalObject;
}