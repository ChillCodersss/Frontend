import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Box,
  Typography,
  List,
  TextField,
  InputAdornment,
  IconButton,
  Divider,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ContactsItem from "@/components/Chat/ContactsItem";

const contactsData = [
  {
    id: 1,
    name: "هومن متین",
    lastMessage: "سلام چطوری شما چه خبرا",
    avatar: "",
    online: true,
    active: true,
  },
  {
    id: 2,
    name: "مهیار نیاوند",
    lastMessage: "دوره خوبی رو با هم گذروندیم",
    avatar: "",
    online: false,
    active: false,
  },
];

const ContactPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [search, setSearch] = useState("");
  const [contacts] = useState(contactsData);

  const filteredContacts = contacts.filter((contact) =>
    contact.name.includes(search)
  );

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        padding: "20px",
        boxSizing: "border-box",
      }}
    >
      <Typography
        variant="h6"
        sx={{ marginBottom: "16px", textAlign: "center" }}
      >
        مشاوران من
      </Typography>
      <TextField
        fullWidth
        placeholder="جستجو..."
        value={search}
        dir="rtl"
        onChange={(e) => setSearch(e.target.value)}
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
        sx={{ marginBottom: "16px" }}
      />
      <Divider sx={{ marginBottom: "16px" }} />
      <Box sx={{ flex: 1, overflowY: "auto" }}>
        <List>
          {filteredContacts.length === 0 ? (
            <Typography sx={{ textAlign: "center", marginTop: "16px" }}>
              هیچ مشاوری ندارید.
            </Typography>
          ) : (
            filteredContacts.map((contact) => (
              <ContactsItem
                key={contact.id}
                {...contact}
                onClick={() => {
                  if (location.pathname === "/dashboard/student-contacts") {
                    navigate(`/dashboard/student-chat/${contact.id}`);
                  } else if (
                    location.pathname === "/dashboard/counselor-contacts"
                  ) {
                    navigate(`/dashboard/counselor-chat/${contact.id}`);
                  }
                }}
              />
            ))
          )}
        </List>
      </Box>
    </Box>
  );
};

export default ContactPage;
