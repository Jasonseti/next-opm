"use client";
import { useSearchParams } from "next/navigation";
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
  summary_mode: {
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
  is_report_open: {
    state: boolean;
    setState: Dispatch<SetStateAction<boolean>>;
  };
  messages: {
    state: string[];
    setState: Dispatch<SetStateAction<string[]>>;
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
  summary_mode: {
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
  is_report_open: {
    state: false,
    setState: () => {},
  },
  messages: {
    state: [],
    setState: () => {},
  },
});

export default function StateProvider({
  children,
  cookies,
}: {
  children: React.ReactNode;
  cookies: {
    page_mode?: string;
    read_mode?: string;
    summary_mode?: string;
  };
}) {
  const searchParams = useSearchParams();

  const [current_page, setCurrentPage] = useState<number>(
    searchParams.get("page")
      ? Number(searchParams.get("page")?.toString()) - 1
      : 0
  );
  const [page_mode, setPage] = useState<string>(
    cookies.page_mode || "one-page"
  );
  const [read_mode, setMode] = useState<string>(cookies.read_mode || "scroll");
  const [summary_mode, setSummaryMode] = useState<string>(
    cookies.summary_mode || "brief"
  );
  const [is_header_open, setHeaderOpen] = useState<boolean>(true);
  const [is_comment_open, setCommentOpen] = useState<boolean>(
    searchParams.get("comment")
      ? searchParams.get("comment")?.toString() === "open"
      : false
  );
  const [is_report_open, setReportOpen] = useState<boolean>(false);
  const [messages, setMessages] = useState<string[]>([]);

  const states: ContextType = {
    current_page: { state: current_page, setState: setCurrentPage },
    page_mode: { state: page_mode, setState: setPage },
    read_mode: { state: read_mode, setState: setMode },
    summary_mode: { state: summary_mode, setState: setSummaryMode },
    is_header_open: { state: is_header_open, setState: setHeaderOpen },
    is_comment_open: { state: is_comment_open, setState: setCommentOpen },
    is_report_open: { state: is_report_open, setState: setReportOpen },
    messages: { state: messages, setState: setMessages },
  };
  return (
    <SettingsContext.Provider value={states}>
      {children}
    </SettingsContext.Provider>
  );
}
