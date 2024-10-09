interface Tag {
  slug: string;
  text: string;
  count: number;
}

const TagList = ({ tags }: { tags: Tag[] }) => {
  return (
    <ul className="mt-4">
      {tags.map((tag) => (
        <li key={tag.slug}>
          <a href={`/tema/${tag.slug}`}>{tag.text} ({tag.count})</a>
        </li>
      ))}
    </ul>
  );
};

export default TagList;