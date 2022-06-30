import sdk from 'matrix-js-sdk'
console.log("sdk-2")

const matrixclient=sdk.createClient({
    baseUrl:"https://matrix.org",
    accessToken: process.env.accessToken,
    userId: process.env.username
})

matrixclient.startClient();
    
console.log(matrixclient)
export {matrixclient}