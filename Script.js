let value = {2:2, 3:3, 4:4, 5:5, 6:6, 7:7, 8:8, 9:9, 10:10, 10:"J", 10:"Q", 10:"K", 11:"A"};
let suits = ["Spades", "Diamonds", "Hearts", "Clubs"];
let hit = document.getElementById("hit");
let your_box = document.getElementsByClassName("your-box");
let dealer_box = document.getElementsByClassName("dealer-box");
let startbtn = document.getElementById("start");
let clear = document.getElementById("clear");
let stand = document.getElementById("stand");
let player_counter = document.getElementById("playerCounter");
let dealer_counter = document.getElementById("dealerCounter");


player_counter.innerHTML = "0"
dealer_counter.innerHTML = "0"


let player_sum = 0;
let dealer_sum = 0;

let auto_play = function() { 
  if (player_sum >= 21) { 
    hit.disabled = true;
    stand.disabled = true;
    deal();
  }};

getRandomInt = (max) => Math.floor(Math.random() * (max));;
 
randomIntFromInterval = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

deal_player = () => {
    let random_value = randomIntFromInterval(2, 11); //sve izmedu 2 i 11 ukljucujuci i njih
    let random_suits = getRandomInt(4);
    let card = document.createElement("div");

      player_sum += random_value;
      player_counter.innerHTML = player_sum.toString();


    $(card).append('<img src="images/'+suits[random_suits]+'/'+value[random_value]+'.jpg"" class="added"></img>');    
    $(your_box).append(card);
  };

deal_dealer= () => {
    let random_value = randomIntFromInterval(2, 11); //sve izmedu 2 i 11 ukljucujuci i njih
    let random_suits = getRandomInt(4);
    let card = document.createElement("div");

    dealer_sum += random_value;
    dealer_counter.innerHTML = dealer_sum.toString();


    $(card).append('<img src="images/'+suits[random_suits]+'/'+value[random_value]+'.jpg"" class="added"></img>');    
    $(dealer_box).append(card);
  };


start = () => {
    for(let i = 0; i<2; i++){
      deal_player();
    };
};

start_dealer = () => {
  deal_dealer();
  let card = document.createElement("div");

  $(card).append('<img src="images/Red_back.jpg"" class="down"></img>');    
  $(dealer_box).append(card);

};

hit.addEventListener("click", () =>{
  audio.play();
  deal_player();
  auto_play();
});   

startbtn.addEventListener("click", () =>{
  player_sum = 0;
    player_counter.innerHTML = "0"
    dealer_sum = 0;
    dealer_counter.innerHTML = "0"
  audio.play();
  $('.added').remove();
  $('.down').remove();
    start();  
    start_dealer();
    hit.style.display = "block";
    stand.style.display = "block";
    hit.disabled = false;
    stand.disabled = false;
});

clear.addEventListener("click", () =>{
    $('.added').remove();
    $('.down').remove();
    hit.style.display = "none";
    stand.style.display = "none";
    player_sum = 0;
    player_counter.innerHTML = "0"
    dealer_sum = 0;
    dealer_counter.innerHTML = "0"
    stand.disabled = false;

});

stand.addEventListener("click", deal = () => {
  hit.disabled = true;

let interval = setInterval(function() { 
   if (dealer_sum <= player_sum) { 
    audio.play();
    let card = document.createElement("div");
    let random_value = randomIntFromInterval(2, 11); //sve izmedu 2 i 11 ukljucujuci i njih
    let random_suits = getRandomInt(4);

    dealer_sum += random_value;
    dealer_counter.innerHTML = dealer_sum.toString();
  
    $('.down').remove();
    $(card).append('<img src="images/'+suits[random_suits]+'/'+value[random_value]+'.jpg"" class="added"></img>');    
    $(dealer_box).append(card);
      
   }
   else { 
      clearInterval(interval);
   }
}, 500);

if(player_sum > 21){
  audio.play();
    let card = document.createElement("div");
    let random_value = randomIntFromInterval(2, 11); //sve izmedu 2 i 11 ukljucujuci i njih
    let random_suits = getRandomInt(4);

    dealer_sum += random_value;
    dealer_counter.innerHTML = dealer_sum.toString();
  
    $('.down').remove();
    $(card).append('<img src="images/'+suits[random_suits]+'/'+value[random_value]+'.jpg"" class="added"></img>');    
    $(dealer_box).append(card);
  clearInterval(interval);
};

  stand.disabled = true;
});