import { Box } from "@mui/material";
import PaymentsItem from "../../components/Payments/PaymentsItem";
import Sidebar from "@/components/Sidebar/Sidebar";

const Payments = () => {
  const examplePayments = [
    {
      date: "2023/10/01",
      amount: 200000,
      payTo: "علی رضایی",
      description: "دوره ۱ ماهه",
    },
    {
      date: "2025/05/03",
      amount: 150000,
      payTo: "محمد احمدی",
      description: "دوره ۳ ماهه",
    },
    {
      date: "2024/12/15",
      amount: 300000,
      payTo: "زهرا کریمی",
      description: "دوره ۶ ماهه",
    },
  ];

  return (
    <>
      {/* <Header/> */}
      <Box sx={{ display: "flex" }}>
        <Sidebar />
        <Box sx={{ flexGrow: 1, padding: "50px" }}>
          {examplePayments.map((payment) => (
            <PaymentsItem {...payment} />
          ))}
        </Box>
      </Box>
    </>
  );
};

export default Payments;
