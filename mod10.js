function mod10(text) {
  // remove spaces and split all characters
  const noSpaces = text.replace(/\s+/g, "");
  const splitted = [...noSpaces];

  // new array of ascii characters of the splitted characters
  const ascii = splitted.map((index) => {
    return toAscii(index);
  });

  // split the array of numbers into an array of single numbers
  const finalSplit = splitNumbers(ascii);

  // add numbers till number of items in array is a multitude of 10
  const multitudeTen = addNumbers(finalSplit);

  // perform hashing calculation and turn into array of 10
  const hashed = twentyToTen(multitudeTen);

  // turn into string
  const finalString = hashed.join("");

  sha256(finalString).then((r) => {
    console.log(r);
  });

  // SHA256
  // return sha256(finalString)
  //   .then((res) => {
  //     return res;
  //   })
  //   .catch((e) => {
  //     return e;
  //   });
}

// console.log(mod10("text"));

function toAscii(input) {
  // if character is number return number
  if (!isNaN(input)) return input;
  // if character isNan return ascii in string form
  else return input.charCodeAt(0).toString();
}

function splitNumbers(input) {
  const numbersArray = [];
  for (item of input) {
    // if number is a single number, return number
    if (item.length === 1) numbersArray.push(Number(item));
    else {
      // else return every single number of the bigger number
      for (microItem of item) {
        numbersArray.push(Number(microItem));
      }
    }
  }
  return numbersArray;
}

function addNumbers(input) {
  // if array % 10 === 0 is true return array
  // else add random number and repeat
  if (input.length % 10 === 0) return input;
  else {
    input.push(Math.floor(Math.random() * 10));
    return addNumbers(input);
  }
}

function twentyToTen(input) {
  // if array length is 10 return array
  // else calc new array and repeat
  if (input.length == 10) {
    console.log(input);
    return input;
  } else {
    // split input into 2 arrays of 10 and the leftovers
    const blockA = input.slice(0, 10);
    const blockB = input.slice(10, 20);
    const leftOvers = input.slice(20);

    // add every number in array 1 to the numbers from array 2 of the same index % 10
    const blockC = blockA.map((a, index) => (a + blockB[index]) % 10);

    // add the leftovers to the newly created array of 10
    const blockD = blockC.concat(leftOvers);

    return twentyToTen(blockD);
  }
}

async function sha256(input) {
  const msgUint8 = new TextEncoder().encode(input); // encode as (utf-8) Uint8Array
  const hashBuffer = await crypto.subtle.digest("SHA-256", msgUint8); // hash the message
  const hashArray = Array.from(new Uint8Array(hashBuffer)); // convert buffer to byte array
  const hashHex = hashArray
    .map((b) => b.toString(16).padStart(2, "0"))
    .join(""); // convert bytes to hex string
  return hashHex;
}
