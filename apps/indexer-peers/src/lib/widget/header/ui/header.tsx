type HeaderProps = {
  handleIndexerForm: () => void;
};

export function Header({ handleIndexerForm }: HeaderProps) {
  return (
    <header className="flex justify-between items-center mb-4 mt-8">
      <h1 className="text-2xl font-bold mb-2">Devnet Indexers</h1>
      <button
        className="bg-primary text-primary-foreground px-4 py-2 rounded-md"
        onClick={handleIndexerForm}
      >
        Join Devnet
      </button>
    </header>
  );
}
