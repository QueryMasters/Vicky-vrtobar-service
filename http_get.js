import http from "k6/http";
import { check, sleep } from 'k6';

export const options = {
    vus: 200,
    duration: '600s',
    rps: 2000
}

const randomRoom = Math.floor(Math.random() * (10000))

var getProducts = function() {
    // for (var id = 1; id <= 1000; id++) {
        var array = ['a', 'b', 'c', 'd', 'e', 'f', 'g'];
        // http.get(`http://localhost:3003/products/${id}`, {tags: {name: 'PostsItemURL'}})
        //VU
        http.get(`http://localhost:3003/products/${randomRoom}`)
    //   }
}

export default getProducts;