import { _ } from "@evershop/evershop/lib/locale/translate/_";
import React from "react";

const UserSVG = ({ className }) => (
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
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
    <circle cx="12" cy="7" r="4"></circle>
  </svg>
);

const ChevoryDownSVG = ({ className }) => (
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
    <path d="m6 9 6 6 6-6"></path>
  </svg>
);

interface UserIconProps {
  customer: {
    uuid: string;
    fullName: string;
    email: string;
  };
  accountUrl: string;
  loginUrl: string;
  registerUrl: string;
}

export default function UserIcon({
  customer,
  accountUrl,
  loginUrl,
  registerUrl,
}: UserIconProps) {
  const [openingDropdown, setOpeningDropdown] = React.useState(false);
  return (
    <div className="self-center relative border rounded-md hover:bg-gray-50 px-3 py-2">
      <a
        href={customer ? accountUrl : loginUrl}
        onClick={(e) => {
          e.preventDefault();
          setOpeningDropdown(!openingDropdown);
        }}
        className="flex items-center justify-between gap-1">
        <UserSVG className="w-4 h-4" />
        <ChevoryDownSVG className="w-4 h-4 inline-block ml-1" />
      </a>
      <div
        className={`absolute top-full right-0 z-10 mt-2 w-56 rounded-md border ${
          openingDropdown ? "block" : "hidden"
        }`}>
        <div className="rounded-md bg-white shadow-xs">
          {customer ? (
            <div className="py-1">
              <div className="px-3 py-2 border-b border-gray-100">
                <p className="text-sm font-medium">{_("Signed in as")}</p>
                <p className="text-sm text-muted-foreground truncate">
                  {customer.email}
                </p>
              </div>
              <a
                href={accountUrl}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                {_("My account")}
              </a>
              <a
                href="/logout"
                className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100">
                {_("Logout")}
              </a>
            </div>
          ) : (
            <div className="py-1">
              <a
                href={loginUrl}
                className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                {_("Sign In")}
              </a>
              <a
                href={registerUrl}
                className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                {_("Create an Account")}
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export const layout = {
  areaId: "headerMiddleRight",
  sortOrder: 10,
};

export const query = `
  query Query {
    customer: currentCustomer {
      uuid
      fullName
      email
    }
    accountUrl: url(routeId: "account")
    loginUrl: url(routeId: "login")
    registerUrl: url(routeId: "register")
  }
`;
