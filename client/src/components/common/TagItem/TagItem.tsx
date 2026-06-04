import { Container } from "@/components/shared";
import "./TagItem.scss";

interface TagItemProps {
  tag: [string, number];
}

export const TagItem = ({ tag }: TagItemProps) => {
  return (
    <Container className="home__tag" variant="simple">
      <div className="home__tag-header">
        <input type="checkbox" id="select-tag" />
        <div className="home__tag-title">{tag[0]}</div>
      </div>

      <div className="home__tag-total">{tag[1]}</div>
    </Container>
  );
};
