export default function ({ content }: { content: string }) {
  return (
    <button class="my-button" type="button">
      {content}
    </button>
  );
}