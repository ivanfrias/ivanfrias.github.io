---
layout: post
title:  "algorithms - pt1"
date:   2021-02-17 10:00:00 +0000
categories: algorithms develolopment javascript
---

# Needle in haystack challenge

Today I want to talk about algorithms. Traditionally underrated, unless you start a recruitment process.. and the target company asks you to do an exercise. 

Tipically the idea is simple and sound, but a bit more difficult to implement. It is also a good indication on how you react under presssure. It gives clues to the recruiter about your technical skills and also personal traits. Not all professionals are tailored to work under pressure. Some might work OK, some may simply block completely even if the solution is in front of you, independently of the amount of expertise you might have.

To be honest, I don't agree with this approach. Evaluate someone based only on wether they are able to solve a programming exercise within a timeframe doesn't give any feedback to the recruiter about the expertise with other technologies, application architecture or even how he/she works on a team context.

But anyway - let's start off with a simple exercise. I'll put a description, MY solution and the reason for that.

Imagine you have a single sentence and a "pool" of characters. The idea of this exercise is to count how many words you can count on that pool. Order of the characters don't matter here.

E.G.:

```
console.log(findNeedleInHaystack('test', 'test')) // 1
console.log(findNeedleInHaystack('test', 'testtest')) //2
```

# Implementation

This is the final solution:

```
const findNeedleInHaystack = (needle, haystack) => {
  let needleInHaystackCount = 0;
  let words = 0;

  for (let i = 0; i < haystack.length; i += 1) {
    for (let j = 0; j < needle.length; j += 1) {
      if (haystack[i] === needle[j]) {
        needleInHaystackCount += 1;
        break;
      }
    }

    if (needleInHaystackCount === needle.length) {
      words++;
      needleInHaystackCount = 0;
    }
  }

  return words;
};
```

## Line by line analysis

The first loop iterates over the haystack string. This is the pool of characters that will be used to count how many full words can be calculated:

```
for (let i = 0; i < haystack.length; i += 1)
``` 

The inner loop iterates over each character of the request string:

```
for (let j = 0; j < needle.length; j += 1)
```

If the character on the requested string exists on the pool of characters, the character count is incremented and loop is terminated: 

```
if (haystack[i] === needle[j]) {
  needleInHaystackCount += 1;
    break;
}
```

Afterwards, this script checks if the word is complete, if yes, the number of words is incremented and the character counter (needleInHaystackCount) is reset to be used for the next word count:

```
if (needleInHaystackCount === needle.length) {
  words++;
  needleInHaystackCount = 0;
}
```

I hope that you enjoyed this exercise. Reach me via [email](mailto:frias.ivan@gmail.com) if you have any questions or comments.

