import Axios from 'axios';
import moment from 'moment';
import React from 'react';
import styled from 'styled-components';
import ReviewModal from './reviewModal';
import Reviews from './reviews';

const ModalProp = styled.div`
  &&& {
    opacity: ${props => props.isModalShowing ? "0.5" : "1.0"};
  }
`;

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      reviews: [],
      isModalShowing: false,
      isModalSelected: false
    };

    this.toggleModal = this.toggleModal.bind(this);
    this.selectModal = this.selectModal.bind(this);
  }


  toggleModal() {
    this.setState({
      isModalShowing: !this.state.isModalShowing,
      isModalSelected: false
    });
  }

  selectModal() {
    this.setState({
      isModalSelected: true
    });
  }


  formatDate(date) {
    return String(moment(new Date(date)).fromNow());
  }

  sortByDate(reviews) {
    return reviews.sort((a, b) => new Date(b.date) - new Date(a.date));
  }

  componentDidMount() {
    Axios({
      url: `http://localhost:3004/reviews/${Math.floor(Math.random() * 99) + 1}`,
      method: 'GET',
      headers: {
        'Accepts': 'application/json',
        'Content-Type': 'application/json'
      },
    })
      .then(res => res.data)
      .then(data => {
        this.setState(state => {
          data = this.sortByDate(data)
          return {
            reviews: data
          }
        });
      })
      .catch(console.error);
  }

  render() {
    return (
      <div className="Reviews">
        <div id="rApp">
          <div className="rBodyContainer">
            <div className="rModalContainer">
              <ReviewModal
                id="modal"
                isModalShowing={this.state.isModalShowing}
                isModalSelected={this.state.isModalSelected}
                selectModal={this.selectModal}
                toggleModal={this.toggleModal}
                reviews={this.state.reviews}
                formatDate={this.formatDate}
              />
            </div>
            <div
              className="rPageContainer"
              onClick={() => this.toggleModal()}
            >
              <ModalProp isModalShowing={this.state.isModalShowing}>
                <hr />
                <div className="rPaddingTop">
                  <h1 className="rReviewTitle">Reviews</h1>
                  <Reviews
                    isModalShowing={this.state.isModalShowing}
                    toggleModal={this.toggleModal}
                    reviews={this.state.reviews}
                    formatDate={this.formatDate}
                  />
                  <div className="rModalButtonContainer">
                    <a
                      className="rMoreReviews"
                      id="moreReviews"
                      style={{ 'color': '#914669' }}
                      onClick={this.toggleModal}
                    >
                      Read all {this.state.reviews.length} reviews
                    </a>
                  </div>
                </div>
              </ModalProp>
            </div>
            <hr />
          </div>
        </div>
      </div>
    );
  }
}

export default App;