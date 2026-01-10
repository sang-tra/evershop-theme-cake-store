import { CheckboxField } from "@components/common/form/CheckboxField.js";
import { _ } from "@evershop/evershop/lib/locale/translate/_";
import React from "react";

export default function RegisterFormTAndC() {
  return (
    <>
      <CheckboxField
        direction="horizontal"
        name="terms"
        wrapperClassName="terms-and-conditions form-field"
        required
        validation={{
          required: _("You must agree to the terms and conditions"),
        }}
        label={
          (
            <div
              className="login__page__options text-left mt-4 text-sx font-medium text-primary"
              dangerouslySetInnerHTML={{
                __html: _(
                  "By creating an account, you agree to our <a href='/terms-and-conditions' class='text-primary hover:underline'>Terms & Conditions</a> and <a href='/privacy-policy' class='text-primary hover:underline'>Privacy Policy</a>."
                ),
              }}></div>
          ) as any
        }
      />
    </>
  );
}

export const layout = {
  areaId: "customerRegisterForm",
  sortOrder: 50,
};
