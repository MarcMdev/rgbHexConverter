//SELECTORS
const rgbInput = document.querySelector('#rgb');
const hexInput = document.querySelector('#hex');
const screen = document.querySelector('#wrapper');
const inputNodes = document.querySelectorAll('.input');
const clipboardBtn = document.querySelectorAll('.copy-icon')
// chart with the corresponding letters for hex numbers above 9
const hexChar = {
  a: 10,
  b: 11,
  c: 12,
  d: 13,
  e: 14,
  f: 15,
}
/************************************/

// RGB to HEX
function rgbHexConverter() {
  
  let rgbStr = rgbInput.value.replace(/[^0-9,]/gi, ''); //removes all unneeded characters
  let rgbArr = rgbStr.split(','); // turns the value into an array

  //criterias for conversion, otherwise the HEX value will be blank (indicating it's null)
  if (rgbArr.length === 3 //checks array length
      && 
        //limits the length of each item between 1 and 3
        rgbArr.every(num => num.length > 0 && num.length < 4) === true 
        &&
          //Limitis the max value to 255
          rgbArr.every(num => Number(num) <= 255) === true) { 

    //Removes 'RGB()' from display in the form
    rgbInput.value = rgbStr; 
    //converts the array from rgbInput into the final HEX CODE
    const hexCode = rgbArr.reduce((acc, val) => {
      let value = Number(val);
      let hexArray = [];

      //convertion calculations
      while (value !== 0) {
        let calc = (value / 16);
        let result = ((calc - (Math.floor(calc))) * 16);

        value = Math.floor(calc);
        //Check if the result matches the 'hexChar' and change it to the corresponding letter
        Object.entries(hexChar).forEach(i => {
          if(result === i[1]) result = i[0]
        });
        //inserts the result at the beggining of the array
        hexArray.unshift(String(result));
      }
      // grants that there will always be a '0' before the value in case it's a single character
      hexArray.length < 2 ? acc.push('0' + hexArray[0]) : acc.push(hexArray.join(''));

      return acc;
    }, [])
      //concatenates the array into a single String
      .join('');
    //Update the hex value to the screen
    hexInput.value = hexCode.toUpperCase();
    //updates BackGround Color according to the input
    screen.style.backgroundColor = `#${hexCode}`;
    
  }else {hexInput.value = '';};

};

// HEX to RGB
function hexRgbConverter() {
  const testRegex = /[^0-9a-f]/gi; //regex
  const hexStr = hexInput.value.toLowerCase(); //Input String

  //criterias for conversion, otherwise the RGB value will be blank (indicating it's null)
  if ((hexStr.length === 3 || hexStr.length === 6) //length test
    &&
      //unwanted Characters test
      testRegex.test(hexStr) === false) {
    
    let hexArray = [];
    let thirdPart = (hexStr.length / 3) // divider

    //turns the input RGB string into an Array of three parts (works for 3 & 6 lengths)
    hexArray.push(hexStr.slice(0, thirdPart));
    hexArray.push(hexStr.slice(thirdPart, (thirdPart * 2)));
    hexArray.push(hexStr.slice(thirdPart * 2));

    //Function to check hexChar compatibility and turn values to Numbers
    const toNumber = val => {
      return isNaN(Number(val)) ?
        hexChar[val] :
          Number(val);
    }

    // converts hexArray into the final RGB code
    const rgbCode = hexArray.map(cur => cur.split(''))
      //array pattern should be [[],[],[]]
      .reduce((acc, subArr) => {
        //Convertion, calculation and Array formation
        switch (subArr.length) {
          case 1:
            acc.push(toNumber(subArr[0]));
            break;
          case 2:
            acc.push(
              ((toNumber(subArr[0]) * 16) + toNumber(subArr[1]))
            );
        };

        return acc;
      }, [])
        //concatenates the array into a single String
        .join(',')
    ;  

    console.log(rgbCode)
    //Update the RGB value to the screen
    rgbInput.value = rgbCode;
    //updates own value to uppercase
    hexInput.value = hexStr.toUpperCase();
    //updates BackGround Color according to the input
    screen.style.backgroundColor = `rgb(${rgbCode})`;

  }else {rgbInput.value = '';};

}

//Event Listeners
rgbInput.addEventListener('keyup', rgbHexConverter);
hexInput.addEventListener('keyup', hexRgbConverter);

//input placeholder clear on focus
inputNodes.forEach(input => {
  input.addEventListener('focus', () => input.setAttribute('placeholder', ''));
});

//Copy code to clip board
clipboardBtn[0].addEventListener('click', function() {
  rgbInput.select();
  document.execCommand('copy');
});
clipboardBtn[1].addEventListener('click', function() {
  hexInput.select();
  document.execCommand('copy');
});

/******************************/