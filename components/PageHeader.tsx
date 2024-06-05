interface PageHeaderProps {
  title: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title }) => {
  return (
    <div className="page-header">
      <h1>{title}</h1>
    </div>
  );
};

export default PageHeader;
