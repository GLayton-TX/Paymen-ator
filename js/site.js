// 
function getValues(){
    let loanAmount = Number(document.getElementById("principalAmount").value);
    let loanTerm = document.getElementById("loanTerm").value;
    let loanInterest = document.getElementById("interestRate").value;
    displayResults(computeResults(loanAmount, loanTerm, loanInterest));
}

// 
function computeResults(loanAmount, loanTerm, loanInterest){
    let loanRate = loanInterest/1200;
    let monthlyPayment = (loanAmount * ((loanRate*(1+loanRate)**loanTerm)/(((1+loanRate)**loanTerm)-1)));
    let remainingBalance = loanAmount;
    let totalInterest = 0;
    let loanData = [];
    for (let i = 0; i < loanTerm; i++) {
        let interestPayment = remainingBalance*loanRate;
        totalInterest += interestPayment;
        let principalPayment = monthlyPayment-interestPayment;
        remainingBalance = remainingBalance - principalPayment;
        const monthlyData = {
            month:i+1,
             payment:formatMoney(monthlyPayment),
              principal:formatMoney(principalPayment),
               interest:formatMoney(interestPayment),
                totalInterest:formatMoney(totalInterest),
                balance:formatMoney(remainingBalance)
            };
        loanData.push(monthlyData);
    }
    document.getElementById("monthlyPayment").innerHTML = formatMoney(monthlyPayment);
    document.getElementById("amountFinanced").innerHTML = formatMoney(loanAmount);
    document.getElementById("totalInterest").innerHTML = formatMoney(totalInterest);
    document.getElementById("totalPaid").innerHTML = formatMoney((loanAmount + totalInterest));
    return loanData;
}

// 
function formatMoney(moneyValue){
    let formattedMoney = (Intl.NumberFormat('en-US', {style: "currency", currency: "USD"}).format(moneyValue));
    return formattedMoney;
}

// 
function displayResults(loanData){
    let tableBody = document.getElementById("results");
    let templateRow = document.getElementById("loanTemplate");
    tableBody.innerHTML = "";
    loanData.forEach(element => {
        let tableRow = document.importNode(templateRow.content, true);
        let rowCols = tableRow.querySelectorAll("td");
        rowCols[0].textContent = element.month;
        rowCols[1].textContent = element.payment;
        rowCols[2].textContent = element.principal;
        rowCols[3].textContent = element.interest;
        rowCols[4].textContent = element.totalInterest;
        rowCols[5].textContent = element.balance;
        tableBody.appendChild(tableRow);
    });
    displayHidden();
}

// 
function displayHidden(){
    document.getElementById("monthlyCard").classList.remove("invisible");
    document.getElementById("amortTable").classList.remove("invisible");
    
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}

// clear form
function clearForm(){
    location.reload();
}