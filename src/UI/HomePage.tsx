import { Navigate } from "react-router-dom";
import { useGroupRole } from "../hooks/account/useGroup";
import useUser from "../hooks/account/useUser";
import { HttpStatusCode } from "axios";

export default function HomePage() {
  const { data: currentUser, isFetching: currentUserIsFetching } = useUser();
  const { data: groupRoles, isFetching: groupRolesIsFetching } = useGroupRole();

  const decideEntrypoint = () => {
    if (currentUser?.data.email && groupRoles?.data) {
      return <Navigate to={'/join-create-group'} />;
    } else if (currentUserIsFetching || groupRolesIsFetching) {
      return <>Redirecting ...</>;
    } else if (currentUser?.status !== HttpStatusCode.Ok) {
      return <Navigate to={'/login'} />;
    } else if (groupRoles?.status !== HttpStatusCode.Ok || !(groupRoles?.data)) {
      return <Navigate to={'/join-create-group'} />;
    }
  };

  return decideEntrypoint();
}
