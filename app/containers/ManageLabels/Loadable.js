/**
 *
 * Asynchronously loads the component for ManageLabels
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
