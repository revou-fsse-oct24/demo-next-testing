// __tests__/BookList.test.jsx
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
// import BookList from "../src/components/BookList";
import BookList from "../../src/pages/BookList/index";

describe("BookList Component", () => {
  it("renders the main heading", () => {
    render(<BookList />);
    const heading = screen.getByText("Classic Books");
    expect(heading).toBeInTheDocument();
  });

  it("renders all three books", () => {
    render(<BookList />);
    const bookCards = screen.getAllByRole("heading", { level: 3 });
    expect(bookCards).toHaveLength(3);
  });

  it("renders the correct book titles", () => {
    render(<BookList />);
    expect(screen.getByText("The Great Gatsby")).toBeInTheDocument();
    expect(screen.getByText("To Kill a Mockingbird")).toBeInTheDocument();
    expect(screen.getByText("1984")).toBeInTheDocument();
  });

  it("displays author information correctly", () => {
    render(<BookList />);
    const authors = screen.getAllByText(/By:/);
    expect(authors).toHaveLength(3);
    expect(screen.getByText("By: F. Scott Fitzgerald")).toBeInTheDocument();
    expect(screen.getByText("By: Harper Lee")).toBeInTheDocument();
    expect(screen.getByText("By: George Orwell")).toBeInTheDocument();
  });

  it("shows publication years", () => {
    render(<BookList />);
    expect(screen.getByText("Published: 1925")).toBeInTheDocument();
    expect(screen.getByText("Published: 1960")).toBeInTheDocument();
    expect(screen.getByText("Published: 1949")).toBeInTheDocument();
  });

  it("renders books in book-card containers", () => {
    const { container } = render(<BookList />);
    const bookCards = container.getElementsByClassName("book-card");
    expect(bookCards.length).toBe(3);
  });
});
