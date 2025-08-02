import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import sampleImage from "../assets/images/productImages/product2.jpg";
import { TableFooter, TablePagination } from "@mui/material";
import React, { useEffect, useState } from "react";
import CardDisplay from "../components/CardDisplay";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { getCart, RemoveCartItem, upDateCartItem } from "../apis/cart";
import { useLoader } from "../contexts/LoaderContext";
import { useAlert } from "../contexts/AlertContext";
import { getProductDetails } from "../apis/products";

const data = [
  {
    id: 1,
    name: "BONEX Eco 1.5 sq.mm 1 Core Flame Retardant House Wires Blue",
    description: "Roll of 90 m",
    image: "https://example.com/images/bonex-wire.jpg", // replace with actual image URL
    originalPrice: 2360,
    discountedPrice: 1651,
    quantity: 1,
    codEligible: false,
  },
  {
    id: 2,
    name: "Polycab 2.5 sq.mm Flame Retardant House Wire Red",
    description: "Roll of 90 m",
    image: "https://example.com/images/polycab-red.jpg",
    originalPrice: 2450,
    discountedPrice: 1799,
    quantity: 2,
    codEligible: true,
  },
  {
    id: 3,
    name: "Finolex 4 sq.mm Single Core Copper Wire Green",
    description: "Roll of 90 m",
    image: "https://example.com/images/finolex-green.jpg",
    originalPrice: 3650,
    discountedPrice: 2890,
    quantity: 1,
    codEligible: false,
  },
];
const dummydata2 = [
  {
    title: "Logitech Wireless Mouse M235",
    brand: "Logitech",
    price: 799,
    image: "https://m.media-amazon.com/images/I/61LtuGzXeaL._SX679_.jpg",
    rating: 4.2,
  },
  {
    title: "HP Wired USB Keyboard K1500",
    brand: "HP",
    price: 499,
    image: "https://m.media-amazon.com/images/I/81IbI6vO7GL._SX679_.jpg",
    rating: 3.8,
  },
  {
    title: "Samsung 64GB EVO microSD Card",
    brand: "Samsung",
    price: 699,
    image: "https://m.media-amazon.com/images/I/71wG2k-eY-L._SX679_.jpg",
    rating: 4.6,
  },
  {
    title: "Sony MDR-ZX110A Wired Headphones",
    brand: "Sony",
    price: 1099,
    image: "https://m.media-amazon.com/images/I/71m3VdyxvLL._SX679_.jpg",
    rating: 4.0,
  },
  {
    title: "TP-Link WiFi Router TL-WR841N",
    brand: "TP-Link",
    price: 1199,
    image: "https://m.media-amazon.com/images/I/61LtuGzXeaL._SX679_.jpg",
    rating: 4.1,
  },
  {
    title: "Zebronics Zeb-Rush Gaming Keyboard",
    brand: "Zebronics",
    price: 849,
    image: "https://m.media-amazon.com/images/I/51KeYwBBTkL._SX679_.jpg",
    rating: 3.9,
  },
  {
    title: "boAt Bassheads 100 Wired Earphones",
    brand: "boAt",
    price: 449,
    image: "https://m.media-amazon.com/images/I/61+Q6Rh3OQL._SX679_.jpg",
    rating: 4.3,
  },
  {
    title: "Dell 15.6 Inch Laptop Backpack",
    brand: "Dell",
    price: 999,
    image: "https://m.media-amazon.com/images/I/61Q93pD-ZnL._SX679_.jpg",
    rating: 4.5,
  },
];

const dummydata1 = [
  {
    title: "Duracell AAA Batteries (Pack of 10)",
    brand: "Duracell",
    price: 179,
    rating: 3.5,
    discountedPrice: 149,
    discountPercentage: 16.0,
    image: "https://m.media-amazon.com/images/I/81o1qXrjRLL._SX679_.jpg",
  },
  {
    title: "WD-40 Multipurpose Spray 420ml",
    brand: "WD-40",
    price: 353,
    rating: 4.0,
    discountedPrice: 299,
    discountPercentage: 15.3,
    image: "https://m.media-amazon.com/images/I/61v51tdU2RL._SX679_.jpg",
  },
  {
    title: "Box Index Files (Pack of 8)",
    brand: "IB BASICS",
    discountedPrice: 399,
    discountPercentage: 9.1,
    rating: 4.2,
    price: 439,
    image: "https://m.media-amazon.com/images/I/81My9owuZuL._SX679_.jpg",
  },
  {
    title: "Generic 12A Black Cartridge",
    brand: "GENERIC",
    price: 339,
    image: "https://m.media-amazon.com/images/I/71Z3-+a3bpL._SX679_.jpg",
  },
  {
    title: "Cello Ball Pens (Pack of 25)",
    brand: "GENERIC",
    price: 99,
    image: "https://m.media-amazon.com/images/I/61-vv9kdzpL._SX679_.jpg",
  },
];

function Cartpage() {
  const navigate = useNavigate();
  const [cartPage, setcartPage] = useState(0);
  const [rowsPerPage, setrowsPerPage] = useState(5);

  const {
    user,
    setUser,
    cart,
    setCart,
    cartCount,
    setCartCount,
    cartDetails,
    setCartDetails,
  } = useAuth();
  const { setMessage, setShowSnackBar } = useAlert();
  const { setLoading } = useLoader();
  const [checkPin, setcheckPin] = useState({
    data: {
      pincode: 211016,
      city: "Allahabad",
      shippingCharge: 0,
      deliveryDate: "Tue Jul 22 2025",
    },
    visible: false,
  });

  const handleChangePage = (event, newPage) => {
    setcartPage(newPage);
  };

  const handleIncreaseQuantity = async (product) => {
    const checkStock = await getProductDetails(product.productId);
    if (checkStock.product.stock < product.quantity + 1) {
      setMessage("Product is out of stock");
      setShowSnackBar(true);
      return;
    }
    const response = await upDateCartItem({
      ...product,
      quantity: product.quantity + 1,
    });
    if (response.success) {
      setCart(response.cart);
      setCartDetails({
        totalItems: response.totalItems,
        totalGst: response.totalGst,
        totalPrice: response.totalPrice,
      });
      setCartCount(response.totalItems);

      setCartCount(response.totalItems);
    }
  };
  const handleDecreaseQuantity = async (product) => {
    if (product.quantity === 1) {
      const response = await RemoveCartItem(product);
      if (response.success) {
        setCart(response.cart);
        setCartDetails({
          totalItems: response.totalItems,
          totalGst: response.totalGst,
          totalPrice: response.totalPrice,
        });
        setCartCount(response.totalItems);

        setCartCount(response.totalItems);
      }

      return;
    }
    const response = await upDateCartItem({
      ...product,
      quantity: product.quantity - 1,
    });

    if (response.success) {
      setCart(response.cart);
      setCartDetails({
        totalItems: response.totalItems,
        totalGst: response.totalGst,
        totalPrice: response.totalPrice,
      });
      setCartCount(response.totalItems);

      setCartCount(response.totalItems);
    }
  };

  const handleRemoveItem = async (product) => {
    const response = await RemoveCartItem(product);
    if (response.success) {
      setCart(response.cart);
      setCartDetails({
        totalItems: response.totalItems,
        totalGst: response.totalGst,
        totalPrice: response.totalPrice,
      });
      setCartCount(response.totalItems);

      setCartCount(response.totalItems);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await getCart();
      if (response.success) {
        setCart(response.cart);
        setCartDetails({
          totalItems: response.totalItems,
          totalGst: response.totalGst,
          totalPrice: response.totalPrice,
        });
        setCartCount(response.totalItems);
      }
    };
    setLoading(true);
    fetchData();
    setLoading(false);
  }, []);

  return (
    <div className="flex flex-col md:flex-row p-2 mt-2 md:m-0 md:p-6 gap-2 md:h-screen">
      {/* Left Div */}
      <div className=" flex flex-col gap-4 p-2 w-full md:mb-8 md:w-3/4 md:overflow-y-auto hide-scroll">
        <p className="!text-sm !text-gray-500 font-semibold">
          {`My Cart (${cart?.length || 0}) items`}
        </p>
        {/* Cart Table */}
        <div className="flex w-full ">
          <TableContainer
            component={Paper}
            sx={{
              backgroundColor: "#f5f5f5",
              boxShadow: "none",
              border: "none",
            }}
          >
            <Table sx={{}} aria-label="simple table">
              <TableBody>
                {cart &&
                  cart.length > 0 &&
                  cart
                    .slice(
                      cartPage * rowsPerPage,
                      cartPage * rowsPerPage + rowsPerPage
                    )
                    .map((item) => (
                      <TableRow
                        key={item.id}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                          backgroundColor: "#f5f5f5",
                          boxShadow: "none",
                          border: "none",
                        }}
                      >
                        <TableCell
                          align="left"
                          sx={{
                            backgroundColor: "#f5f5f5",
                            boxShadow: "none",
                            border: "none",
                            padding: "8px",
                          }}
                        >
                          <div className="flex flex-wrap gap-2 md:gap-0 items-center justify-between bg-white md:p-4 p-3 rounded-md shadow-sm">
                            {/* Product Info */}
                            <div className="flex gap-4 lg:w-1/2 ">
                              <img
                                src={item?.image || null} // replace with actual image URL
                                alt={item.name}
                                className="w-20 h-20 object-contain"
                              />
                              <div>
                                <h2 className="font-semibold !text-xs md:!text-sm">
                                  {item?.productName} <br />
                                </h2>
                                <div className="flex items-center gap-2 mt-2 md:mt-1">
                                  <span className="text-gray-700 font-medium !text-xs md:!text-sm">
                                    ₹ {parseFloat(item?.price).toFixed(2) || 0}
                                  </span>
                                  {/* <span className="font-bold !text-xs md:!text-md">
                                    ₹{item?.discountedPrice || 0}
                                  </span> */}
                                </div>
                                {/* {item.codEligible ? null : (
                                  <p className="!text-orange-500 border border-red-300 !bg-orange-50 !text-[0.6rem] md:!text-xs md:px-2 py-1 px-1 rounded mt-2 inline-block">
                                    This item is not eligible for Cash On
                                    Delivery.
                                  </p>
                                )} */}
                              </div>
                            </div>

                            {/* Quantity and Price */}
                            {/* <div className="flex flex-col items-end gap-2"> */}
                            <div className="flex items-center rounded bg-gray-100 p-1 items-center">
                              <button
                                onClick={() => handleDecreaseQuantity(item)}
                                className="px-2 text-md md:text-xl text-gray-600 bg-white"
                              >
                                −
                              </button>
                              <span className="px-3 md:py-1 !text-xs md:!text-sm">
                                {item?.quantity || 0}
                              </span>
                              <button
                                onClick={() => handleIncreaseQuantity(item)}
                                className="px-2 text-md md:text-xl text-gray-600 bg-white"
                              >
                                +
                              </button>
                            </div>
                            <div className="md:text-right">
                              <div className="text-md md:text-lg font-bold">
                                {parseFloat(item?.subtotal).toFixed(2) || 0}
                              </div>
                              <button className="relative group !text-xs text-gray-500 underline">
                                Price Details
                                <div className="absolute left-0 top-4 w-40 bg-white p-2 rounded border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
                                  <div className="flex justify-between  text-gray-700 mb-2">
                                    <span className="!text-xs">
                                      Selling Price
                                    </span>
                                    <span className="!text-xs">
                                      ₹
                                      {parseFloat(
                                        (item?.price * item?.quantity)
                                      ).toFixed(
                                          2
                                        ) || 0}
                                    </span>
                                  </div>
                                  <div className="flex justify-between text-gray-700 mb-2">
                                    <span className="!text-xs">
                                      GST@ {item?.gstPercentage || 0}%
                                    </span>
                                    <span className="!text-xs">
                                      +₹{parseFloat(item?.gst).toFixed(2) || 0}
                                    </span>
                                  </div>
                                  <hr className="my-2 text-gray-400" />
                                  <div className="flex justify-between font-semibold text-green-700">
                                    <span className="!text-xs">
                                      Final Price
                                    </span>
                                    <span className="!text-xs">
                                      ₹
                                      {parseFloat(item?.subtotal).toFixed(2) ||
                                        0}
                                    </span>
                                  </div>
                                </div>
                              </button>
                            </div>
                            {/* </div> */}

                            {/* Close Button */}
                            <button
                              onClick={() => handleRemoveItem(item)}
                              className="text-gray-400 hover:text-red-500 text-lg"
                            >
                              <i class="ri-delete-bin-line text-gray-500"></i>
                            </button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TablePagination
                    count={cart.length || 0}
                    rowsPerPage={rowsPerPage}
                    page={cartPage}
                    onPageChange={handleChangePage}
                    rowsPerPageOptions={[]}
                    labelRowsPerPage={""}
                  />
                </TableRow>
              </TableFooter>
            </Table>
          </TableContainer>
        </div>
        {/* Cart Table ends */}

        <div className="w-full hidden md:flex">
          {/* {Recommended for you} */}

          <CardDisplay title="RECOMMENDED FOR YOU" data={dummydata2} />
          {/* {Recommended for you end} */}
        </div>
        <div className="w-full hidden md:flex">
          {/* {BEST SELLERS} */}
          <CardDisplay title="BEST SELLERS" data={dummydata1} />
          {/* {BEST SELLERS end} */}
        </div>
      </div>
      {/* Left Div ends */}

      {/* Right Div */}
      <div className="md:w-80 rounded-md md:h-screen flex flex-col gap-4 p-2">
        {/* {Check Shipping Charge} */}
        <div className="flex flex-col gap-2 bg-white rounded-md shadow-md p-4">
          <span className="!text-sm font-semibold">
            <i class="ri-map-pin-line mr-1"></i> Estimated Shipping Charges
          </span>

          <div className="flex flex-row"></div>

          <div className="flex flex-row border border-gray-300 p-1 rounded-sm justify-between w-full">
            <input
              className="text-gray-500 !text-xs md:!text-sm border-none w-full p-2 outline-none"
              type="text"
              placeholder="Enter Pincode"
            ></input>
            <button
              className="bg-orange-600 !text-xs md:!text-sm text-white md:py-2 px-4 rounded-sm"
              onClick={() => setcheckPin({ ...checkPin, visible: true })}
            >
              Check
            </button>
          </div>
          {checkPin.visible && (
            <p className="!text-xs md:!text-sm !text-gray-500">
              Shipping Charges may Apply
            </p>
          )}
        </div>
        {/* {Check Shipping Charge end} */}

        {/* Payment Summary */}
        <div className="bg-white p-4 max-w-sm rounded-sm shadow-md">
          <p className="!font-semibold !text-sm mb-2">
            Payment Summary{" "}
            <span className="!text-sm">
              ({cartDetails?.totalItems?.toFixed(0) || 0} Items)
            </span>
          </p>
          <hr className="mb-2" />

          <div className="flex justify-between mb-1">
            <span className="!text-gray-800 !text-xs">Total Selling Price</span>
            <span className="!font-semibold !text-xs">
              ₹
              {(cartDetails?.totalPrice - cartDetails?.totalGst).toFixed(2) ||
                0}
            </span>
          </div>

          <div className="flex justify-between mb-1">
            <span className="!text-gray-800 !text-xs">GST Amount</span>
            <span className="!font-semibold !text-xs">
              +₹{cartDetails?.totalGst?.toFixed(2) || 0}
            </span>
          </div>

          <div className="flex justify-between mb-2">
            <span className="!text-gray-800 !text-xs">Shipping charges</span>
            <span className="!text-green-600 !text-xs !font-semibold">
              Free
            </span>
          </div>

          <hr className="my-2" />

          <div className="flex justify-between">
            <span className="!text-sm !font-bold">Amount Payable</span>
            <span className="!text-sm !font-bold">
              ₹{cartDetails?.totalPrice?.toFixed(2) || 0}
            </span>
          </div>
        </div>
        {/* Payment Summary  end*/}
        {/* <button className="bg-orange-600 !text-sm text-white w-full p-2 rounded-sm shadow-md" onClick={()=>navigate('/login')}>LOGIN TO PLACE ORDER</button>                */}
        {
          cart.length==0?<button disabled className="bg-gray-200 !text-sm text-gray-500 w-full p-2 rounded-sm shadow-md disabled">
            PLACE ORDER
          </button>:<button
          className="bg-orange-600 !text-sm text-white w-full p-2 rounded-sm shadow-md"
          onClick={() => navigate("/order/address")}
        >
          PLACE ORDER
        </button>
        }
        
      </div>
      {/* Right Div ends */}
    </div>
  );
}

export default Cartpage;
