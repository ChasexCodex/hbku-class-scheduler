import AdminGuard from "@/components/AdminGuard";
import useCourses from "@/hooks/useCourses";
import Loading from "@/components/Loading";

const TablePage = () => {
  const {data, isLoading, error} = useCourses('202433');

  if (isLoading) {
    return <Loading/>
  }


  if (error) {
    return <div>Error: {error}</div>
  }

  return (
    <div>
      <h1>Table Page</h1>
    </div>
  );
}

export default AdminGuard(TablePage);