import AdminGuard from "@/components/AdminGuard";
import {useAuth} from "@/hooks/AuthContext";

const TablePage = () => {
  return (
    <div>
      <h1>Table Page</h1>
    </div>
  );
}

export default AdminGuard(TablePage);