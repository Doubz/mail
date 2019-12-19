import {
  ADD_COUNT,
  ADD_TO_CART
} from "./mutation-types"

export default {
      // vuex推荐的操作
    // 逻辑操作 异步操作 都建议在actions里面去操作
  addCart(context,payload){

    // let oldProduct = null

    // for(let item of state.cartList)
    // {
    //   if(item.iid === payload.iid){
    //     oldProduct = item
    //   }
    // }

    // if(oldProduct){
    //   oldProduct.count += 1
    // }
    // else{
    //   payload.count = 1
    //   state.cartList.push(payload)
    // }

    return new Promise((resolve,reject)=>{

      let oldProduct = context.state.cartList.find(item => item.iid === payload.iid )
      console.log(oldProduct)
      if(oldProduct){
        context.commit(ADD_COUNT,oldProduct)
        resolve("当前的商品数量+1")
      }else{
        payload.count = 1
        context.commit(ADD_TO_CART,payload)
        resolve("当前的数量+1")
        // context.state.cartList.push(payload)
      }


    })



  }
}