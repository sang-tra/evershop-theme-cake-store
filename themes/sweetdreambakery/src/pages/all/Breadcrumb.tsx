import React from "react";

interface BreadcrumbProps {
  pageInfo: {
    breadcrumbs: Array<{
      title: string;
      url: string;
    }>;
  };
}

const HomeIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
    className={className}
    viewBox="0 0 24 24">
    <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"></path>
    <path d="M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
  </svg>
);

const ChevronRightIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
    className={className}
    viewBox="0 0 24 24">
    <path d="m9 18 6-6-6-6"></path>
  </svg>
);

function Breadcrumb({ pageInfo: { breadcrumbs } }: BreadcrumbProps) {
  const homeBreadcrumbs = breadcrumbs.map((breadcrumb, index) => {
    if (index === 0) {
      return {
        ...breadcrumb,
        title: <HomeIcon className="h-4 w-4" />,
      };
    } else {
      return breadcrumb;
    }
  });
  return homeBreadcrumbs.length ? (
    <div className="breadcrumb page-width py-5">
      <nav className="flex items-center space-x-2 text-sm text-muted-foreground">
        {homeBreadcrumbs.map((breadcrumb, index) =>
          index === homeBreadcrumbs.length - 1 ? (
            <span key={index}>{breadcrumb.title}</span>
          ) : (
            <React.Fragment key={index}>
              <a href={breadcrumb.url} className="text-interactive">
                {breadcrumb.title}
              </a>
              <ChevronRightIcon className="h-4 w-4" />
            </React.Fragment>
          )
        )}
      </nav>
    </div>
  ) : null;
}

export const query = `
  query query {
    pageInfo {
      breadcrumbs {
        title
        url
      }
    }
  }
`;

export const layout = {
  areaId: "content",
  sortOrder: 0,
};

export default Breadcrumb;
