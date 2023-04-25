import './index.css';


const Review = ({ review }) => {
  return (
    <div className="rev_field"
    >
      <div>{review.text}</div>
    </div>
  );
};

export default Review;