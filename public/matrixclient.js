import {createClient} from '../node_modules/matrix-js-sdk/lib/matrix.js'

const matrixclient=createClient({
    baseUrl:"https://matrix.org",
    accessToken: process.env.accessToken,
    userId: process.env.username
})

export default matrixclient