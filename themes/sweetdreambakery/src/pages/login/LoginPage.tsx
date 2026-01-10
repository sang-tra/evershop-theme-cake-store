import { CustomerLoginForm } from "@components/frontStore/customer/LoginForm.js";
import { _ } from "@evershop/evershop/lib/locale/translate/_";
import React from "react";
import { toast } from "react-toastify";
import "./LoginForm.scss";

interface LoginPageProps {
  homeUrl: string;
  registerUrl: string;
  forgotPasswordUrl: string;
}

export default function LoginPage({
  homeUrl,
  registerUrl,
  forgotPasswordUrl,
}: LoginPageProps) {
  return (
    <div className="login__page flex flex-col justify-center items-center">
      <CustomerLoginForm
        title={_("Welcome Back!")}
        subtitle={_("Sign in to your Sweet Dreams Bakery account")}
        redirectUrl={homeUrl}
        onError={(error) => {
          toast.error(error.message);
        }}
        className="flex justify-center items-center w-[30rem] max-w-max md:max-w-[80%] bg-white rounded-2xl p-6 shadow-lg border border-divider"
      />
    </div>
  );
}

export const layout = {
  areaId: "content",
  sortOrder: 10,
};

export const query = `
  query Query {
    homeUrl: url(routeId: "homepage")
    registerUrl: url(routeId: "register")
    forgotPasswordUrl: url(routeId: "resetPasswordPage")
  }
`;
