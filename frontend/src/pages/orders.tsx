import type { ReactElement } from "react";
import { useEffect, useState } from "react";
import TableHOC from "@/components/Table";
import type { Column } from "react-table";
import { Link } from "react-router-dom";

type DataType = {
  _id: string;
  amount: number;
  quantity: number;
  discount: number;
  status: ReactElement;
  action:ReactElement;
};

const column: Column<DataType>[] = [
  {
    Header: "ID",
    accessor: "_id",
  },
  {
    Header: "Quantity",
    accessor: "quantity",
  },
  {
    Header: "Discount",
    accessor: "discount",
  },
  {
    Header: "Amount",
    accessor: "amount",
  },
  {
    Header: "Status",
    accessor: "status",
  },
  {
    Header: "Action",
    accessor: "action",
  },
];
const Orders = () => {
  const [rows, setRows] = useState<DataType[]>([
    {
      _id: "1",
      amount: 4000,
      quantity: 1,
      discount: 300,
      status: <span className="text-red-500">Processing</span>,
      action: <Link className="no-underline bg-[rgba(44,104,255,0.455)] text-[rgba(44,104,255)] px-2 py-1 rounded-[10px]" to={`/order/1`}>View</Link>,
    },
  ]);
  const Table = TableHOC<DataType>(
    column,
    rows,
    "bg-white p-8 overflow-auto w-full h-full max-h-[65vh]",
    "Orders",
    rows.length > 6
  )();

  return (
    <div className="max-w-[1367px] w-full mx-auto overflow-auto px-4">
      <h1 className="text-2xl font-bold tracking-wide my-4 text-left">
        My Orders
      </h1>
      {Table}
      {/* {isLoading ? <Skeleton length={20} /> : Table} */}
    </div>
  );
};

export default Orders;
