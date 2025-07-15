
import React from 'react';
import { Suspense } from "react";
import AppEntry from './navigation/route.jsx'
import { BrowserRouter, Routes, Route } from "react-router-dom";;
const Home = React.lazy(() => import('./pages/home.jsx'));
const About = React.lazy(() => import('./pages/about.jsx'));
import Loading from './components/loading.jsx';
const ComingSoon = React.lazy(() => import('./pages/comingsoon.jsx'));
const useState = React.lazy(() => import('./components/state/useState.jsx'));

const routes = [
  {
    path: "hooks",
    label: "Hooks",
    subPaths: [
      { path: "/hooks/use-state", name: "useState", component: useState },
      { path: "/hooks/use-effect", name: "useEffect" },
      { path: "/hooks/use-memo", name: "useMemo" },
      { path: "/hooks/use-callback", name: "useCallback" },
      { path: "/hooks/use-ref", name: "useRef" },
    ],
  },
  {
    path: "state-management",
    label: "State Management",
    subPaths: [
      { path: "/redux/introduction", name: "Redux Intro" },
      { path: "/redux/toolkit", name: "Redux Toolkit" },
    ],
  },
];


function App() {
  return (
    <Suspense fallback={<Loading />}>
      <BrowserRouter>
        <AppEntry>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            {routes.map((section) =>
              section.subPaths.map((sub) => (
                <Route
                  key={sub.path}
                  path={sub.path}
                  element={
                    sub.component ? (
                      <sub.component />
                    ) : (
                      <ComingSoon pageName={sub.name} />
                    )
                  }
                />
              ))
            )}
          </Routes>
        </AppEntry>
      </BrowserRouter>
    </Suspense>
  )
}

export default App
