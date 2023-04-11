/**
 *
 * Asynchronously loads the component for ParkingAreas
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
