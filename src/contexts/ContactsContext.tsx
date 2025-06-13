import React, { createContext, useContext, useState, useEffect } from "react";
import { getContacts } from "@/services/chat";
import { getToken } from "@/services/auth";
import type { ContactsItemProps } from "@/components/Chat/ContactsItem";

const PAGE_SIZE = 10;

interface ContactsContextType {
  contacts: ContactsItemProps[];
  loading: boolean;
  pageIndex: number;
  setPageIndex: (page: number) => void;
  totalPages: number;
  search: string;
  setSearch: (s: string) => void;
  refreshContacts: () => void;
}

const ContactsContext = createContext<ContactsContextType | undefined>(
  undefined
);

export const useContacts = () => {
  const context = useContext(ContactsContext);
  if (!context)
    throw new Error("useContacts must be used within a ContactsProvider");
  return context;
};

export const ContactsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [contacts, setContacts] = useState<ContactsItemProps[]>([]);
  const [loading, setLoading] = useState(false);
  const [pageIndex, setPageIndex] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");

  const fetchContacts = async (page = pageIndex, searchValue = search) => {
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
    } catch {
      setContacts([]);
      setTotalPages(1);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts(pageIndex, search);
  }, [pageIndex, search]);

  return (
    <ContactsContext.Provider
      value={{
        contacts,
        loading,
        pageIndex,
        setPageIndex,
        totalPages,
        search,
        setSearch,
        refreshContacts: fetchContacts,
      }}
    >
      {children}
    </ContactsContext.Provider>
  );
};
