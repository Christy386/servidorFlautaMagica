var WebSocketServer = require('websocket').server;
var http = require('http');

//Porta que o server irá escutar
const port = 8080;

//Cria o server
var server = http.createServer();

//Server irá escutar na porta definida em 'port'
server.listen(port, () => {
    //Server está pronto
    console.log('listening on port: '+port);
});

//Cria o WebSocket server
wsServer = new WebSocketServer({
  httpServer: server
});

var state = {
    b1: 'off',
    b2: 'off',
    b3: 'off',
    b4: 'off',
    b5: 'off',
    b6: 'off',
    b7: 'off',
}

let lastString2send = '';

//Chamado quando um client deseja conectar
wsServer.on('request', (request) => {
    //Aceita a conexão do client
    let client = request.accept(null, request.origin);

    //Chamado quando o client envia uma mensagem
    client.on('message', (message) => {
        //Se é uma mensagem string utf8
        if (message.type === 'utf8') {
            //Mostra no console a mensagem
            
            console.log(message.utf8Data);
            

            let msgSplited = message.utf8Data.split(',');
            console.log(msgSplited);
            if(msgSplited.length>=3) {
                let tempB1 = msgSplited[0].split(':');
                state.b1 = tempB1[1];
                console.log(tempB1);
                
                let tempB2 = msgSplited[1].split(':');
                state.b2 = tempB2[1];
                console.log(tempB2);
                
                let tempB3 = msgSplited[2].split(':');
                state.b3 = tempB3[1];
                console.log(tempB3);

                let tempB4 = msgSplited[3].split(':');
                state.b4 = tempB4[1];
                console.log(tempB4);
                
                let tempB5 = msgSplited[4].split(':');
                state.b5 = tempB5[1];
                console.log(tempB5);
                
                let tempB6 = msgSplited[5].split(':');
                state.b6 = tempB6[1];
                console.log(tempB6);
                
                let tempB7 = msgSplited[6].split(':');
                state.b7 = tempB7[1];
                console.log(tempB7);
            }
            if(message.utf8Data = 'update'){
                let string2Send = 'b1:'+state.b1+',b2:'+state.b2+',b3:'+state.b3+',b4:'+state.b4+',b5:'+state.b5+',b6:'+state.b6+',b7:'+state.b7+'.'
                client.sendUTF(string2Send);

            }
            
        }
    });

    //Cria uma função que será executada a cada 1 segundo (1000 millis) para enviar o estado do led
    /*let interval = setInterval(() => {
        
        let string2Send = 'b1:'+state.b1+',b2:'+state.b2+',b3:'+state.b2+',b4:'+state.b2+',b5:'+state.b2+',b6:'+state.b2+',b7:'+state.b2+'.'
        
        if(lastString2send != string2Send){
            client.sendUTF(string2Send);
            lastString2send = string2Send;
        }
        //client.sendUTF(string2Send);
        //Inverte o estado
        //console.log(state);
        
        
    }, 200);//Tempo entre chamadas => 1000 millis = 1 segundo */

    //Chamado quando a conexão com o client é fechada
    client.on('close', () => {
        console.log("Conexão fechada");
        //Remove o intervalo de envio de estado
        //clearInterval(interval);
    });
});