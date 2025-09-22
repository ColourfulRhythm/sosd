import AdminNavbar from '@/components/AdminNavbar/index'
const AdminLayout = ({ children }) => {
    return (
      <div>
        <AdminNavbar />
        {children}
      </div>
    );
  };
  
  export default AdminLayout;
  