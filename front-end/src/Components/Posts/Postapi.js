import Posts from "./Posts"

console.log("Props in postAPI", Posts.props)

//getAPI

export const getAllPosts = (props) => {
  return fetch("http://172.17.28.19:5000/posts")
};






