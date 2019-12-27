$(document).ready(function () {

var loader = $('#loader');
  var count_id = 0;

  //checkox array
  let arr = [];
  let arrName = [];
  let arrNameCoin = [];
  let searchInput = $('#searchCoin')
 
  //Search button
  $('#click_me2').on('click', function (event) {

    event.preventDefault();

    resetWrapper(); //reset page


    if(searchInput.val() === ''){
      alert('Please put COIN name!!!');
      getData();
    }else{
    $.ajax({
      
      url: `https://api.coingecko.com/api/v3/coins/${$('#searchCoin').val()}`,
      type: 'GET',
      beforeSend: function(){
        loader.css({'visibility': 'visible'})

      },
     
      success: function (searchInfo, res) {

        var showId = {
          id: count_id++,
        }

        let divWrap = $(`<div class="col-md-4 p-0">`);
        let divCard = $(`<div class="card">`);
        let divCardBody = $(`<div class="card-body">`);
        let cardTitle = $(`<h5 class="card-title">`);
        cardTitle.text(`${searchInfo.id}`);
        let cardText = $(`<p class="card-text">`);
        cardText.text(`${searchInfo.symbol}`);
        let labelSwitch = $(`<label class="switch">`);
        let inputCheckbox = $(` <input type="checkbox" id="slider">`);
        let slider = $(`<span class="slider round" name="button${showId.id}" id="slider">`);
        let pButton = $(`<p id='moreInf'>`);
        let pButtonInner = $(`<button class="btn btn-outline-primary"  id='moreInfo' data-toggle="collapse" href="#multiCollapseExample${showId.id}" aria-expanded="false" aria-controls="multiCollapseExample1">`);
        pButtonInner.text('More info');
        // get checkbox
        inputCheckbox.on('click', function () {
          
          if (inputCheckbox.is(":checked")) {
            arr.push(searchInfo.market_data.current_price.usd);
            arrName.push(searchInfo.symbol)
            arrNameCoin.push(searchInfo.name);
          }
            arr.length > 5 ? popUp() : false
        })
        let moreInfWrapp = $(`<div class="row" id="more_info">`);
        let divColum = $(`<div class="col">`);
        let divCollapse = $(` <div class="collapse multi-collapse" id="multiCollapseExample${showId.id}">`);
        let cardBody = $(`<div class="card card-body" id='multiCollapseExample${showId.id}'>`);
        cardBody.html(`
     <img src="${searchInfo.image.large}" class="card-img-top" alt="...">
     <div class="card-body">
       <h5 class="card-title">${searchInfo.name}</h5>
       <p class="card-text">USD: ${searchInfo.market_data.current_price.usd} $</p>
       <p class="card-text">EUR: ${searchInfo.market_data.current_price.eur} &#8364</p>
       <p class="card-text">ILS: ${searchInfo.market_data.current_price.ils} &#8362</p>
     </div>`);

        //compire elem
        $('#place').append(divWrap);
        divWrap.append(divCard);
        divCard.append(divCardBody);
        divCardBody.append(cardTitle);
        divCardBody.append(cardText);
        divCardBody.append(labelSwitch);
        labelSwitch.append(inputCheckbox);
        labelSwitch.append(slider);
        divCardBody.append(pButton);
        pButton.append(pButtonInner);
        divCardBody.append(moreInfWrapp);
        moreInfWrapp.append(divColum);
        divColum.append(divCollapse);
        divCollapse.append(cardBody);
      }, error:function(){
        alert(`Sorry :-(, Coin isn't find`);
        getData()
    }
    }).done(function(){
      loader.css({'visibility': 'hidden'})
    });
  }

  searchInput.val('')
  
  });

  //live reports button
  $('#liveReports').on('click', function () {
    resetWrapper(); //reset page

    loadTable2(); //table

  });

  //about button
  $('#about').on('click', function () {
    resetWrapper(); //reset page

    let about = $(`<div class="card text-center">
    <div class="card-header">
    
    </div>
    <div class="card-body">
      <h2 class="card-title">Full Stack Web Developer
      jQuery-AJAX API Project</h2>
      <p class="card-text">The project is importing coins from web-api, 
      there is a button of more info under each coin and when you press it you will be provided with information about the specific coin. 
      you have to option to choose up to 5 coins after that you can view their rate changes of every 2 seconds in a real time chart.</p>
      <p class="card-text text-left">In this Project I used:
      <p class="card-text text-left"><ul class="card-text text-left">
      <h5>HTML + CSS: </h5>
      <li>New HTML5 tags</li>
      <li>CSS3 media queries and advanced selectors</li>
      <li>Dynamic page layouts</li>
      <li>Bootstrap & flex</li>
      <h5>JavaScript:</h5>
      <li>- Objects</li>
      <li>- Callbacks, Promises, Async Await</li>
      <li>- jQuery</li>
      <li>- Single Page Application foundations</li>
      <li>- Events</li>
      <li>- Ajax (RESTful API)</li>
      <li>- Documentation</li>
     <h5>External API’s</h5>
      <h5>XAMPP Client Hosting – dropping the structure in htdocs folder</h5>
      </ul></p>
      </p>
      <a href="https://www.linkedin.com/in/danil-stepanov-322364199/" target="_blank" class="btn btn-primary">Danil Stepanov</a>
    </div>
    <div class="card-footer text-muted">
    
    </div>
  </div>`)

    $('#place').append(about);
  });

  //home button
  $('#home').on('click', function () {
  
    resetWrapper();

    getData();

  });

  //start page
  function getData() {
    $.ajax({
      url: 'https://api.coingecko.com/api/v3/coins/list',
      type: 'GET',
      beforeSend: function(){
        loader.css({'visibility': 'visible'})
      },
      success: giveAllCoins,
    }).done(function(){
      loader.css({'visibility': 'hidden'})
    });
  };
  getData();

  //All coins get
  function giveAllCoins(allCoinsList) {

    let sliceList = allCoinsList.slice(0, 102);

    $.each(sliceList, i => { 

      var showId = {
        id: count_id++,
      }

      //creating card
      let divWrap = $(`<div class="col-md-4 p-0" id="card">`);
      let divCard = $(`<div class="card">`);
      let divCardBody = $(`<div class="card-body">`);
      let cardTitle = $(`<h6 class="card-title">`);
      cardTitle.text(`${sliceList[i].id}`);
      let cardText = $(`<p class="card-text">`);
      cardText.text(`${sliceList[i].symbol}`);
      let labelSwitch = $(`<label class="switch">`);
      let inputCheckbox = $(` <input  type="checkbox" id="slider">`);
      let slider = $(`<span class="slider round" name="button${showId.id}" id="slider" >`);

      // get checkbox
      inputCheckbox.on('click', function () {
        
        if (inputCheckbox.is(":checked")) {
          
          $.ajax({
            url: `https://api.coingecko.com/api/v3/coins/${sliceList[i].id}`,
            type: 'GET',
            success: function (openInfo) {
              //send coin data to arrays
              arr.push(openInfo.market_data.current_price.usd);
              arrName.push(openInfo.symbol);
              arrNameCoin.push(openInfo.name);

              localStorage.setItem(`toggleButton`, JSON.stringify(arrName));

              arr.length > 5 ? popUp() : false

            }
          });
        } 

        //END
      })

      let pButton = $(`<p id='moreInf'>`);
      let pButtonInner = $(`<button class="btn btn-outline-primary"   id='moreInfo' data-toggle="collapse" href="#multiCollapseExample${showId.id}" aria-expanded="false" aria-controls="multiCollapseExample1">`);
      pButtonInner.text('More info');
      let moreInfWrapp = $(`<div class="row" id="more_info">`);
      let divColum = $(`<div class="col">`);
      let divCollapse = $(` <div class="collapse multi-collapse" id="multiCollapseExample${showId.id}">`);
      let cardBody = $(`<div class="card card-body" class="collapik" id='multiCollapseExample${showId.id}'>`);
      //compire elem
      $('#place').append(divWrap);
      // $( "#place" ).append(moreCoin);
      divWrap.append(divCard);
      divCard.append(divCardBody);
      divCardBody.append(cardTitle);
      divCardBody.append(cardText);
      divCardBody.append(labelSwitch);
      labelSwitch.append(inputCheckbox);
      labelSwitch.append(slider);
      divCardBody.append(pButton);
      pButton.append(pButtonInner);
      divCardBody.append(moreInfWrapp);
      moreInfWrapp.append(divColum);
      divColum.append(divCollapse);
      divCollapse.append(cardBody);

      //moreInfo button
      pButtonInner.on('click', function () {
     
        if (pButtonInner.attr('aria-expanded') === "false") {
         
          if (!localStorage.getItem(`${sliceList[i].id}`)) {
          
            $.ajax({
              url: `https://api.coingecko.com/api/v3/coins/${sliceList[i].id}`,
              type: 'GET',
              beforeSend: function(){
                  loader.css({'visibility': 'visible'})
              },
              success: function (openInfo) {
                // console.log(timeNow)
                let timeNow = Math.floor(Date.now() / 1000);

                let moreInfObj = {
                  time: timeNow,
                  name: openInfo.name,
                  img: openInfo.image.large,
                  usd: openInfo.market_data.current_price.usd,
                  eur: openInfo.market_data.current_price.eur,
                  ils: openInfo.market_data.current_price.ils
                }
                //set items to localStor
                localStorage.setItem(`${sliceList[i].id}`, JSON.stringify(moreInfObj));

                //create div from ajax request
                cardBody.html('')
                cardBody.append(`
      <img src="${openInfo.image.large}" class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title">${openInfo.name}</h5>
        <p class="card-text">USD: ${openInfo.market_data.current_price.usd} $</p>
        <p class="card-text">EUR: ${openInfo.market_data.current_price.eur} &#8364</p>
        <p class="card-text">ILS: ${openInfo.market_data.current_price.ils} &#8362</p>
      </div>`)
              },
            
            }).done(function(){
              loader.css({'visibility': 'hidden'})
            });
           
          } else {
            let timeNow = Math.floor(Date.now() / 1000);
            var locStorObj = JSON.parse(localStorage.getItem(`${sliceList[i].id}`));
            //remove from LS after 2 min
          ((timeNow - locStorObj.time) > 120) ? localStorage.removeItem(`${sliceList[i].id}`) : false
          //INFO FROM LOCAL
            cardBody.html('')
            cardBody.append(`
        <img src="${locStorObj.img}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">${locStorObj.name}</h5>
          <p class="card-text">USD: ${locStorObj.usd} $</p>
          <p class="card-text">EUR: ${locStorObj.eur} &#8364</p>
          <p class="card-text">ILS: ${locStorObj.ils} &#8362</p>
        </div>`)
          }
        }
      })
    }) 
  };

  //popUP Function
  function popUp() {
    //remove the first popup
    $('#popup').html('');
    //show alert
    alert('too much, please remove one');
    //create popup
    let popup = $(`<div class="modal-dialog" role="document">`);
    let modal_content = $(`<div class="modal-content">`);
    let modal_header = $(`<div class="modal-header">`);
    let modal_title = $(`<h5 class="modal-title">`);
    modal_title.text('Please remove one');
    let modal_body = $(`<div class="modal-body">`);
    let modal_footer = $(`<div class="modal-footer">`);
    
        for (let i = 0; i < arr.length; i++) {
          let input = $(`<button type="button" class="btn btn-outline-primary btn-lg btn-block">${arrName[i]}</button>`);
          input.on('click', function () {
            arrName.splice(i, 1)
            arrNameCoin.splice(i, 1)
            arr.splice(i, 1);
            input.css({'visibility': 'hidden', 'display': 'none'})
          }) 
          modal_body.append(input);
        };
        let btnClose = $(`<button type="button" class="btn btn-success">Save</button>`);
        btnClose.on('click', function () {
          $('#popup').removeClass("showPop");
          $('#popup').addClass("popup");
        });
        //append
        popup.append(modal_content);
        modal_content.append(modal_header);
        modal_header.append(modal_title);
        modal_content.append(modal_body);
        modal_content.append(modal_footer);
        modal_footer.append(btnClose);
        $('#popup').append(popup);
        $('#popup').removeClass();
        $('#popup').addClass("showPop");
//CSS
    $('#popup').removeClass();
    $('#popup').addClass("showPop");
  };

  ///reload page function
  function resetWrapper() {
    $("#place").html("");
  };

  //table
  function loadTable2() {
    var div = $('<div id="chartContainer" style="height: 300px; width: 100%;"></div>');
    $("#place").append(div);

    var dataPoints1 = [];
    var dataPoints2 = [];
    var dataPoints3 = [];
    var dataPoints4 = [];
    var dataPoints5 = [];

    var chart = new CanvasJS.Chart("chartContainer", {
      zoomEnabled: true,
      title: {
        text: `${arrNameCoin} to USD`
      },
      axisX: {
        title: "chart updates every 3 secs"
      },
      axisY: {
        prefix: "$", includeZero: false},
      toolTip: {
        shared: true
      },
      legend: {
        cursor: "pointer", verticalAlign: "top",fontSize: 20, fontColor: "dimGrey", itemclick: toggleDataSeries},
      data: [{
          type: "line",
          xValueType: "dateTime",
          yValueFormatString: "$#0.00000000",
          xValueFormatString: "hh:mm:ss TT",
          showInLegend: true,
          name: arrName[0] || '',
          dataPoints: dataPoints1
        },
        {
          type: "line",
          xValueType: "dateTime",
          yValueFormatString: "$#0.00000000",
          showInLegend: true,
          name: arrName[1] || '',
          dataPoints: dataPoints2
        },
        {
          type: "line",
          xValueType: "dateTime",
          yValueFormatString: "$#0.00000000",
          showInLegend: true,
          name: arrName[2] || '',
          dataPoints: dataPoints3
        },
        {
          type: "line",
          xValueType: "dateTime",
          yValueFormatString: "$#0.00000000",
          showInLegend: true,
          name: arrName[3] || '',
          dataPoints: dataPoints4
        },
        {
          type: "line",
          xValueType: "dateTime",
          yValueFormatString: "$#0.00000000",
          showInLegend: true,
          name: arrName[4] || '',
          dataPoints: dataPoints5
        }
      ]
    });

    function toggleDataSeries(e) {
      if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
        e.dataSeries.visible = false;
      } else {
        e.dataSeries.visible = false;
      }
      chart.render();
    }

    var updateInterval = 3000;
    // initial value

    var time = new Date();
    // starting at 9.30 am
    time.getHours();
    time.getMinutes();
    time.getSeconds();
    time.getMilliseconds();



    function updateChart(count) {
      count = count || 1;

      for (var i = 0; i < count; i++) {
        time.setTime(time.getTime() + updateInterval);

       

        var yValue1 = arr[0];
        var yValue2 = arr[1];
        var yValue3 = arr[2];
        var yValue4 = arr[3];
        var yValue5 = arr[4];

        var yValueName1 = arrName[0] || '';
        var yValueName2 = arrName[1] || '';
        var yValueName3 = arrName[2] || '';
        var yValueName4 = arrName[3] || '';
        var yValueName5 = arrName[4] || '';


        $.ajax({
      
          url: `https://min-api.cryptocompare.com/data/pricemulti?fsyms=${arrName}&tsyms=USD`,
     
          type: 'GET',
          success: function (searchInfo) {

            console.log(searchInfo.Response)

                      // console.log(key)
                      dataPoints1.push({
                        x: time.getTime(),
                        y: (!searchInfo.Response === 'Error') ?  Object.values(searchInfo)[0].USD : yValue1 
                      });
  
                      dataPoints2.push({
                        x: time.getTime(),
                        y: (!searchInfo.Response === 'Error') ?  Object.values(searchInfo)[1].USD : yValue2 
                      });

                    dataPoints3.push({
                      x: time.getTime(),
                      y: (!searchInfo.Response === 'Error') ?  Object.values(searchInfo)[2].USD : yValue3
                    });
                    dataPoints4.push({
                      x: time.getTime(),
                      y: (!searchInfo.Response === 'Error') ?  Object.values(searchInfo)[3].USD : yValue4 
                    });
                    dataPoints5.push({
                      x: time.getTime(),
                      y: (!searchInfo.Response === 'Error') ? Object.values(searchInfo)[4].USD : yValue5
                    });

                      
                    }
                  
                })
      }

      chart.options.data[0].legendText = yValueName1;
      chart.options.data[1].legendText = yValueName2;
      chart.options.data[2].legendText = yValueName3;
      chart.options.data[3].legendText = yValueName4;
      chart.options.data[4].legendText = yValueName5;
      chart.render();
    }
    // generates first set of dataPoints 
    updateChart(100);
    setInterval(function () {
      updateChart()
    }, updateInterval);
  }

});


//sticky navbar
window.onscroll = function () {
  myFunction()
};
var navbar = document.getElementById("wr");
var sticky = navbar.offsetTop;

function myFunction() {
  if (window.pageYOffset >= sticky) {
    navbar.classList.add("sticky")
  } else {
    navbar.classList.remove("sticky");
  }
}
