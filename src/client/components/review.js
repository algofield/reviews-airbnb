import React from 'react';

const Review = ({ review, formatDate }) => {
  return (
    <div className="Reviews">
      <div id="rReview">
        <div className="rReviewBox">
          <div className="rReviewBox">
            <div className="rViewBox">
              <div className="rImageBox">
                <img className="rCustomImage reviewPhoto" src={review.photo} alt=""></img>
              </div>
            </div>
            <div className="rViewBox">
              <span className="rReviewName reviewUser">{review.user}</span>
              <div className="rReviewDate reviewDate">{formatDate(review.date)}</div>
            </div>
          </div>
          <div className="rFlexBox">
            <div className="rReviewText reviewText">{review.text}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Review;