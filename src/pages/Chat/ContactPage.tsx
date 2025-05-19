import React, { useState } from "react";
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
    name: "علی رضایی",
    lastMessage: "سلام چطوری شما چه خبرا",
    avatar: "",
    online: true,
    active: true,
  },
  {
    id: 2,
    name: "مریم احمدی",
    lastMessage: "دوره خوبی رو با هم گذروندیم",
    avatar: "",
    online: false,
    active: false,
  },
];

const ContactPage: React.FC = () => {
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
        p: 2,
        boxSizing: "border-box",
      }}
    >
      <Typography variant="h6" sx={{ mb: 2, textAlign: "center" }}>
        مشاوران من
      </Typography>
      <TextField
        fullWidth
        placeholder="جستجو..."
        value={search}
        dir="rtl"
        onChange={(e) => setSearch(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <IconButton>
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
        sx={{ mb: 2 }}
      />
      <Divider sx={{ mb: 2 }} />
      <Box sx={{ flex: 1, overflowY: "auto" }}>
        <List>
          {filteredContacts.length === 0 ? (
            <Typography sx={{ textAlign: "center", mt: 2 }}>
              مخاطبی یافت نشد.
            </Typography>
          ) : (
            filteredContacts.map((contact) => (
              <ContactsItem key={contact.id} {...contact} onClick={() => {}} />
            ))
          )}
        </List>
      </Box>
    </Box>
  );
};

export default ContactPage;
