import React from 'react';
import styled from 'styled-components';
import ReviewsModalBody from './reviewsModalBody';

const ModalInner = styled.div`
  &&& { 
    display: ${props => props.isModalShowing ? "table-cell" : "none"};
  }
`;

const SvgBox = styled.div`
  &&& { 
    width: 30px;
    height: 30px;
    border-radius: 50%;
    box-shadow: ${props => props.isModalSelected ? "0 .1rem .5rem rgba(118,118,118,0)" : "0 .1rem .5rem rgba(118,118,118,0.5)"};
  }
`;

const ReviewModal = ({ isModalShowing, isModalSelected, selectModal, reviews, formatDate, toggleModal }) => {

  return (
    <div className="Reviews">
      <div id="rModal">
        <ModalInner isModalShowing={isModalShowing} onClick={() => selectModal()}>
          <div className="rModalInner">
            <div className="rModalHeader">
              <button id="closeButton" className="rCloseButton" onClick={() => toggleModal()}>
                <SvgBox isModalSelected={isModalSelected}>
                  <svg className="rSvgButton" viewBox=" 0 0 24 24">
                    <path d="m23.25 24c-.19 0-.38-.07-.53-.22l-10.72-10.72-10.72 10.72c-.29.29-.77.29-1.06 0s-.29-.77 0-1.06l10.72-10.72-10.72-10.72c-.29-.29-.29-.77 0-1.06s.77-.29 1.06 0l10.72 10.72 10.72-10.72c.29-.29.77-.29 1.06 0s .29.77 0 1.06l-10.72 10.72 10.72 10.72c.29.29.29.77 0 1.06-.15.15-.34.22-.53.22">
                    </path>
                  </svg>
                </SvgBox>
              </button>
            </div>
            <div className="rModalBody">
              <ReviewsModalBody reviews={reviews} formatDate={formatDate} />
            </div>
          </div>
        </ModalInner>
      </div>
    </div >
  );
};

export default ReviewModal;