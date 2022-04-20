import React from 'react'

const CommentsOnPost = ({allComments}) => {
  return (
    <div>
        {allComments.map((ele, index)=>{
            return(
                <>
                <p>
                    {index + 1}:{""}
                    {ele.comment}
                </p>
                </>
            )
        }
        )}
    </div>
  )
}

export default CommentsOnPost