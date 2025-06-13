import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  List,
  TextField,
  InputAdornment,
  IconButton,
  Divider,
  CircularProgress,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ContactsItem, {
  ContactsItemProps,
} from "@/components/Chat/ContactsItem";
import { getContacts } from "@/services/chat";
import { getUserInfo, getToken } from "@/services/auth";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import {
  contactPageBoxStyle,
  contactPageTitleStyle,
  contactPageTextFieldStyle,
  contactPageDividerStyle,
  contactPageListBoxStyle,
  contactPagePaginationBoxStyle,
  contactPagePaginationStyle,
} from "./ContactPageStyles";

const PAGE_SIZE = 10;

const ContactPage: React.FC = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [contacts, setContacts] = useState<ContactsItemProps[]>([]);
  const [pageIndex, setPageIndex] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchContacts = async (page = 1, searchValue = "") => {
    setLoading(true);
    try {
      const token = String(getToken());
      const response = await getContacts(token, PAGE_SIZE, page);

      if (response.isSuccess && response.value) {
        let items = response.value.items || [];

        if (searchValue) {
          items = items.filter((c: ContactsItemProps) =>
            c.contactName.includes(searchValue)
          );
        }
        setContacts(items);
        setTotalPages(response.value.totalPages || 1);
      } else {
        setContacts([]);
        setTotalPages(1);
      }
    } catch (error) {
      console.error("Error fetching contacts:", error);
      setContacts([]);
      setTotalPages(1);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts(pageIndex, search);
  }, [pageIndex, search]);

  // const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
  //   setPageIndex(value);
  // };

  function toPersianNumber(num: number | string) {
    return String(num).replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[parseInt(d, 10)]);
  }

  return (
    <Box sx={contactPageBoxStyle}>
      <Typography variant="h6" sx={contactPageTitleStyle}>
        مشاوران من
      </Typography>
      <TextField
        fullWidth
        placeholder="جستجو..."
        value={search}
        dir="rtl"
        onChange={(e) => {
          setSearch(e.target.value);
          setPageIndex(1); // Reset to first page on search
        }}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <IconButton>
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
          },
        }}
        sx={contactPageTextFieldStyle}
      />
      <Divider sx={contactPageDividerStyle} />
      <Box sx={contactPageListBoxStyle}>
        <List>
          {loading ? (
            <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
              <CircularProgress size={24} />
            </Box>
          ) : contacts.length === 0 ? (
            <Typography sx={{ textAlign: "center", marginTop: "16px" }}>
              هیچ مخاطبی ندارید.
            </Typography>
          ) : (
            contacts.map((contact) => (
              <ContactsItem
                key={contact.contactId}
                contactId={contact.contactId}
                contactName={contact.contactName}
                lastMessage={contact.lastMessage}
                picName={contact.picName}
                contactProfilePicUrl={contact.contactProfilePicUrl}
                onClick={() => {
                  if (getUserInfo()?.role === "Counselor") {
                    navigate(`/dashboard/counselor-chat/${contact.contactId}`);
                  } else if (getUserInfo()?.role === "Student") {
                    navigate(`/dashboard/student-chat/${contact.contactId}`);
                  }
                }}
              />
            ))
          )}
        </List>
      </Box>
      <Box sx={contactPagePaginationBoxStyle}>
        <Pagination
          dir="rtl"
          count={totalPages}
          page={pageIndex}
          onChange={(_, value) => setPageIndex(value)}
          renderItem={(item) => (
            <PaginationItem
              {...item}
              page={item.page ? toPersianNumber(item.page) : undefined}
            />
          )}
          sx={contactPagePaginationStyle}
          color="primary"
        />
      </Box>
    </Box>
  );
};

export default ContactPage;
