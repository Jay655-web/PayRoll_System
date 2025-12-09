const axios = require("axios");

setInterval(()=>{
    axios.get("http://     ")
    .then(()=> console.log("Keep server awake"))
    .catch(()=> console.log("Server asleep"));
}, 5*60*1000);