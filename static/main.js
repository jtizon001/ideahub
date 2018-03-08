$(document).ready(function () {


// _________________________ ajax call for conversion _______________________________________________________

//use ajax to fetch data from the python file "app.py"
  $( document.getElementById('button1') ).click(function(e) {
    e.preventDefault();
    // e.stopPropagation();


    var array = $('form').serializeArray();
    var jsonstring = {}
    jQuery.each(array, function() {
      jsonstring[this.name] = this.value || '';
    });
    console.log(jsonstring);
    var dataObject = JSON.stringify(jsonstring);
    console.log(dataObject);


//just for testing:
    //var hardCodedObject = '{"base":"btc","target":"usd","amount":"100"}'

    // if(dataObject[1].length() == 3 || dataObject[3].length() == 3){

      $.ajax({
        method: "POST",
        // url: "http://192.241.142.13:80/getData/",
        url: "http://localhost:5000/byUserName",
        contentType: "application/json",
        // dataType: "JSON",
        // data: {"base":"btc","target":"usd","amount":"100"},
        // data: {"d": dataObject},
        data: dataObject,
        error: function(response){
          console.log(response)
          console.log("error in ajax call");
          alert("Please enter valid inputs");
        },
        success: function(response){
          console.log("success: ");
          console.log(response);


          // var stringResponse = JSON.parse(response);
        // $( document.getElementsByClassName('result') ).append(response);

        stringResponse = JSON.stringify(response);
        stringSymbol = JSON.stringify(array[1]);
        stringSymbol2 = stringSymbol.substring(stringSymbol.length-5, stringSymbol.length-2).toUpperCase();

        document.getElementsByClassName('result')[0].innerHTML = "<BR>= " + stringResponse.substring(8, stringResponse.length-1) + " " + stringSymbol2;
        
        // document.getElementsByClassName('container')[0].appendChild(response);


          // $( document.getElementById('resultDiv') ).html(response);
        }

      }).done(function( ) {
        
        console.log("done");

      });

    // }

    // else{
    //   alert("please enter the 3-character symbol of your currency.");
    // }
 
  });
  
  $('#downloadCSV').on('submit', function(e) {
    e.preventDefault();

    var data = {
      file_name: $('#file_name').val()
    }

    $.ajax({
      url: '/getCSV',
      contentType: "application/json",
      data: data,
      method: 'POST',
      error: function(response) {
        console.log("error in ajax call");
      }
    }).then( function(response) {
      var json_obj = JSON.parse(response);
      $('#csv_test').empty();
      $('#csv_test').append($("<p>/outputfiles/" + json_obj + "</p>"));
      $('#csv_test').append($("<a href='./outputfiles/" + json_obj + "' download='" + json_obj + "'>Download</a>"));
    });
    
  });
  
});
