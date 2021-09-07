import { Breadcrumb, BreadcrumbItem } from "@patternfly/react-core";
import { useLocation, Link } from "react-router-dom";
import useConfig from "../hooks/useConfig";

function capitalizeFirstLetter(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export default () => {

  const { setWebsiteConfig } = useConfig();
  const location = useLocation();
  const paths = location.pathname.replace(/^\//i, "").split("/");

  const handleClick = () => {
    setWebsiteConfig({ name: "" });
  };

  return (
    <Breadcrumb>
      <BreadcrumbItem>
        <Link to="/" onClick={handleClick}>Home</Link>
      </BreadcrumbItem>
      {paths &&
        paths.map((path, index) => {
          const isActive = index + 1 === paths.length;
          return (
            <BreadcrumbItem key={`${path}-${index}`} isActive={isActive}>
              {isActive ? (
                capitalizeFirstLetter(path)
              ) : (
                <Link to={getPath(paths, index, location.pathname)}>{capitalizeFirstLetter(path)}</Link>
              )}
            </BreadcrumbItem>
          );
        })}
    </Breadcrumb>
  );
};
function getPath(paths: string[], index: number, location: string) {
  const path = `/${paths.slice(0, index + 1).join("/")}`;

  if (path.includes("spaName")) {
    return path + location.slice(location.lastIndexOf("/"), location.length);
  }

  if (path.includes("property")) {
    return path + location.slice(location.lastIndexOf("/"), location.length);
  }

  return path;
}


