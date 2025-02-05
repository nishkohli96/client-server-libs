import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AppBar } from 'components';
import RouteNames from './route-names';
import { RouteList } from './route-list';

import HomePage from 'pages/Home';
import Page404 from 'pages/Page404';

const Routing = () => {
  return (
    <BrowserRouter>
      <AppBar />
      <Routes>
        <Route path={RouteNames.home} element={<HomePage />} />
        {RouteList.map(route => (
          <Route
            path={route.path}
            element={route.element}
            key={route.path.replace('/', '')}
          />
        ))}
        <Route path="*" element={<Page404 />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Routing;

