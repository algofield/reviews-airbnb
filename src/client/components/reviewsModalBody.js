import React from 'react';

const ReviewsModalBody = ({ reviews, formatDate }) => {
  return (
    <div className="Reviews">
      <div id="rModalBody">
        <h1 className="rReviewsHeader">{reviews.length} Reviews</h1>
        {reviews.map((review, i) =>
          <div key={i}>
            <div className="rReviewBox">
              <div className="rViewBox">
                <div className="rImageBox">
                  <img src={review.photo} alt="" className="rCustomImage" />
                </div>
              </div>
              <div className="rViewBox">
                <span className="rReviewName">{review.user}</span>
                <div className="rReviewDate">{formatDate(review.date)}</div>
              </div>
            </div>
            <div id="modalText" className="rReviewText">{review.text}</div>
            <hr />
          </div>
        )}
      </div>
    </div>
  );
};


export default ReviewsModalBody;