export default function TagPage({ params }: { params: { tag: string } }) {
  return <div>{params.tag}</div>;
}
