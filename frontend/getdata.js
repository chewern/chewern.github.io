async function getData(){
  const fetch = require("node-fetch");
  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };
  let result = await fetch("http://localhost:2021/baojia2", requestOptions);
  let data = result.json();
  return data;
}

async function main(){
  let sqldata = await getData();
  console.log(typeof sqldata);
  console.log(sqldata);
}

main();

//module.exports = {getData};

/* function getFromServer() {
  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  //get the code snippet from postman javascript - Fetch
  fetch("http://localhost:3000/baojia", requestOptions)
    .then(response => response.json())
    .then(result => {
      //console.log(result);
      var text = "<ol>";
      result.forEach(function (item) {
        text += `<li>
        merchant_id: ${item.merchant_id} <br>
        merchant_name: ${item.merchant_name}
        </li>`;
      });
      text += "</ol>";
      $(".mypanel").html(text);
    })
    .catch((error) => console.log("error", error));
}

function getByID() {
  var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };
  
  fetch("localhost:3000/merchants/by_id?id=m-abc123", requestOptions)
    .then(response => response.text())
    .then(result => {
      //console.log(result);
      var text = "<ol>";
      result.forEach(function (item) {
        text += `<li>
        merchant_id: ${item.merchant_id} <br>
        merchant_name: ${item.merchant_name}
        </li>`;
      });
      text += "</ol>";
      $(".mypanel").html(text);
    })
    .catch(error => console.log('error', error));
}

function postData() {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  // Populate this data from e.g. form.
  var raw = JSON.stringify({
    id: 9,
    name: "Mittal",
    email: "hi@hi.com",
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  fetch("http://localhost:3000/merchants/addnew", requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.log("error", error));
}
 */
/* function getFromServer() {
    $.getJSON(
      // "https://9851c3b1-a2c1-44cf-bd7a-4bb482dd0be0.mock.pstmn.io/users",
      "http://localhost:3000/sellers",
      function (data) {
        var text = "<ol>";
        data.forEach(function (item) {
          text += `<li>
          id: ${item.id} <br>
          name: ${item.name} <br>
          wallet: ${item.wallet}
          </li>`;
        });
        text += "</ol>";
        $(".mypanel").html(text);
      }
    );
  }
   */
