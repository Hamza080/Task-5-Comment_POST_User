import React, { useState, useEffect } from "react";
import axios from "axios";

const PostActivity = ({ post, postId }) => {
  const token = JSON.parse(localStorage.getItem("Token"));
  const id = JSON.parse(localStorage.getItem("id"));
  const [allComments, setAllComments] = useState([]);

  const getComments = async () => {
    try {
      const res = await axios.get(
        `https://taskforum.herokuapp.com/api/comment/post/${postId}`,
        {
          headers: { Authorization: `Bearar ${token}` },
        }
      );
      setAllComments(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getComments();
  }, []);
  return (
    <div>
      <div className=" container flex-wrap d-flex ms-5 mt-3">
        {post.map((ele) => {
          return (
            <>
              {postId === ele._id ? (
                <div className="card-ms-3">
                  <div className="card-body">
                    <h5 class="card-title">{ele.title}</h5>
                    <h2 class="card-title">{ele.category}</h2>
                    <p class="card-text"> {ele.description} </p>
                  </div>
                  <hr />
                  <h5 className="ms-3">Comments</h5>
                  {allComments.map((elem, index) => {
                    {
                      console.log(allComments, "Hamza");
                    }
                    return (
                      <>
                        {elem.post === postId ? (
                          <h6>
                            {index + 1}:{elem.comment}
                          </h6>
                        ) : (
                          ""
                        )}
                      </>
                    );
                  })}
                </div>
              ) : (
                ""
              )}
            </>
          );
        })}
      </div>
    </div>
  );
};

export default PostActivity;
