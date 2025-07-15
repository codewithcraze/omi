import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const AppEntry = ({ children }) => {
  const [dropdown, setDropdown] = useState("hooks");

  const routes = [
    {
      path: "hooks",
      label: "Hooks",
      subPaths: [
        { path: "/hooks/use-state", name: "useState" },
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

  return (
    <div className="row m-1">
      <div className="col-lg-2 col-md-4">
        <ol className="list-unstyled">
          {routes.map((route) => (
            <li key={route.path} className="nav-item nav-buttons">
              <div
                className="nav-link"
                onClick={() =>
                  setDropdown((prev) => (prev === route.path ? "" : route.path))
                }
              >
               <b> {route.label} </b>
              </div>

              <AnimatePresence initial={false}>
                {dropdown === route.path && (
                  <motion.div
                    key={route.path}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ol className=" m-2">
                      {route.subPaths.map((sub) => (
                        <li key={sub.path}>
                          <Link to={sub.path} >
                            <b>{sub.name}</b>
                          </Link>
                        </li>
                      ))}
                    </ol>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>
          ))}
        </ol>
      </div>

      <div className="col-lg-10 col-md-8">{children}</div>
    </div>
  );
};

export default AppEntry;
