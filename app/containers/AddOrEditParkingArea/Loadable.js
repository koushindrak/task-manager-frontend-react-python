/**
 *
 * Asynchronously loads the component for AddOrEditParkingArea
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
