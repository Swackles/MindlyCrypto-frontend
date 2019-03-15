function Delete(id) {
    $.ajax
    ({
        type: "POST",
        url: '/portfolio/delete',
        dataType: 'text',
        data: {id: id},
        success: (result) => {
            alert("success");
            
            let table = document.getElementById("portfolioTable");
            for (let i = 0, row; row = table.rows[i]; i++) {
                for(let x = 0, col; col = row.cells[x]; x++) {
                    if (x == 0 && col.innerHTML == id) {
                        table.deleteRow(i);
                    }
                }
            }
        },
        error: (xhr, textStatus, errorThrown) => {
            alert("failed");
        }
    })
}

function Add() {
    if(isNaN(document.getElementById("addCurrencyID").value)) return alert("Invalid currency")
    if(isNaN(document.getElementById("addAmount").value)) return alert("Amount is not a number")
    if(document.getElementById("addDescription").value == "" || document.getElementById("addDescription").value == null) return alert("Description is empty")

    let data = {
        currencyID: parseInt(document.getElementById("addCurrencyID").value),
        amount: parseInt(document.getElementById("addAmount").value),
        description: document.getElementById("addDescription").value,
    };

    $.ajax
    ({
        type: "POST",
        url: '/portfolio/add',
        dataType: 'text',
        data: data,
        success: (result) => {
            alert("success");
            console.log(result);
            const data = JSON.parse(result);
            let table = document.getElementById("portfolioTable");

            data.forEach(item => {               
            let row = table.insertRow(table.rows.length);
            
            let button = document.createElement("buton");
            button.type = "button";
            button.innerHTML = "Delete";
            button.onclick = (() => { Delete(item.id) })

            row.insertCell(0).appendChild(button);

            row.insertCell(0).innerHTML = item.marketValue;
            row.insertCell(0).innerHTML = item.description;
            row.insertCell(0).innerHTML = item.purchased;
            row.insertCell(0).innerHTML = item.amount;
            row.insertCell(0).innerHTML = item.name;

            let idCell = row.insertCell(0);
            idCell.innerHTML = item.id;
            idCell.style = "display: none;" 
            });            
        },
        error: (xhr, textStatus, errorThrown) => {
            alert("failed");
        }
    })
}