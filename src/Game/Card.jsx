import { useEffect } from 'react';
import PropTypes from 'prop-types';

const Card = ({ item, handleSelectedCards, toggled, stopflip }) => {
  useEffect(() => {
    console.log(item.image)
  }, [item])
  return (
    <div className="item_frame pentagone">
      <div className="item pentagone">
        <div className={toggled ? "toggled" : ""}>
          <img src={item.image} alt="face" className="face" />
          <div 
            className="back"
            onClick={() => !stopflip && handleSelectedCards(item)}
          >
              {' '}
            </div>
        </div>
      </div>
    </div>
  )
}

Card.propTypes = {
  item: PropTypes.object.isRequired,
  handleSelectedCards: PropTypes.func.isRequired,
  toggled: PropTypes.bool.isRequired,
  stopflip: PropTypes.bool.isRequired,
}

export default Card;