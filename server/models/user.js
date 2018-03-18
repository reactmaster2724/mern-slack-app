'use strict';

function prepare(o) {
    if (o && o._id) {
        o._id = o._id.toString();
    }
    return o;
}

class UserModel {
    constructor(db, ObjectId) {
        this.getUserById = async id => {
            const user = await this.Users.findOne(this.ObjectId(id));
            return prepare(user);
        };

        this.getUser = async fields => {
            return await prepare(this.Users.findOne(fields));
        };

        this.getUserByValue = async (fields, value) => {
            return prepare((await this.Users.findOne({
                $or: fields.map(field => ({
                    [field]: value
                }))
            })));
        };

        this.getUserByEmail = async (value) => {
            return await this.Users.findOne({ email: value });
        }

        this.getUserByUserName = async (value) => {
            return await this.Users.findOne({ userName: value });
        }

        this.updateUser = async (id, fields) => {
            return await this.Users.update({
                _id: this.ObjectId(id)
            }, {
                    $set: fields
                });
        };

        this.insertUser = async fields => {
            const { insertedId } = await this.Users.insertOne(fields);
            return insertedId;
        };

        if (!db) {
            throw new Error('DB is required.');
        }
        this.db = db;
        if (!ObjectId) {
            throw new Error('ObjectId is required.');
        }

        this.ObjectId = ObjectId;
        this.Users = this.db.collection('users');
    }

}

module.exports = UserModel;