export interface IPost {
    [x: string]: any
    user:string
      content: string,
      category: string,
      tags: string[],
      finished:boolean
      scheduled:boolean
      publishDate:Date
      comments: string

}