import { Button } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Pagination from "@mui/material/Pagination";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { useState } from "react";

export default function Home() {

    const [page, setPage] = useState(1);
    const ordersData = [
      { id: "A001", user: "John D.", product: "Widget A", status: "Delivered", total: "₹799", date: "12 Jul 2025" },
      { id: "A002", user: "Sarah K.", product: "Gadget B", status: "Pending", total: "₹1,299", date: "12 Jul 2025" },
      { id: "A003", user: "Michael B.", product: "Tool C", status: "Cancelled", total: "₹1,999", date: "11 Jul 2025" },
    ];
    
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
        <TableContainer component={Paper} className="bg-gray-900">
          <Table size="small">
            <TableHead>
              <TableRow>
                {["Order ID", "User", "Product", "Status", "Total", "Date"].map(
                  (header) => (
                    <TableCell key={header} sx={{ color: "#e5e7eb" }}>
                      {header}
                    </TableCell>
                  )
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              {ordersData.map((order) => (
                <TableRow key={order.id}>
                  <TableCell sx={{ color: "#e5e7eb" }}>{order.id}</TableCell>
                  <TableCell sx={{ color: "#e5e7eb" }}>{order.user}</TableCell>
                  <TableCell sx={{ color: "#e5e7eb" }}>
                    {order.product}
                  </TableCell>
                  <TableCell sx={{ color: "#e5e7eb" }}>
                    {order.status}
                  </TableCell>
                  <TableCell sx={{ color: "#e5e7eb" }}>{order.total}</TableCell>
                  <TableCell sx={{ color: "#e5e7eb" }}>{order.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <div className="flex justify-end mt-3">
          <Pagination
            count={5}
            page={page}
            onChange={(e, val) => setPage(val)}
            color="primary"
          />
        </div>
      </div>

      {/* Category Pie Chart */}
      <div className="bg-gray-800 rounded-xl p-6 max-w-xl mx-auto">
        <h2 className="text-xl font-semibold mb-4 text-white">
          Product Categories
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={categoryData}
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
              label
            >
              {categoryData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
