import http from "k6/http";

var postProducts = function() {
    for (var id = 1; id <= 1000; id++) {
        // http.get(`http://localhost:3003/products/${id}`, {tags: {name: 'PostsItemURL'}})
        http.post(`http://localhost:3003/products/`, {tags: {name: 'example ball'}})
      }
    
}

export default function() {
    var url = "http://localhost:3003/products";
    var payload = JSON.stringify({ name: "aaa" });
    // var params =  { headers: { "Content-Type": "application/json" } }
    http.post(url, payload);
  };