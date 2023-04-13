/**
 *
 * Asynchronously loads the component for ManageTeams
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
