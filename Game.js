class Game{
    constructor(){

    }
    getState(){
        var gameStateRef = database.ref('gameState');
        gameStateRef.on("value",function(data){
            gameState = data.val();
        });

    }
    update(state){
        database.ref('/').update({
            gameState:state

        });

    }
    async start(){
        if(gameState === 0){
            player = new Player();
            var playerCountRef = await database.ref('playerCount').once("value");
            if(playerCountRef.exists()){
                playerCount = playerCountRef.val();
                player.getCount();

            }

            form = new Form();
            form.display();
        }
        Car1 = createSprite(100,200);
        Car2 = createSprite(300,200);
        Car3 = createSprite(500,200);
        Car4 = createSprite(700,200);

        cars = [Car1,Car2,Car3,Car4];

    }
    play(){
        form.hide_details();
        
        //textSize(30);
        //text("Game Start",120,100);

        Player.getPlayerInfo();
        if(allPlayers !== undefined){
            //var display_position = 130;

            //index of the array
            var index =  0;
            //x and y positions of the car
            var x = 0;
            var y ;

            for(var plr in allPlayers){
                /*if(plr === "player" + player.index){
                    fill("red");
                }else{
                    fill("black");
                }

                display_position+=20;

                textSize(15);
                text(allPlayers[plr].name+":"+allPlayers[plr].distance,120,display_position); */

                //add 1 to the index for every loop
                index++ ;
                //positioning the cars a little away from each other in  direction
                x+=200 ;
                //use data from the database to diaplay the cars in y direction
                y = displayHeight - allPlayers[plr].distance ;
                cars[index-1].x = x ;
                cars[index-1].y = y ;
                
                if(index === player.index){
                    //making the colour of active player red
                    cars[index-1].shapeColor="red";
                    //giving camera positions 
                    camera.position.x = displayWidth/2 ; 
                    camera.position.y = cars[index-1].y ; 

                }
 
            }
        }
        if(keyIsDown(UP_ARROW) && player.index !== null){
            player.distance+=50;
            player.update();
        }
        drawSprites();

    }

}