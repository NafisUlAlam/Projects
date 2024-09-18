const input = document.getElementById("text-input");
const button = document.getElementById("check-btn");
const resDiv = document.getElementById("result");

function isPalindrome(str) {
  let i = 0,
    j = str.length - 1;
  while (i < j) {
    if (str[i] !== str[j]) return false;
    i++, j--;
  }
  return true;
}

button.addEventListener("click", (event) => {
  if (!input.value) {
    alert("Please input a value");
  }
  const badInput = input.value;
  let arr = [];
  for (const letter of badInput) {
    if (
      (letter >= "a" && letter <= "z") ||
      (letter >= "A" && letter <= "Z") ||
      (letter >= "0" && letter <= "9")
    )
      arr.push(letter);
  }
  const goodStr = arr.join("");
  console.log(goodStr);
  const finalStr = goodStr.toLowerCase();
  if (isPalindrome(finalStr)) {
    resDiv.innerText = `${badInput} is a palindrome`;
  } else resDiv.innerText = `${badInput} is not a palindrome`;
});
