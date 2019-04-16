var mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);
const mlabURI = 'mongodb://hieudu0ngtrung:duongtrunghieu01@ds034797.mlab.com:34797/quanlysanbong'  
const dbName = 'quanlysanbong';
const connectdb = mongoose.connect(mlabURI,{
	reconnectTries : Number.MAX_VALUE,
	autoReconnect : true,
	useNewUrlParser: true
}, (error) => {
	if(error){
		console.log("Error " + error);
	}else{
		console.log("kết nối với server database thành công")
	}
});

module.exports = connectdb;
// const mongoose = require('mongoose');
// mongoose.set('useCreateIndex', true);
// const mlabURI = 'mongodb://hieudu0ngtrung:duongtrunghieu01@ds034797.mlab.com:34797/quanlysanbong'


// class Database{
    
//     static _connect(){
//         mongoose.connect(mlabURI,{
//             reconnectTries : Number.MAX_VALUE,
// 	        autoReconnect : true,
// 	        useNewUrlParser: true
//         })
//         .then((rs) => {
//             console.log("kết nối với server database thành công")
//         }).catch((err) => {
//             console.log("Error " + error);
//         });
//     }
// }

// module.exports = new Database;