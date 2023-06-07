import bcrypt from 'bcryptjs';
import db from '../models/index';
const salt = bcrypt.genSaltSync(10);

let createNewUser = async (data) =>{
    return new Promise(async(resolve,reject) =>{
            try {
        let hashPassWordFromBcrypt = await hashUserPassword(data.password);
        await db.User.create({
            email: data.email,
            password: hashPassWordFromBcrypt,
            firstName: data.firstName,
            lastName: data.lastName,
            address: data.address,
            phoneNumber: data.phoneNumber,
            gender: data.gender === '1' ? true : false,
            roleId: data.roleId,
        })
        resolve('Ok create successfully!')        
            } catch (e) {
                    reject(e);
            }
    })
}
let hashUserPassword = (password) =>{
    return new Promise(async(resolve, reject) => {
       try {
let hashPassWord = await bcrypt.hashSync(password, salt);
        resolve(hashPassWord);
       } catch (error) {
            reject(error);
       }
    })
}
let getAllUser =()=>{
    return new Promise(async(resolve,reject)=>{
        try {
            let users = db.User.findAll({
                raw:true,
            });
            resolve(users);
        } catch (e) {
            reject(e);
        }
    })
}
let getUserInfoById =  (userId)=>{
    return new Promise(async(resolve, reject) => {
        try {
            let user= await db.User.findOne({
                where:{ id: userId}
            })
            if(user){
                resolve(user);
            }else{
                resolve([]);
            }
        } catch (error) {
            reject(error);
        }

    })
}
let updateUserData = (data)=>{
    return new Promise(async(resolve, reject) => {
        try {
            let user = db.User.findOne({
                where: { id: data.id}
            })
            if(user){
                console.log('user update')
                console.log(user);
                user.firstName = data.firstName;
                user.lastName= data.lastName;
                user.address= data.address;
                 
                let allUsers = await db.User.findAll();
                resolve();
            } else{
                resolve();
            }  
            
        } catch (error) {
            console.log(error)
            reject();
        }
    })
}
    let deleteUserById = (userId)=>{
        return new Promise(async(resolve, reject) => {
            try {
                let user = await db.User.findOne({
                    where: {id:userId}
                })
                if(user){
                  await user.destroy();
                }
                resolve();//return
            } catch (e) {
                reject(e);
            }
        })
    }
module.exports ={
    createNewUser: createNewUser,
    getAllUser: getAllUser,
    getUserInfoById: getUserInfoById,
    updateUserData: updateUserData,
    deleteUserById:deleteUserById,
}