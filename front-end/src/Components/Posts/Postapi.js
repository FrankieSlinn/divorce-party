import Posts from "./Posts"

console.log("Props in postAPI", Posts.props)

//getAPI

export const getAllPosts = (props) => {
  return fetch("http://localhost:5001/posts/")
};






