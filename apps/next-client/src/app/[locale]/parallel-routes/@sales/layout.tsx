type LayoutProps = {
  children: React.ReactNode;
};

export default function SalesPageLayout({ children }: LayoutProps) {
  return (
    <div
      style={{
        background: '#007aba',
        padding: '10px',
        borderRadius: 2,
        color: 'white'
      }}
    >
      <p>Sales Layout</p>
      {children}
    </div>
  );
}
