// Global DOM variables
let inputField = document.getElementById("user-input");
let checkField = document.getElementById("check-btn");
let clearField = document.getElementById("clear-btn");
let resultField = document.getElementById("results-div");
//Global Variables
function checkValidParentheses(str){
  //if statement to handle empty case:
  if(!str){
    return true;
  }
  let stack = [];
  for(let i = 0; i < str.length; i++){
    if(str[i] == '('){
      stack.push(str[i]);
    }
    else{
      if(stack.length == 0){
        return false;
      }
      stack.pop();
    }
  }
  return (stack.length == 0);
}
//Functions
function checkNumber(val){
  //Check for negative area code
  if(val.substring(0,2) == '-1'){
    resultField.innerText += "Invalid US number: " + val + "\n";
    return; 
  }
  //remove all non-alph chars
  let non_val = val.replace(/\W/g, '');
  let parentheses = val.match(/[()]/g); 
  let ans = ''
  //Parentheses checker
  if(!checkValidParentheses(parentheses)){
    resultField.innerText += "Invalid US number: " + val + "\n";
    return;
  }
  //Char checker
  if (val.indexOf('?') > -1){
    resultField.innerText += "Invalid US number: " + val + "\n";
    return;
  }
  let stack = [];
  //Check for weird formatting
  for(let i = 0; i < val.length;i++){
    if(!isNaN(parseFloat(val[i]))){
      stack.push(val[i]);
    }else{
      if(stack.length > 4){
        resultField.innerText += "Invalid US number: " + val + "\n";
        return;
      }
      else if(stack.length == 2){
        resultField.innerText += "Invalid US number: " + val + "\n";
        return;
      }
      else{
        stack = [];
      }
    }
  }

  //Check if valid number or not
  if(!Number.isInteger(Number(non_val))){
    ans = "Invalid US number: " + val;
  }
  else if(non_val.length == 11){
    if(non_val[0] == '1'){
  ans = "Valid US number: " + val;
    }else{
      resultField.innerText=''
  ans = "Invalid US number: " + val;
    }
  }
  else if(non_val.length == 10){
  ans = "Valid US number: " + val;

    }
  else{
  ans = "Invalid US number: " + val;
  }
  //Print results
    resultField.innerText += ans + "\n";
  
}
function handleClick(){
  let input = inputField.value;
  //If check statement
  if(input.length == 0){
    alert("Please provide a phone number");
    return;
  }
  checkNumber(input);
}
function handleClear(){
  resultField.innerText='';
}
checkField.onclick = handleClick;
clearField.onclick = handleClear;
