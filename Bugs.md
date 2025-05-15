# Bugs Documentation

### Bug1: Incorrectly defined keys
Incorrectly defined keys with array brackets

### Line number
general.ts: 107, 108

### Bug type
undefined 

### Identification Method
using TypeScript intelliscence

### fix
Declared class properties and annotated types



### Bug2: Inconsistent name conventions for element classes
The author is mainly using snake casing for class names but is mixing khebab casing with snake cases

### Line number
index.html: 27, 111 & style.css: 401, 397
### Bug type
Inconsistent name convention

### Identification Method
Identified reading code base

### fix
Chnaged all khebab cases to snake cases


### Bug3: Issue in handling falsy values
In the method customizeAutomaticOffPreset() and customizeAutomaticOnPreset(), the line that checks for a falsy value reverses the logic in the sense that the function continues execution as expected when value is falsy (null, undefined, "", false and 0) instead of returning or stopping execution. This is because, the double negation operator makes the value a truthy so it returns and the rest of the logic is not excuted when value is truthy.
### Line number
advancedSettings.js: 141, 164

### Bug type
Logical error

### Identification Method
Identified reading codebase and using console.logs

### fix
took off one logical not operator in if condition to imply a logical not.


### Bug4: Wrong type checking 
In the handleLightIntensitySlider(), the condition typeof(intensity) === isNaN is an invalid check. isNaN is a function, not a valid type.

### Line number
basicSettings.js: 75
### Bug type
Invalid type checking

### Identification Method
Identified reading codebase and researching on isNan

### fix
Replaced isNan with the isNan() with intensiry passed as an argument which actually checks if intenstiy is not a number.






 