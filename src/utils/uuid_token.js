// 赋予用户临时身份，可以将物品添加到购物车里面
import { v4 as uuidv4 } from 'uuid';
export const GetUUID = ()=>{
    let uuid = localStorage.getItem("UUIDTOKEN")
    if(!uuid){
        uuid = uuidv4()
        localStorage.setItem('UUIDTOKEN',uuid)
    }
    return uuid
}