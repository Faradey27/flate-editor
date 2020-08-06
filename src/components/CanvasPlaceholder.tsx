import classes from './CanvasPlaceholder.module.scss';
import Spinner from './Spinner';

const CanvasPlaceholder = () => {
  return (
    <div className={classes.root}>
      <Spinner />
    </div>
  );
};

export default CanvasPlaceholder;
