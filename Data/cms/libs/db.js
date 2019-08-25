var express = require('express');
var app = express();

const {
    MongoClient,
    ObjectId
} = require('mongodb');
//  连接URL
const url = 'mongodb://localhost:27017';

//  数据库名称
const dbName = 'CMS';
app.use((req, res, next) => {
    // 全局添加
    res.append('Access-Control-Allow-Origin', '*');
    next();
})

//连接
const connect = () => {

    return new Promise((resolve, reject) => {

        MongoClient.connect(url, {
            useNewUrlParser: true
        }, function(err, client) {
            if (err !== null) {
                reject(err);
                throw err;
            } else {
                //得到连接端
                resolve(client)
            }

        });
    });

}

//查询
const find = (col, params) => {

    return new Promise(async(resolve, reject) => {
        //连接
        let client = await connect();
        // console.log("Connected successfully to server");
        // 选中需要连接的库
        const db = client.db(dbName);
        // 选中表
        const collection = db.collection(col);
        // Find some documents
        collection.find(params).toArray(function(err, docs) {
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
    });
}

//删除

const deleteOne = (col, params) => {

    return new Promise(async(resolve, reject) => {

        let client = await connect();

        const db = client.db(dbName);

        const collection = db.collection(col);
        collection.deleteOne(params, function(err, docs) {
            if (err) {
                reject(err);
            } else {
                resolve(docs);
            }
        })

        client.close();
    });
}

//修改
const updateOne = (col, params, params2) => {
        return new Promise(async(resolve, reject) => {

            let client = await connect();

            const db = client.db(dbName);

            const collection = db.collection(col);

            collection.updateOne(params, params2, function(err, docs) {
                if (err) {
                    reject(err);
                } else {
                    resolve(docs);
                }
            });
            client.close();
        });
    }
    //增加
    // params 为一个数组[{username}]
const insertMany = (col, params) => {
    return new Promise(async(resolve, reject) => {
        let client = await connect();

        const db = client.db(dbName);

        const collection = db.collection(col);

        collection.insertMany(params, function(err, docs) {
            if (err) {
                reject(err);
            } else {
                resolve(docs);
            }
        });
        client.close();
    });
}
module.exports = {
    connect,
    find,
    ObjectId,
    updateOne,
    deleteOne,
    insertMany
}