 export type User = {

    id: string,
    avatar: string,
    name: string,
    status: string
  }

  export type Chat = {
    userId:string,
    toUserId:string,
    message:string,
    date:Date

  }