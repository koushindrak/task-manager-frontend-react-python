/**
 *
 * Asynchronously loads the component for ManageParkingSlot
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
