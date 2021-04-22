async function getData(){
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };
    let result = await fetch("http://ip172-18-0-28-c1vdcc7njsv000afvg1g-3000.direct.labs.play-with-docker.com/baojia2", requestOptions);
    let data = result.json();
    return data;
}
  
let TransactionDataAll = null;

async function main(){
    TransactionDataAll = await getData();
    console.log(TransactionDataAll);
    init(); 
    form.addEventListener('submit', filterTransaction); // whenever 'submit' is heard, filterTransaction is called
}
  
main();
  
const money_minus = document.getElementById('tx_amount');
const list = document.getElementById('list');
const form = document.getElementById('form');
const childname = document.getElementById('childname');
const reco = document.getElementById('reco');

var TransactionData = null;
  
// Add transactions to DOM list (DOM means document object model)
function addTransactionDOM(transaction) {
    const deposit_item = document.createElement('li');
  
    deposit_item.classList.add('plus');  //look at style.css .list li.plus { }
    deposit_item.innerHTML = `
    ${transaction.child_name}-${transaction.merchant_name}  <span> $ ${Math.abs(
      transaction.deposit
    )}</span>  
    `;
  
    // list.appendChild(deposit_item);
  
    const tx_amount_item = document.createElement('li');
  
    tx_amount_item.classList.add('minus');
    tx_amount_item.innerHTML = `
    ${transaction.child_name}-${transaction.merchant_name} <span> $ ${Math.abs(
      transaction.tx_amount  
    )}</span> 
    `;
  
    list.appendChild(tx_amount_item);
}
  
  // Update the balance, deposit and tx_amount
function updateValues() {  // shorthand for TransactionData.map(function(transaction) {return(transaction.deposit);})
    // const deposits = TransactionData.map(transaction => transaction.deposit); //map used in place of forEach or for loop
    const tx_amounts = TransactionData.map(transaction => transaction.tx_amount);
    // const total_deposit = deposits.reduce((acc, item) => (acc += item), 0).toFixed(2); //reduce is to sum up array. 0 refers to start value of acc. toFixed is decimal points
    const total_tx_amount = tx_amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);
    // const bal = (total_deposit - total_tx_amount).toFixed(2);
    // balance.innerText = `$${bal}`;
    // money_plus.innerText = `$${total_deposit}`;
    money_minus.innerText = `$${total_tx_amount}`;
    // reco.innerText = (bal >= 0)? "You Have Sound Financial Health": "Your Financial Health is Weak";
      // same as if bal>0, display the text "You Have Sound..." ternery operator
    getCustomerList();
}
  
function init() {
    list.innerHTML = '';
    reco.innerHTML = '';
    TransactionData = [...TransactionDataAll];  //... is to copy array
    TransactionData.forEach(addTransactionDOM); //why no need pass in value to addTransactionDOM? becos function defined separately
    updateValues();
}
  
function filterTransaction(e) {
    e.preventDefault();  //to prevent form from submitting and refreshing the page, becos no backend yet
  
    if (childname.value == "All Children") {
        init();
        document.getElementById("customerheader").innerText = "All Customer's Balance";
    } 
    else {
        list.innerHTML = '';
        reco.innerHTML = '';
        TransactionData = TransactionDataAll.filter(tran => tran.child_name.toUpperCase() == childname.value.toUpperCase());  
        TransactionData.forEach(addTransactionDOM);
        document.getElementById("customerheader").innerText = childname.value + "'s Expenditure";
        updateValues();
    }
}
  
function getCustomerList() {
      //let names = Array.from(Set(TransactionDataAll.map(item => item.child_name)));
      document.getElementById("childname").length = 1; //clears the dropdown options, except for default option
      names = Array.from(new Set(TransactionDataAll.map(item => item.child_name)));
      names.unshift("All Children"); //add option of all customers to start of array
      for (i=0; i<names.length; i++){
          var node = document.createElement("option");
          node.innerHTML = names[i];
          document.getElementById("childname").appendChild(node);
      }
}