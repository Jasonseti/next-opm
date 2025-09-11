"use client";
import { useSearchParams } from "next/navigation";
import { useState, createContext, Dispatch, SetStateAction } from "react";

export interface StatesTypes {
  chapter: string;
  chapter_list: string[];
  chapter_index: number;
  cover_chapters: string[];
  next_chapter_thumbnail: string;
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
  is_feedback_open: {
    state: boolean;
    setState: Dispatch<SetStateAction<boolean>>;
  };
  messages: {
    state: string[];
    setState: Dispatch<SetStateAction<string[]>>;
  };
}

export const StatesContext = createContext<StatesTypes>({
  chapter: "",
  chapter_list: [],
  chapter_index: 0,
  cover_chapters: [],
  next_chapter_thumbnail: "",
  current_page: {
    state: 0,
    setState: () => {},
  },
  page_mode: {
    state: "",
    setState: () => {},
  },
  summary_mode: {
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
  is_feedback_open: {
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
  props,
  cookies,
}: {
  children: React.ReactNode;
  props: {
    chapter: string;
    chapter_list: string[];
    chapter_index: number;
    cover_chapters: string[];
    next_chapter_thumbnail: string;
  };
  cookies: {
    page_mode?: string;
    read_mode?: string;
    summary_mode?: string;
  };
}) {
  const searchParams = useSearchParams();
  const [current_page, setCurrentPage] = useState<number>(
    searchParams.get("page") ? Number(searchParams.get("page")?.toString()) : 1
  );
  const [page_mode, setPage] = useState<string>(
    cookies.page_mode || "one-page"
  );
  const [read_mode, setMode] = useState<string>(cookies.read_mode || "scroll");
  const [summary_mode, setSummaryMode] = useState<string>(
    cookies.summary_mode || "brief"
  );

  const [is_header_open, setHeaderOpen] = useState<boolean>(true);
  const [is_feedback_open, setFeedbackOpen] = useState<boolean>(false);
  const [is_comment_open, setCommentOpen] = useState<boolean>(
    searchParams.get("comment")
      ? searchParams.get("comment")?.toString() === "open"
      : false
  );

  const [messages, setMessages] = useState<string[]>([]);

  const states = {
    chapter: props.chapter,
    chapter_list: props.chapter_list,
    chapter_index: props.chapter_index,
    cover_chapters: props.cover_chapters,
    next_chapter_thumbnail: props.next_chapter_thumbnail,
    current_page: { state: current_page, setState: setCurrentPage },
    page_mode: { state: page_mode, setState: setPage },
    read_mode: { state: read_mode, setState: setMode },
    summary_mode: { state: summary_mode, setState: setSummaryMode },
    is_header_open: { state: is_header_open, setState: setHeaderOpen },
    is_feedback_open: { state: is_feedback_open, setState: setFeedbackOpen },
    is_comment_open: { state: is_comment_open, setState: setCommentOpen },
    messages: { state: messages, setState: setMessages },
  };
  return (
    <StatesContext.Provider value={states}>{children}</StatesContext.Provider>
  );
}
