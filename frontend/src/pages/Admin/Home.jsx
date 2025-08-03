import { Button, TableFooter, TablePagination } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Pagination from "@mui/material/Pagination";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, BarChart, Bar, Legend, YAxis, XAxis, CartesianGrid } from "recharts";
import { useEffect, useState } from "react";
import { useLoader } from "../../contexts/LoaderContext";
import { FetchAllOrdersAdmin } from "../../apis/order"
import { getChartData } from "../../apis/category";

export default function Home() {

    const [page, setPage] = useState(0);
     const [rowsPerPage, setrowsPerPage] = useState(10);
    const ordersData = [
      { id: "A001", user: "John D.", product: "Widget A", status: "Delivered", total: "₹799", date: "12 Jul 2025" },
      { id: "A002", user: "Sarah K.", product: "Gadget B", status: "Pending", total: "₹1,299", date: "12 Jul 2025" },
      { id: "A003", user: "Michael B.", product: "Tool C", status: "Cancelled", total: "₹1,999", date: "11 Jul 2025" },
    ];
    const [orders, setOrders] = useState([]);
    const [totalUsers, setTotalUsers] = useState(0);
    const [totalProducts, setTotalProducts] = useState(0);
    const [totalOrdersToday, setTotalOrdersToday] = useState(0);
    const [chartData, setChartData] = useState([]);

    const statusColors = {
    pending: "bg-yellow-100 text-yellow-800",
    processing: "bg-blue-100 text-blue-800",
    packed: "bg-blue-100 text-blue-800",
    shipped: "bg-purple-100 text-purple-800",
    delivered: "bg-green-100 text-green-800",
    refunded: "bg-green-100 text-green-800",
    cancelled: "bg-red-100 text-red-800",
  };

    const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const {setLoading}=useLoader();
    
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const response=await FetchAllOrdersAdmin(1,20) 
       setLoading(false);
      if(response.success)
      {
        setOrders(response.orders);
      }
      setLoading(true);
      const response2=await getChartData()
       setLoading(false);
      if(response2.success)
      {
        setChartData(response2.products);
      }
    }
    
    fetchData();
   
  },[])
    const categoryData = [
      { name: "Electronics", value: 40 },
      { name: "Apparel", value: 25 },
      { name: "Furniture", value: 20 },
      { name: "Accessories", value: 15 },
    ];
    
    const COLORS = ["#2563eb", "#fb923c", "#6b7280", "#1e293b"];
  return (
    <div>
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { label: "Total Users", value: 1320 },
          { label: "Total Products", value: 340 },
          { label: "Orders Today", value: 56 },
          { label: "Monthly Revenue", value: "₹2.5L" },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-4 rounded-xl shadow-md">
            <p className="text-sm text-gray-400">{stat.label}</p>
            <p className="text-2xl font-bold text-white mt-1">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Orders Table */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-3 text-white">Recent Orders</h2>
        <TableContainer component={Paper} className="bg-gray-900" sx={{
          padding: "12px",
          
          border: "none",
          marginTop: "16px",
        }}>
          <Table size="small">
            <TableHead>
              <TableRow>
                {["Order ID", "Customer Name", "Total Items", "Status", "Total Price", "Date Ordered"].map(
                  (header) => (
                    <TableCell key={header} sx={{padding:"6px 12px"}}>
                     <span className="!text-xs md:!text-sm font-semibold text-gray-800">{header}</span>
                    </TableCell>
                  )
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              {orders && orders.length>0 && orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell sx={{padding:"6px 12px"}}><span className="!text-xs md:!text-sm font-medium text-gray-800">{order._id}</span></TableCell>
                  <TableCell sx={{padding:"6px 12px"}}><span className="!text-xs md:!text-sm font-medium text-gray-800">{order.userName}</span></TableCell>
                  <TableCell sx={{padding:"6px 12px"}}>
                    <span className="!text-xs md:!text-sm font-medium text-gray-800">{order.totalItems}</span>
                  </TableCell>
                  <TableCell sx={{padding:"6px 12px"}}>
                    <span className={`!text-xs font-medium ${statusColors[order.status.toLowerCase()]} px-2 py-1 rounded-md`}>{order.status}</span>
                  </TableCell>
                  <TableCell sx={{padding:"6px 12px"}}><span className="!text-xs md:!text-sm font-medium text-gray-800">{(order.totalPrice).toFixed(2)}</span></TableCell>
                  <TableCell sx={{padding:"6px 12px"}}><span className="!text-xs md:!text-sm font-medium text-gray-800">{new Date(order.createdAt).getDay()}/{new Date(order.createdAt).getMonth()+1}/{new Date(order.createdAt).getFullYear()}</span></TableCell>
                </TableRow>
              ))}
            </TableBody>
            {/* <TableFooter>
                        <TableRow >
                          <TablePagination
                            count={ordersData.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            rowsPerPageOptions={[]}
                            labelRowsPerPage={""}
                            className="centered-pagination"
                            colSpan={6}
                            
                          />
                        </TableRow>
                      </TableFooter> */}
          </Table>
        </TableContainer>
  
      </div>

      {/* Category Pie Chart */}
      <div className="rounded-xl p-6 px-0 mx-auto w-full">
        <h2 className="text-xl font-semibold mb-4 text-white">
          Product Categories Distribution
        </h2>
        {chartData && (
  <ResponsiveContainer width="100%" height={1000}>
  <BarChart
    data={chartData}
    layout="vertical"
    margin={{
      top: 20,
      right: 30,
      
      bottom: 20,
    }}
  >
    <CartesianGrid strokeDasharray="3 3" />
    
    <XAxis 
      type="number"
      tick={{ fontSize: 12 }} // text-xs
      label={{ fontSize: 12 }}
    />
    
    <YAxis 
      dataKey="name"
      type="category"
      tick={{ fontSize: 12 }} // text-xs
      label={{ fontSize: 12 }}
      width={200}
    />
    
    <Tooltip 
      contentStyle={{ fontSize: 12 }} // text-xs
      itemStyle={{ fontSize: 12 }}
      labelStyle={{ fontSize: 12 }}
    />
    
    <Legend 
      wrapperStyle={{ fontSize: 12 }} // text-xs
    />
    
    <Bar 
      dataKey="productCount" 
      fill="#2563eb" 
      label={{ fontSize: 12 }} // optional, if you're showing bar labels
    />
  </BarChart>
</ResponsiveContainer>


)}
      </div>
    </div>
  );
}
