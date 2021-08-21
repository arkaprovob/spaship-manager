import { useRouteMatch, Link } from "react-router-dom";
import { Brand, Nav, NavItem, NavList, Stack, StackItem } from "@patternfly/react-core";
import { ApplicationsIcon, TopologyIcon, ServerIcon, KeyIcon } from "@patternfly/react-icons";
import { StyledHeader } from "./Header";
import UserStatus from "./UserStatus";
import Logo from "../static/img/logo.svg";
import Namespace from "./Namespace";
import useConfig from "../hooks/useConfig";

export default () => {
  const {website, spa} = useConfig();
  return (
    <Stack height="100%">
      <StackItem>
        <StyledHeader logo={<Brand src={Logo} alt="SPAship Logo" />} />
      </StackItem>
      <StackItem>
        <Namespace />
      </StackItem>
      <StackItem isFilled>
        <Nav aria-label="Nav" theme="light" variant="default">
          <NavList>
            <NavItem itemId={0}  isActive={(!!useRouteMatch(`/dashboard/property/${website}`) || !!useRouteMatch(`/dashboard/${website}/spaName/${spa}`))} disabled={true}>
            <Link to={`/dashboard/property/one.redhat.com`}> 
                <ApplicationsIcon />
                Dashboard
             </Link> 
            </NavItem>
            <NavItem itemId={1} isActive={!!useRouteMatch(`/dashboard/spa/${website}`)} disabled={true} >
            <Link to={`/dashboard/spa/one.redhat.com`}> 
                <ServerIcon />
                SPA Lists
           </Link> 
            </NavItem>
            {/* <NavItem itemId={0} isActive={!!useRouteMatch(`/dashboard/property/${website?.name}`)} disabled={true}>
              <Link to={`/dashboard/property/${website?.name}`}>
                <TopologyIcon />
                Dashboard
              </Link>
            </NavItem> */}
            {/* <NavItem itemId={1} isActive={!!useRouteMatch("/applications")}>
              <Link to={`/applications`}>
                <ApplicationsIcon />
                Applications
              </Link>
            </NavItem>
            <NavItem itemId={2} isActive={!!useRouteMatch("/authentication")}>
              <Link to={`/authentication`}>
                <KeyIcon />
                Authentication
              </Link>
            </NavItem>
            <NavItem itemId={3} isActive={!!useRouteMatch("/environments")}>
              <Link to={`/environments`}>
                <ServerIcon />
                Environments
              </Link>
            </NavItem> */}
          </NavList>
        </Nav>
      </StackItem>
      <StackItem>
        <UserStatus />
      </StackItem>
    </Stack>
  );
};
