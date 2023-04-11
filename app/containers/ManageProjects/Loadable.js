/**
 *
 * Asynchronously loads the component for ManageProjects
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
