// This requires 2 layers. pg and aws-sdk

exports.handler = async (event) => {
  // S3 Uploader
  const AWS = require('aws-sdk');
  const s3 = new AWS.S3({region: 'us-east-2'});
  // Postgres handlers
  const { Client } = require('pg');
  const client = new Client();
  // Permutation function
  function permute(arrOfArrs, option=true) {
    // creates permutations of all combinations of words
    const permutations = [];
    const acronymLength = arrOfArrs.length-1;
    function helper(arr, i) {
      for (let j=0, k=arrOfArrs[i].length; j<k; j++) {
        let holderArr = arr.slice(0); // clone arr
        holderArr.push(arrOfArrs[i][j]);
        if (i===acronymLength){
          if(holderArr.some(letter=>/[aeiouy]/.test(letter))){
            permutations.push(option && holderArr.join('') || holderArr);
          }
        } else {
          helper(holderArr, i+1);
        }
      }
    }
    helper([], 0);
    return permutations;
  }
  // Parses body to turn string into array of arrays
  console.log('data received');
  const arrs = JSON.parse(event.body);
  const permutes = permute(arrs.words);
  console.log('data permuted');
  // Turns arrays into string to be stored in S3 JSON file
  const strPermute = JSON.stringify(permutes).replace(/,/g, `][`);
  // Params for s3 upload
  const fileName = arrs.fileName
  const params = {
    Bucket : 'words2043',
    Key : fileName,
    Body : (strPermute)
  };
  // S3 Upload
  try {
    const res = await s3.upload(params).promise();
    console.log('complete:', res);
  } catch(err) {
    console.log('error:', err);
  }
  // Creating variables for responses
  let response;
  let errorResponse;
  // Redshift query
  await client.connect();
  try {
    await client.query(`BEGIN`);
    await client.query(`DELETE FROM "tempwords";`);
    let copyText = `
      COPY tempwords
      from '${process.env.S3_PATH}/testing'
      iam_role '${process.env.REDSHIFT_ROLE}'
      json '${process.env.S3_PATH}/test_jsonpath.json';
    `;
    copyText = copyText.replace('testing', fileName);
    await client.query(copyText);
    const results = await client.query(`SELECT * FROM "words" WHERE word = ANY(SELECT words FROM tempwords);`);
    await client.query('COMMIT');
    response = {
      headers: {
        'Content-Type': 'application/json',
      },
      statusCode: 200,
      body: JSON.stringify(results.rows),
    };
    const results2 = await s3.deleteObject({Bucket : process.env.BUCKET_NAME, Key : fileName}).promise();
    console.log ('deleted', results2);
  } catch(err) {
    client.query('ROLLBACK');
    console.log(err);
    errorResponse = {
      headers: {
        'Content-Type': 'application/json',
      },
      statusCode: 500
    };
  } finally {
    await client.end();
  }
  console.log('data sent');
  if(errorResponse){
    return errorResponse;
  } else {
    return response;
  }
};
