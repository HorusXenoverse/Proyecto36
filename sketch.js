var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood;
var foodObj;

var feed, lastFed;
var hora;

function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  addFood=createButton("Agregar Alimento");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

  feed=createButton("Alimenta a el perro");
  feed.position(600,95);
  feed.mousePressed(feedDog);
}

function draw() {
  background(46,139,87);
  foodObj.display();

  if (lastFed >= 12) {
  } else if (lastFed == 0) {
    text("Última hora en que se alimentó : " + hora, 350, 30);
  } else {
  }
  
 
  drawSprites();
}

function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


function feedDog(){
  dog.addImage(happyDog);

  var food_stock_val = foodObj.getFoodStock();
  if(food_stock_val <= 0){
    foodObj.updateFoodStock(food_stock_val *0);
  }else{
    foodObj.updateFoodStock(food_stock_val -1);
  }

  hora=hour();

}

function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}