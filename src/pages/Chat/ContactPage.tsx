import React, { useEffect, useRef } from "react";
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
import { getUserInfo } from "@/services/auth";
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
import { useChatService } from "@/contexts/ChatServiceContext";
import { useContacts } from "@/contexts/ContactsContext";

const ContactPage: React.FC = () => {
  const navigate = useNavigate();
  const chatService = useChatService();
  const chatServiceRef = useRef(chatService);
  const {
    contacts,
    loading,
    pageIndex,
    setPageIndex,
    totalPages,
    search,
    setSearch,
    onlineContactIds,
    setOnlineContactIds,
    updateOnlineStatus,
  } = useContacts();

  // Setup ChatService and handlers for online contacts and status changes
  useEffect(() => {
    chatServiceRef.current = chatService;

    chatService.onReceiveOnlineContacts((ids) => {
      setOnlineContactIds(ids);
    });

    chatService.onReceiveUserStatusChange((userId, isOnline) => {
      updateOnlineStatus(userId, isOnline);
    });
  }, [chatService, setOnlineContactIds, updateOnlineStatus]);

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
            contacts.map((contact: ContactsItemProps) => (
              <ContactsItem
                key={contact.contactId}
                contactId={contact.contactId}
                contactName={contact.contactName}
                lastMessage={contact.lastMessage}
                picName={contact.picName}
                contactProfilePicUrl={contact.contactProfilePicUrl}
                online={onlineContactIds.includes(contact.contactId)}
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
