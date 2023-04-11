/**
 *
 * Asynchronously loads the component for ManageTasks
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
