## ECDSA Node

This project is an example of using a client and server to facilitate transfers between different addresses. Since there is just a single server on the back-end handling transfers, this is clearly very centralized. We won't worry about distributed consensus for this project.

However, something that we would like to incoporate is Public Key Cryptography. By using Elliptic Curve Digital Signatures we can make it so the server only allows transfers that have been signed for by the person who owns the associated address.

### Video instructions
For an overview of this project as well as getting started instructions, check out the following video:

https://www.loom.com/share/0d3c74890b8e44a5918c4cacb3f646c4
 
### Client

The client folder contains a [react app](https://reactjs.org/) using [vite](https://vitejs.dev/). To get started, follow these steps:

1. Open up a terminal in the `/client` folder
2. Run `npm install` to install all the depedencies
3. Run `npm run dev` to start the application 
4. Now you should be able to visit the app at http://127.0.0.1:5173/

### Server

The server folder contains a node.js server using [express](https://expressjs.com/). To run the server, follow these steps:

1. Open a terminal within the `/server` folder 
2. Run `npm install` to install all the depedencies 
3. Run `node index` to start the server 

The application should connect to the default server port (3042) automatically! 

_Hint_ - Use [nodemon](https://www.npmjs.com/package/nodemon) instead of `node` to automatically restart the server on any changes.


## Key Pairs

Private Key: 876498a3c953f6343945deaf97e3fbbcd38cb688b848f2e8078de260722ea463  
Public Key: 0272289330e3052ef8d1bdecfafee828cdc5b3291a305ff647047de5a46d7a0333  
Address: 0x5d5cfbfcccede9a040cab219d48119ace761e360

Private Key: a829f035369f0abec246a35b1ee056de9c7f83f8358248387907977b4e638b54  
Public Key: 03263b9760addc452f71c76a4bf72f93eba19c62c4b9b84ac166678cfc44267c5c  
Address: 0x2b012b3ecc18b8a3f20407cac369cfe8f2b82b1a


Private Key: 4fd7fe78437c58d787995c488c049e0dd8117fe51b843b90d853731f31d16922  
Public Key: 03ccf51f57ae41b2d9acbbc1009ae67f2cb543d1782625f3490550768028dc4efe  
Address: 0xb2cd466409681404193b135841ad53a1ddfc9e93