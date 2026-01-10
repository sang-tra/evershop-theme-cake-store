import { AddressSummary } from "@components/common/customer/address/AddressSummary.jsx";
import { CheckboxField } from "@components/common/form/CheckboxField.js";
import { Form } from "@components/common/form/Form.js";
import { Modal } from "@components/common/modal/Modal.js";
import { useModal } from "@components/common/modal/useModal.js";
import CustomerAddressForm from "@components/frontStore/customer/address/addressForm/Index.js";
import {
  ExtendedCustomerAddress,
  useCustomer,
  useCustomerDispatch,
} from "@components/frontStore/customer/CustomerContext.jsx";
import { Badge } from "@components/ui/Badge.js";
import { Button } from "@components/ui/Button.js";
import { _ } from "@evershop/evershop/lib/locale/translate/_";
import { Building, Edit, Plus, Trash2 } from "lucide-react";
import React from "react";
import { toast } from "react-toastify";

const Address: React.FC<{
  address: ExtendedCustomerAddress;
}> = ({ address }) => {
  const { updateAddress, deleteAddress } = useCustomerDispatch();
  const modal = useModal();
  const classes = address.isDefault ? "border border-interactive" : "";
  return (
    <div>
      <div key={address.uuid} className="border rounded-lg p-4">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Building className="h-4 w-4 text-muted-foreground" />
              {address.isDefault && (
                <Badge variant="secondary" className="text-xs">
                  {_("Default")}
                </Badge>
              )}
            </div>
            <div className="text-sm space-y-1">
              <p className="text-muted-foreground">{address.address1}</p>
              <p className="text-muted-foreground">
                {address.city}, {address.province?.name} {address.postcode}
              </p>
              <p className="text-muted-foreground">{address.telephone}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={(e) => {
                e.preventDefault();
                modal.open();
              }}>
              <Edit className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={async (e) => {
                e.preventDefault();
                try {
                  await deleteAddress(address.addressId);
                  toast.success(_("Address has been deleted successfully!"));
                } catch (error) {
                  toast.error(error.message);
                }
              }}
              className="text-destructive hover:text-destructive">
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
      <Modal
        title={_("Edit Address")}
        onClose={modal.close}
        isOpen={modal.isOpen}>
        <Form
          id="customerAddressForm"
          method="PATCH"
          onSubmit={async (data) => {
            await updateAddress(address.addressId, data);
            modal.close();
          }}
          onSuccess={(response) => {
            if (!response.error) {
              modal.close();
              toast.success(_("Address has been updated successfully!"));
            } else {
              toast.error(response.error.message);
            }
          }}>
          <CustomerAddressForm address={address} fieldNamePrefix="" />
          <CheckboxField
            label={_("Set as default")}
            defaultChecked={address.isDefault}
            name="is_default"
          />
        </Form>
      </Modal>
    </div>
  );
};

export function MyAddresses({ title }: { title?: string }) {
  const { customer } = useCustomer();
  const { addAddress } = useCustomerDispatch();
  const modal = useModal();
  if (!customer) {
    return null;
  }
  return (
    <div>
      {title && (
        <div className="border-b mb-5 border-gray-200">
          <h2>{_("Address Book")}</h2>
        </div>
      )}
      {customer.addresses.length === 0 && (
        <div className="order-history-empty">
          {_("You have no addresses saved")}
        </div>
      )}
      <div className="space-y-4">
        {customer.addresses.map((address) => (
          <Address key={address.uuid} address={address} />
        ))}
      </div>
      <br />
      <Button
        size="sm"
        className="flex items-center gap-2"
        onClick={(e) => {
          e.preventDefault();
          modal.open();
        }}>
        <Plus className="h-4 w-4" />
        {_("Add Address")}
      </Button>
      <Modal
        title={_("Add new address")}
        onClose={modal.close}
        isOpen={modal.isOpen}>
        <Form
          id="customerAddressForm"
          method={"POST"}
          onSubmit={async (data) => {
            try {
              await addAddress(data as ExtendedCustomerAddress);
              toast.success(_("Address has been saved successfully!"));
              modal.close();
            } catch (error) {
              toast.error(error.message);
            }
          }}
          onSuccess={(response) => {
            if (!response.error) {
              modal.close();
              toast.success(_("Address has been saved successfully!"));
              setTimeout(() => {
                window.location.reload();
              }, 1500);
            } else {
              toast.error(response.error.message);
            }
          }}>
          <CustomerAddressForm address={undefined} fieldNamePrefix="" />
          <CheckboxField
            label={_("Set as default")}
            defaultChecked={false}
            name="is_default"
          />
        </Form>
      </Modal>
    </div>
  );
}
