import openSocket from 'socket.io-client';

const socket = openSocket();

    const sockets = {

        listenForNamespace: () => {
        // listen for nsList, which is a list of all the namespaces.
            socket.on('nsList', (nsData) => {
            console.log("The list of namespaces has arrived!!")
            console.log(nsData);
            });
        },

        listenForMessage: (callback) => {
            // us listening for any event for message
            socket.on('message', (data) => {
                callback(data);
            });
        },

        sendMessage: (data) => {
            // us sending an event of message with any data
            socket.emit('message', data);
        }
    };

export { sockets };