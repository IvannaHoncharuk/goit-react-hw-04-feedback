import PropTypes from 'prop-types';
import { Box } from 'components/Box';
import { Button } from './FeedbackOptions.styled';

export const FeedbackOptions = ({ options, onLeaveFeedback }) => {
  return (
    <Box as="ul" display="flex" gridGap={4}>
      {options.map(data => {
        return (
          <li key={data}>
            <Button onClick={() => onLeaveFeedback(data)}>
              {data.replace(/^./, data[0].toUpperCase())}
            </Button>
          </li>
        );
      })}
    </Box>
  );
};

FeedbackOptions.propTypes = {
  options: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  onLeaveFeedback: PropTypes.func.isRequired,
};