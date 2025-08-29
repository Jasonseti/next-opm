"use client";
import { useState } from "react";
import { createContext, Dispatch, SetStateAction } from "react";

export interface ContextType {
  current_page: {
    state: number;
    setState: Dispatch<SetStateAction<number>>;
  };
  page_mode: {
    state: string;
    setState: Dispatch<SetStateAction<string>>;
  };
  read_mode: {
    state: string;
    setState: Dispatch<SetStateAction<string>>;
  };
  is_header_open: {
    state: boolean;
    setState: Dispatch<SetStateAction<boolean>>;
  };
  is_comment_open: {
    state: boolean;
    setState: Dispatch<SetStateAction<boolean>>;
  };
}

export const SettingsContext = createContext<ContextType>({
  current_page: {
    state: 0,
    setState: () => {},
  },
  page_mode: {
    state: "",
    setState: () => {},
  },
  read_mode: {
    state: "",
    setState: () => {},
  },
  is_header_open: {
    state: false,
    setState: () => {},
  },
  is_comment_open: {
    state: false,
    setState: () => {},
  },
});

export default function StateProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [current_page, setCurrentPage] = useState<number>(0);
  const [page_mode, setPage] = useState<string>("one-page");
  const [read_mode, setMode] = useState<string>("scroll");
  const [is_header_open, setHeaderOpen] = useState<boolean>(true);
  const [is_comment_open, setCommentOpen] = useState<boolean>(false);

  const states: ContextType = {
    current_page: { state: current_page, setState: setCurrentPage },
    page_mode: { state: page_mode, setState: setPage },
    read_mode: { state: read_mode, setState: setMode },
    is_header_open: { state: is_header_open, setState: setHeaderOpen },
    is_comment_open: { state: is_comment_open, setState: setCommentOpen },
  };
  return (
    <SettingsContext.Provider value={states}>
      {children}
    </SettingsContext.Provider>
  );
}
