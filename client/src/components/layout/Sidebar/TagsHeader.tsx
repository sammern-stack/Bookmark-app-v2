import "./styles.scss";

export const TagsHeader = () => {
  const isTagsActive = false;

  const renderReset = () => {
    if (!isTagsActive) return undefined;
    return <button className="home__tags-reset">Reset</button>;
  };

  return (
    <div className="home__tags-header">
      <div className="home__tags-title">Tags</div>

      {renderReset()}
    </div>
  );
};
