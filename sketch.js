  var dog,sadDog,happyDog, database;
  var foodS,FoodStock;
  var addFood;
  var foodObj;
  var feed,lastFed;
  var fedTime;

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

  feed = createButton("Feed The Dog")
  feed.position(695,95)
  feed.mousePressed(feedDog)

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);
  }

  function draw() {
  background(46,139,87);
  foodObj.display();

  fedTime=database.ref("FedTime");
  fedTime.on("value",function(data){
  lastFed=data.val();
  })

  fill("yellow");
  textSize(18);
  if(lastFed>=12){
  text("Last Feed:PM:"+lastFed,300,30)
  }else if(lastFed==0){
  text("Last Feed:12 AM",300,30);
  }else{
  text("Last Feed:AM"+lastFed,300,30)
  }

  drawSprites();
  }

  function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
  }

  function feedDog(){
  dog.addImage(happyDog);
  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
  Food:foodObj.getFoodStock(),
  FedTime:hour()
  })
  }

  function addFoods(){
  foodS++;
  database.ref('/').update({
  Food:foodS
  })
  }
