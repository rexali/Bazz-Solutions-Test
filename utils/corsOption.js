const corsOption = () => ({
     origin: ["http://191.168.70.35:3000", "http://192.168.1.107"],
     // origin: '*',
     credentials: true,
     allowedHeaders: ['Content-Type', 'Authorization', 'Content-Length', 'X-Requested-With', 'Accept'],
     methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'],
     optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204 
});

module.exports={
    corsOption
}