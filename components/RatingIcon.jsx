import React from 'react'
    import { StarIcon } from './StarIcon';

const RatingIcon = (props) => {
  const {
    index,
    rating,
    hoverRating,
    onMouseEnter,
    onMouseLeave,
    onSaveRating,
  } = props;
  const fill = React.useMemo(() => {
    if (hoverRating >= index) {
      return "yellow";
    } else if (!hoverRating && rating >= index) {
      return "yellow";
    }
    return "none";
  }, [rating, hoverRating, index]);

  const idDiv = React.useMemo(() => {
    if (hoverRating >= index) {
      return index;
    } else if (!hoverRating && rating >= index) {
      return index;
    }
    return 0;
  }, [rating, hoverRating, index]);

  return (
    <div
      className="cursor-pointer"
      onMouseEnter={() => onMouseEnter(index)}
      onMouseLeave={() => onMouseLeave()}
      onClick={() => onSaveRating(index)}
    >
      <StarIcon fill={fill}  idDiv={idDiv}/>
    </div>
  );
};

export default RatingIcon