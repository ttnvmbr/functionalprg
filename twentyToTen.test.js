function twentyToTen(input) {
  // if array length is 10 return array
  // else calc new array and repeat
  if (input.length == 10) return input;
  else {
    // split input into 2 arrays of 10 and the leftovers
    const blockA = input.slice(0, 10);
    const blockB = input.slice(10, 20);
    const leftOvers = input.slice(20);

    // multiply every number in array 1 with the numbers from array 2 of the same index
    const blockC = blockA.map((a, index) => (a + blockB[index]) % 10);
    // add the leftovers to the newly created array of 10
    const blockD = blockC.concat(leftOvers);

    return twentyToTen(blockD);
  }
}

test("returns array of 10", () => {
  const array = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 7, 1, 2, 3, 4, 5,
    6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 7,
  ];
  const newArray = twentyToTen(array);
  expect(newArray.length).toBe(10);
});

test("returns the correct new array, same every time", () => {
  const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 7];
  const blockA = array.slice(0, 10);
  const blockB = array.slice(10, 20);
  const blockC = blockA.map((a, index) => (a + blockB[index]) % 10);

  const toTen = twentyToTen(array);
  expect(toTen).toEqual(blockC);
});
