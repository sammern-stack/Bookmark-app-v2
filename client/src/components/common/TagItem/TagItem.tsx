import { Container } from "@/components/shared";
import "./TagItem.scss";

interface TagItemProps {
  label: string;
  count: number;
}

export const TagItem = ({ label, count }: TagItemProps) => {
  return (
    <Container className="home__tag" variant="simple">
      <div className="home__tag-header">
        <input type="checkbox" id="select-tag" />
        <div className="home__tag-title">{label}</div>
      </div>

      <div className="home__tag-total">{count}</div>
    </Container>
  );
};
