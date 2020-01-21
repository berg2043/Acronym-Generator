  // Creates an object that has accronyms that references the words that create them
  module.exports = function permuteToString(permutations){
  const permutationStrings = permutations.reduce((outer, inner)=>{
    let word = inner.reduce((str, i)=>{
      str += i[0]
      return str;
    },'')
    outer.push(word);
    return outer;
  },[])
  return permutationStrings;
}