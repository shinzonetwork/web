export const ShinzoFrame = () => {
  return (
    <div className="fixed inset-0 pointer-events-none">
      <div className="absolute top-4 lg:top-16 left-0 right-0 h-px bg-szo-border" />
      <div className="absolute bottom-4 lg:bottom-16 left-0 right-0 h-px bg-szo-border" />
      <div className="absolute left-4 lg:left-16 top-0 bottom-0 w-px bg-szo-border" />
      <div className="absolute right-4 lg:right-16 top-0 bottom-0 w-px bg-szo-border" />
      <div className='absolute -top-1 lg:top-10 left-4 lg:left-18 font-jp-serif text-szo-primary text-px-16 font-bold'>分散化</div>
      <div className='absolute rotate-90 top-10 -right-6 lg:top-22 lg:right-5 font-jp-serif text-szo-primary text-px-16 font-bold'>検証可能</div>
      <div className='absolute rotate-180 -bottom-1 lg:bottom-10 right-4 lg:right-17 font-jp-serif text-szo-primary text-px-16 font-bold'>トラストレス</div>
      <div className='absolute rotate-270 bottom-20 -left-16 lg:-left-5 lg:bottom-33 font-jp-serif text-szo-primary text-px-16 font-bold'>パーミッションレス</div>
    </div>
  );
};
