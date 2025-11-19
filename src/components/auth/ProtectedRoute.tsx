import { Navigate, Outlet } from "react-router-dom";
import { useGetProfile } from "@/hooks/queries/useProfileQuery";

const ProtectedRoute = () => {
  const { data: user, isLoading } = useGetProfile();

  if (isLoading) return <div>Loading...</div>;

  if (!user) return <Navigate to="/login" replace />;

  if(user.data.role !== 'ADMIN') return <Navigate to="/" replace />

  return <Outlet context={{ user }} />;
};

export default ProtectedRoute;
