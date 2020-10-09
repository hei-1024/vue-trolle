import axios from "axios";
import Message from "../components/Message/Message";


axios.defaults.baseURL = process.env.VUE_APP_SERVER_API_PATH
axios.interceptors.request.use(configs => {
    try {
        let data = JSON.parse(localStorage.getItem('user'));
        if (data.authorization){
            configs.headers.common.authorization = data.authorization;
        }
    } catch (error) {
        
    }
    return configs
})
axios.interceptors.response.use(response=>{
    return response
},error =>{
    console.log(error);
    let {message,errorDetails} = error.response.data;
    if(errorDetails){
        message += ' : ' + errorDetails
    }
    Message.error({message})
})
/**
 * 注册 
 */
export const register = data => {
    return axios({
        method:'post',
        url: '/user/register',
        data
    })
}
/**
 * 登录 
 */
export const login = data => {
    return axios({
        method:'get',
        url: '/user/login',
        data
    })
}

/**
 * 获取当前用户面板
 */
export const getBoards = () => {
    return axios({
        method:"get",
        url:'/board'
    })
}

/**
 * 查找一个面板 
 */
export const getBoard = id => {
    return axios({
        url:'/board/' + id
    })
}

/**
 * 添加一个面板
 */
export const postBoard = data => {
    return axios({
        method:"post",
        url:'/board',
        data
    })
}

/**
 * 获取指定面板下的所有列表集合 
 */
export const getLists = boardId => {
    return axios({
        url:"/list",
        params:{boardId}
    })
}

/**
 * 添加一个新的列表
 */
export const postList = data => {
    console.log(data);
    return axios({
        method:'post',
        url:'/list',
        data
    })
}

/**
 * 编辑指定的列表
 */
export const putList = data => {
    return axios({
        url: '/list/'+ data.id,
        method:'put',
        data:{
            boardId:data.boardId,
            name:data.name,
            order:data.order
        }
    })
}


/**
 * 获取指定列表下的所有卡片集合 
 */
export const getCards = boardListId => {
    return axios({
        url:"/card",
        params:{boardListId}
    })
}

/**
 * 添加一张卡片
 */
export const postCard = data => {
    console.log(data);
    return axios({
        method:'post',
        url:'/card',
        data
    })
}
  

/**
 * 编辑指定的卡片card
 */
export const putCard = data => {
    return axios({
        url: '/card/'+ data.id,
        method:'put',
        data:{
            boardListId:data.boardListId,
            name:data.name,
            description:data.description,
            order:data.order
        }
    })
}

/**
 * 上传附件
 */
export const uploadAttachment = data => {
    let fd = new FormData();
    fd.append('boardListCardId',data.boardListCardId)
    fd.append('attachment',data.file)
    return axios({
        method:'post',
        url:'/card/attachment',
        data:fd
    })
}

/**
 * 删除附件
 */
 export const removeAttachment = data => {
     return axios({
        method:'delete',
        url:'/card/attachment/'+ data.id
     })
 }


/**
 * 设置封面
 */
 export const setCover = data => {
     return axios({
        method:'put',
        url:'/card/attachment/cover/'+ data.id
     })
 }


/**
 * 移除封面
 */
 export const removeCover = data => {
     return axios({
        method:'delete',
        url:'/card/attachment/cover/'+ data.id
     })
 }

 /**
  * 获取评论
  */

  export const getComments = params => {
      return axios({
          url:'/comment',
          params
      })
  }

  /**
   * 添加评论
   */
  export const PostComments = data => {
      return axios({
          method:'post',
          url:'/comment',
          data
      })
  }