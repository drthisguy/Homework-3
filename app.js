/*                  Functions                   */

function randomizor(arr) {
  //pick random array
  randomArray = arr[Math.floor(Math.random() * arr.length)];

  //return random character from random array
  return randomArray[Math.floor(Math.random() * randomArray.length)];
}

//return length range values.
function getLength() {
  var min = parseInt(document.querySelector(".min").value);
  var max = parseInt(document.querySelector(".max").value);

  if (isNaN(min) && isNaN(max)) {
    //validate.
    alert('Your password length criteria is not valid.');
  } else if (isNaN(min) && Number.isInteger(max)) {
    return max;
  } else if (isNaN(max) && Number.isInteger(min)) {
    return min;
  } else {
    return setRandomLength(min, max);
  }
}

//returns random length between min & max values.
function setRandomLength(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

//sort out unchecked criteria.
function checkBox(arr) {
  var criteria = [];
  for (var i = 0; i < arr.length; i++)
    if (arr[i] !== false) {
      criteria.push(arr[i]);
    }

  return criteria;
}

function copier() {
  var clip = document.querySelector("#clipboard").textContent;
  var txtEl = document.createElement("textarea");
  txtEl.value = clip;
  document.body.appendChild(txtEl);
  txtEl.select();
  document.execCommand("copy");
  document.body.removeChild(txtEl);
  alert("Password coppied to clipboard");
}

// toLowerCase for an array.
function lowerCase(alphabet) {
  return alphabet.toLowerCase();
}

// Criteria arrays
var upper = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
var lower = upper.map(lowerCase);
var numeric = ['0','1', '2','3','4','5','6','7','8','9'];
var special = [' ','!', '"','#', '$', '%', '&', "'", '(', ')', '*', '+', ',', '-', '.', '/', ':', ';', '<', '=', '>', '?', '@', '[','\\', ']', '^', '_', '`', '}', '|', '}', '~'];

// enable/disable text fields for PW range. 
document.querySelector('.length').onchange = function() {
    document.querySelector('.min').disabled = !this.checked;
    document.querySelector('.max').disabled = !this.checked;
};


    

document.querySelector(".generate").addEventListener("click", function() {
  /*Get and set all input parameters from the dom*/

  var needsLength = document.querySelector(".length").checked;
  length = needsLength ? getLength() : setRandomLength(8, 128); //default range for length.

  var needsUpper = document.querySelector(".alpha-upp").checked;
  upper = needsUpper ? upper : false;

  var needsLower = document.querySelector(".alpha-low").checked;
  lower = needsLower ? lower : false;

  var needsNumber = document.querySelector(".numeric").checked;
  numeric = needsNumber ? numeric : false;

  var needsSpecial = document.querySelector(".special").checked;
  special = needsSpecial ? special : false;

  var charz = [upper, lower, numeric, special];
  charz = checkBox(charz);

  console.log(charz);
  var output = "";
  for (var i = 0; i <= length; i++) {
    output += randomizor(charz);
  }

  if (output !== "") {

  document.getElementById(
    "output"
  ).innerHTML = `<p class = "text-break" id="clipboard">${output}</p>  
    <div class="row"><div class="col"><button type="button" class="btn btn-success mt-4 copy">Copy to Clipboard</button></div></div>`;
  
  //Copy password to clipboard.
  document.querySelector(".copy").addEventListener("click", copier);
  }
     else {
      document.getElementById('output').innerHTML = '';
    }
  });


