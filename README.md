# rgbHexConverter
## RGB / HEX converter

    function rgbHexConverter() {
      //grabs the value fromthe form
      const trimRegex = /[^0-9,]/gi;
      let rgbStr = rgbInput.value.replace(trimRegex, '');
      let rgbArr = rgbStr.split(',');

      if (rgbArr.length === 3 && rgbArr[2].length > 0) {
        rgbInput.value = rgbStr; //Removes 'RGB()' from display in the form

      }

    }
