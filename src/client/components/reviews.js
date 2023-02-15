import React from 'react';
import Review from './review';

const Reviews = ({ reviews, formatDate }) => {
  let groups = [reviews.slice(0, 2), reviews.slice(2, 4), reviews.slice(4, 6)];
  return (
    <div className="Reviews">
      <div id="rReviews">
        {groups.map((group, k) =>
          <div className="row" key={k}>
            {group.map((review, i) => (
              <div
                className="rReviewColumn"
                key={i + k}
              >
                <Review review={review} formatDate={formatDate} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Reviews;