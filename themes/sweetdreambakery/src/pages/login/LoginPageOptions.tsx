import { _ } from "@evershop/evershop/lib/locale/translate/_";
import React from "react";

export default function LoginPageOptions({
  homeUrl,
  registerUrl,
}: {
  homeUrl: string;
  registerUrl: string;
}) {
  return (
    <>
      <div
        data-orientation="horizontal"
        role="none"
        data-slot="separator-root"
        className="bg-border shrink-0 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px mt-4"></div>
      <div className="login__page__options text-center mt-4 gap-5 flex flex-col text-sm">
        <div className="flex justify-center items-center gap-1">
          <span className="text-muted-foreground">
            {_("Don't have an account? ")}
          </span>
          <a className="text-interactive hover:underline" href={registerUrl}>
            {_("Sign up")}
          </a>
        </div>
        <a className="text-muted-foreground hover:underline" href={homeUrl}>
          {_("Continue as guest")}
        </a>
      </div>
    </>
  );
}

export const layout = {
  areaId: "customerLoginFormAfter",
  sortOrder: 10,
};

export const query = `
  query Query {
    homeUrl: url(routeId: "homepage")
    registerUrl: url(routeId: "register")
  }
`;
