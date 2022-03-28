function addNumbers(input) {
  // if array % 10 === 0 is true return array
  // else add random number and repeat
  if (input.length % 10 === 0) return input;
  else {
    input.push(Math.floor(Math.random() * 10));
    return addNumbers(input);
  }
}

test("add numbers to ten", () => {
  const array = [1, 2, 3];
  const newArray = addNumbers(array);
  expect(newArray.length).toBe(10);
});
