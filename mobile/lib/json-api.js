import _ from "axios";
const api="https://jsonplaceholder.typicode.com/"
export const axios2 = _.create({
    baseURL: `${api}`,
    timeout: 5000,// 5 seconds
});

