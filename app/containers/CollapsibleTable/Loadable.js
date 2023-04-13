/**
 *
 * Asynchronously loads the component for CollapsibleTable
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./material-ui-data-grid-table'),
  loading: () => null,
});
