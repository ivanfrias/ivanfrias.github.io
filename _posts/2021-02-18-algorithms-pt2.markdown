---
layout: post
title:  "algorithms - pt2"
date:   2021-02-18 19:00:00 +0000
categories: algorithms development javascript
---

# Unary challenge

## Description of the problem

This is the part of the algorithms series posts. Today we will review another interesting exercise called 'Unary'.
Basically the idea is to parse a given string, convert each character to it's ASCII representation and then convert it to the binary form.
After we have the binary form, we need to encode the binary string as follows:

- if it's a '1', then we print the value '0' one time
- if it's a '0', then we print the value '0' two times

If there is a block of digits with the same value then we print the encoding of that digit, concatenated with a space and with a count of how many occurences of that digit there is. e.g.:

Character 'C' to binary is '1000011'. The unary version of this is:
'0 0 00 0000 0 00'. Block '0 0 ' represents one occurence of the 1 digit. Block '00 0000' represents 4 occurences of the '0' digit ( and so on and so forth).

## Implementation

In a nutshell, to fix this we need to convert each character to binary, loop through the binary string, get hold of current character and next and based on whether they are equal or not, we decide to keep counting the number of occurences or not. The last step is to print out the number of digit occurences on the final string:

```
const unary = (input) => {
  let finalString = "";

  for (let i = 0; i < input.length; i += 1) {
    const charCode = input.charCodeAt(i);
    const charCodeBinary = charCode.toString(2);
    let count = 0;

    for (let j = 0; j < charCodeBinary.length; j += 1) {
      const current = charCodeBinary[j];
      const next =
        j + 1 < charCodeBinary.length ? charCodeBinary[j + 1] : undefined;

      if (current === next) {
        count += 1;
      } else {
        count += 1;

        finalString += current === "0" ? "00 " : "0 ";

        for (let k = 1; k <= count; k += 1) {
          finalString += "0";
        }

        finalString += " ";
        count = 0;
      }
    }
  }

  return finalString;
};
```

## Line by line analysis 


Loop through the input string:

```
for (let i = 0; i < input.length; i += 1)
``` 

Convert to ASCII and then to binary:

```
  const charCode = input.charCodeAt(i);
  const charCodeBinary = charCode.toString(2);
```

Loop through the generated binary string, assigning the current and next variables for comparison:

```
  for (let j = 0; j < charCodeBinary.length; j += 1) {
    const current = charCodeBinary[j];
    const next =
      j + 1 < charCodeBinary.length ? charCodeBinary[j + 1] : undefined;
```

If current digit and next digit are the same, we keep counting occurences:

```
  if (current === next) {
    count += 1;
  } else {
```

Otherwise, we print the block and reset the count:

```
  count += 1;

  finalString += current === "0" ? "00 " : "0 ";

  for (let k = 1; k <= count; k += 1) {
    finalString += "0";
  }

  finalString += " ";
  count = 0;
```

## Conclusion
Hope you find this post interesting. I'll keep exercises coming as they see fit. If you have any questions, please contact me via email [email](frias.ivan@gmail.com).













