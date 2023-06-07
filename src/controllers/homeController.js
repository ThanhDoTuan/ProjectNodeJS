import { json } from 'body-parser';
import db from '../models/index';
import CRUDService from '../services/CRUDService';
let getHomePage = async (req, res) => {
    try {
        let data = await db.User.findAll();
        console.log(data);
        return res.render('homepage.ejs',{
            data: JSON.stringify(data)    
        });
    } catch (error) {
        console.log(error);
    }
   
}

let getAboutPage = (req, res) => {
    return res.render('test/about.ejs');
}

// object: {
//     key: '',
//     value: ''
// }
let getCRUD = (req,res) =>{
    return res.render('crud.ejs');
}
let postCRUD = async (req,res) =>{
    let message = await CRUDService.createNewUser(req.body);
    console.log('req.body from web');
    console.log(req.body);
    return res.send('post crud from server');
}
let displayGetCRUD = async (req,res) =>{
    let data = await CRUDService.getAllUser();
    console.log(data);
    return res.render('displayCRUD.ejs',{
        dataTable: data
    });
}
let getEditCRUD = async(req,res) =>{
    let userId = req.query.id;
  //  console.log(userId);
    if(userId){
        let userData = await CRUDService.getUserInfoById(userId);
        console.log('---------------');
        console.log(userData)
        console.log('---------------');
        return res.render('editCRUD.ejs',{user: userData});
        // let userData
    }else{
        return res.send('User not found!');
    }
}

let putCRUD = async(req,res)=>{
    let data = req.body
    let allUsers= await CRUDService.updateUserData(data);
    return res.render('displayCRUD.ejs',{
        dataTable: allUsers
    });
}
let deleteCRUD = async(req,res)=>{
        let id = req.query.id;
        if(id){
            await CRUDService.deleteUserById(id);
        return res.send('delete user successfully!');
        }else{
        return res.send('User not found!');
        }
}
module.exports = {
    getHomePage: getHomePage,
    getAboutPage: getAboutPage,
    getCRUD: getCRUD,
    postCRUD: postCRUD,
    displayGetCRUD:displayGetCRUD,
    getEditCRUD:getEditCRUD,
    putCRUD:putCRUD,
    deleteCRUD:deleteCRUD,
}
