const {
    MongoClient,
    ObjectId
} = require('mongodb');
// Connection URL
const url = 'mongodb://localhost:27017';
// Database Name
const dbName = 'students';
// 连接
const connect = () => {
    return new Promise((resolve, reject) => {
        // Use connect method to connect to the server
        MongoClient.connect(url, {
            useNewUrlParser: true
        }, function (err, client) {
            if (err !== null) {
                reject(err);
                throw err;
            } else {
                // 得到连接端
                resolve(client);
            };

        });
    })
}
// 查找
const find = (col, params) => {
    return new Promise(async (resolve, reject) => {
        // 连接
        let client = await connect();
        // console.log("Connected successfully to server");
        // 选中需要连接的库
        const db = client.db(dbName);
        // 选中表
        const collection = db.collection(col);
        // Find some documents
        collection.find(params).toArray(function (err, docs) {
            // console.log("Found the following records");
            // console.log(docs)
            if (err) {
                reject(err);
            } else {
                resolve(docs);
            }

        });
        // 关闭连接
        client.close();
    })
}
//删除 
const deleteOne = (col, params) => {
    return new Promise(async (resolve, reject) => {
        // 连接
        let client = await connect();
        // console.log("Connected successfully to server");
        // 选中需要连接的库
        const db = client.db(dbName);
        // 选中表
        const collection = db.collection(col);
        // Find some documents
        collection.deleteOne(params).toArray(function (err, docs) {
            // console.log("Found the following records");
            // console.log(docs)
            if (err) {
                reject(err);
            } else {
                resolve(docs);
            }

        });
        // 关闭连接
        client.close();
    })
}
// const remov = (col, par) => {
//     return new Promise(async (resolve, reject) => {
//         let client = await connect();
//         const db = client.db(dbName);
//         // 选中表
//         const collection = db.collection(col);
//         // Find some documents
//         collection.deleteOne(par, function (err, result) {
//             if (err) {
//                 throw err;
//                 reject(err);
//             }
//             else {
//                 resolve(result);
//             }
//         });
//         client.close();
//     });
// }
//增
const insertMany = (col, params) => {
    return new Promise(async (resolve, reject) => {
        // 连接
        let client = await connect();
        // console.log("Connected successfully to server");
        // 选中需要连接的库
        const db = client.db(dbName);
        // 选中表
        const collection = db.collection(col);
        // Find some documents
        collection.insertMany(params).toArray(function (err, docs) {
            // console.log("Found the following records");
            // console.log(docs)
            if (err) {
                reject(err);
            } else {
                resolve(docs);
            }

        });
        // 关闭连接
        client.close();
    })
}
//删除
const updateOne = (col, params, param) => {
    return new Promise(async (resolve, reject) => {
        // 连接
        let client = await connect();
        // console.log("Connected successfully to server");
        // 选中需要连接的库
        const db = client.db(dbName);
        // 选中表
        const collection = db.collection(col);
        // Find some documents
        collection.updateOne(params, param).toArray(function (err, docs) {
            // console.log("Found the following records");
            // console.log(docs)
            if (err) {
                reject(err);
            } else {
                resolve(docs);
            }

        });
        // 关闭连接
        client.close();
    })
}
// const updata = (col, par, par2) => {
//     return new Promise(async (resolve, reject) => {
//         let client = await connect();
//         const db = client.db(dbName);
//         // 选中表
//         const collection = db.collection(col);
//         // Find some documents
//         collection.updateOne(par, { $set: par2 }, function (err, result) {
//             // console.log("Found the following records");
//             // console.log(docs)
//             if (err) {
//                 throw err;
//                 reject(err);
//             }
//             else {
//                 resolve(result);
//             }
//         });
//         client.close();
//     });
// }
//传出方法
module.exports = {
    updateOne,
    insertMany,
    find,
    deleteOne,
    connect,
    // // 根据id查找
    ObjectId,
    // remov,
    // updata
}