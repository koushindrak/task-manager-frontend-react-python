/**
 *
 * Asynchronously loads the component for ManageSession
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./signin'),
  loading: () => null,
});
