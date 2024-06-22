import AdminGuard from "@/components/AdminGuard";

const TablePage = () => {
  return (
    <div>
      <h1>Table Page</h1>
    </div>
  );
}

export default AdminGuard(TablePage);