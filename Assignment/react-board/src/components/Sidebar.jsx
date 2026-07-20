import { Link } from "react-router-dom";
const categories = [
  "General",
  "Product",
  "Development",
  "Marketing",
  "Feedback",
];
export default function Sidebar({
  tags = ["UX", "Code", "Launch", "Strategy"],
}) {
  return (
    <aside className="topic-sidebar">
      <p className="sidebar-label">POPULAR CATEGORIES</p>
      {categories.map((category, i) => (
        <div className="category" key={category}>
          <span>0{i + 1}</span>
          {category}
        </div>
      ))}
      <p className="sidebar-label tag-label">TRENDING TAGS</p>
      <div className="tag-list">
        {tags.map((tag) => (
          <span key={tag}>{tag}</span>
        ))}
      </div>
      <Link className="button button-primary sidebar-button" to="/boards/write">
        Start a discussion
      </Link>
    </aside>
  );
}
