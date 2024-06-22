import AdminGuard from "@/components/AdminGuard";
import useCourses from "@/hooks/useCourses";
import Loading from "@/components/Loading";
import {getLectureTimings} from "@/utils/table";

const TablePage = () => {
  const {data, isLoading, error} = useCourses('202433');

  if (isLoading) {
    return <Loading/>
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  const timings = getLectureTimings(data.howdy, data.studentsCourses)
  console.log(timings)

  return (
    <div>
      <h1>Table Page</h1>
    </div>
  );
}

export default AdminGuard(TablePage);