import Posts from "./Posts"

console.log("Props in postAPI", Posts.props)

//getAPI

export const getAllPosts = (props) => {
  return fetch("http://172.17.28.19:5000/posts")
};

//DeleteAPI

// export const deleteAPI = (props) => {
//   fetch(`http://172.17.28.19:5000/posts/${props.id}`, {
//     method: "delete",
//     headers: {
//       "Content-Type": "application/json",
//     },
//   })
//     .then((data) => data.json())
//     .then((posts) => console.log(posts));
// };

//UpdateAPI

export const updateAPI = (props) => {
  props.setId(props.updateId);
  console.log(
    "in update, id, auth, title",
    props.id,
    props.author,
    props.title
  );
  fetch(`http://172.17.28.19:5000/posts/${props.id}`, {
    method: "put",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      author: props.author,
      title: props.title,
      content: props.content,
    }),
  })
    .then((data) => data.json())
    .then((posts) => console.log(posts));
};
