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
  return permutations
}