import { MyAddresses } from "@components/frontStore/customer/MyAddresses.js";
import { _ } from "@evershop/evershop/lib/locale/translate/_";
import {
  useCustomer,
  useCustomerDispatch,
} from "@components/frontStore/customer/CustomerContext.js";

import React from "react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@components/ui/Tabs.js";
import {
  Heart,
  Mail,
  MapPin,
  Package,
  Settings,
  ShoppingBag,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@components/ui/Card.js";
import { Badge } from "@components/ui/Badge.js";
import { Button } from "@components/ui/Button.js";
import { Separator } from "@components/ui/Separator.js";
import { Image } from "@components/common/Image.js";
import { ProductNoThumbnail } from "@components/common/ProductNoThumbnail.js";
import { useAppState } from "@components/common/context/app.js";

const getStatusColor = (status: string) => {
  switch (status) {
    case "processing":
      return "bg-blue-100 text-blue-800";
    case "cancelled":
      return "bg-red-100 text-red-800";
    case "completed":
      return "bg-green-100 text-green-800";
    case "new":
      return "bg-yellow-100 text-yellow-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

export const orderTrackingQuery = `
  query OrderTrackingQuery($orderIds: [ID!]!) {
    orders(orderIds: $orderIds) {
      orderId
      shipment {
        trackingNumber
      }
    }
  }
`;

export default function MyAccount() {
  const { customer } = useCustomer();
  const {
    config: { tax: priceIncludingTax },
  } = useAppState();

  const { logout } = useCustomerDispatch();
  return (
    <div>
      <div className="page-width flex items-center justify-between mb-8 mt-6">
        <div>
          <h1 className="text-3xl">
            {_("Welcome back, ${name}!", { name: customer?.fullName || "" })}
          </h1>
          <p className="text-muted-foreground mt-2">
            {_("Manage your account details and view your recent orders here.")}
          </p>
          <div className="flex items-center gap-4 mt-3 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="lucide lucide-calendar h-4 w-4"
                aria-hidden="true">
                <path d="M8 2v4"></path>
                <path d="M16 2v4"></path>
                <rect width="18" height="18" x="3" y="4" rx="2"></rect>
                <path d="M3 10h18"></path>
              </svg>
              {_("Member since ${date}", {
                date: customer?.createdAt.text || "",
              })}
            </div>
            <div className="flex items-center gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="lucide lucide-star h-4 w-4"
                aria-hidden="true">
                <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"></path>
              </svg>
              480 loyalty points
            </div>
          </div>
        </div>
        <button
          onClick={logout}
          data-slot="button"
          className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg:not([class*='size-'])]:size-4 shrink-0 [&amp;_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive border bg-background text-foreground hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 h-9 px-4 py-2 has-[&gt;svg]:px-3">
          {_("Sign Out")}
        </button>
      </div>
      <div className="page-width mt-7">
        <Tabs defaultValue="orders" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            {/* <TabsTrigger value="profile" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              Profile
            </TabsTrigger> */}
            <TabsTrigger value="orders" className="flex items-center gap-2">
              <Package className="h-4 w-4" />
              {_("Orders")}
            </TabsTrigger>
            <TabsTrigger value="addresses" className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              {_("Addresses")}
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              {_("Settings")}
            </TabsTrigger>
          </TabsList>

          {/* <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>
                  Update your personal information and contact details
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleUpdateProfile} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        value={profileData.firstName}
                        onChange={(e) =>
                          setProfileData((prev) => ({
                            ...prev,
                            firstName: e.target.value,
                          }))
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        value={profileData.lastName}
                        onChange={(e) =>
                          setProfileData((prev) => ({
                            ...prev,
                            lastName: e.target.value,
                          }))
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={profileData.email}
                        onChange={(e) =>
                          setProfileData((prev) => ({
                            ...prev,
                            email: e.target.value,
                          }))
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        value={profileData.phone}
                        onChange={(e) =>
                          setProfileData((prev) => ({
                            ...prev,
                            phone: e.target.value,
                          }))
                        }
                      />
                    </div>
                  </div>

                  <Button type="submit">Update Profile</Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent> */}

          <TabsContent value="orders">
            <Card>
              <CardHeader>
                <CardTitle>{_("Recent Orders")}</CardTitle>
                <CardDescription>
                  {_("View your order history and track current orders")}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {(customer?.orders || []).map((order) => (
                    <div key={order.uuid} className="border rounded-lg p-6">
                      {/* Order Header */}
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <ShoppingBag className="h-5 w-5 text-muted-foreground" />
                          <div>
                            <p className="font-medium">
                              Order #{order.orderNumber}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {_("Placed on ${date}", {
                                date: order.createdAt.text,
                              })}
                            </p>
                          </div>
                        </div>
                        <Badge className={getStatusColor(order.status.code)}>
                          {order.status.name}
                        </Badge>
                      </div>

                      <Separator className="mb-4" />

                      {/* Order Items List */}
                      <div className="space-y-3 mb-4">
                        {order.items.map((item) => (
                          <div
                            key={item.uuid}
                            className="flex items-center gap-4">
                            {item.thumbnail && (
                              <Image
                                src={item.thumbnail}
                                alt={item.productName}
                                width={64}
                                height={64}
                                className="w-16 h-16 rounded-lg object-cover"
                              />
                            )}
                            {!item.thumbnail && (
                              <ProductNoThumbnail className="w-16 h-16 rounded-lg bg-muted-foreground/10 text-muted-foreground flex items-center justify-center" />
                            )}
                            <div className="flex-1">
                              <h4 className="font-medium">
                                {item.productName}
                              </h4>
                              {item.variantOptions && (
                                <p className="text-sm text-muted-foreground">
                                  {item.variantOptions
                                    .map(
                                      (vo) =>
                                        `${vo.attributeName}: ${vo.optionText}`
                                    )
                                    .join(" • ")}
                                </p>
                              )}
                            </div>
                            <div className="text-right">
                              <p className="text-sm text-muted-foreground">
                                {_("Qty: ${quantity}", {
                                  quantity: item.qty.toString(),
                                })}
                              </p>
                              <p className="font-medium">
                                {priceIncludingTax
                                  ? item.finalPriceInclTax.text
                                  : item.finalPrice.text}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>

                      <Separator className="mb-4" />

                      {/* Order Summary */}
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">
                            {_("Subtotal")}
                          </span>
                          <span>{order.subTotal.text}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">
                            {_("Shipping")}
                          </span>
                          <span>
                            {order.shippingFeeInclTax.value === 0
                              ? _("Free")
                              : priceIncludingTax
                                ? order.shippingFeeInclTax.text
                                : order.shippingFeeExclTax.text}
                          </span>
                        </div>
                        {order.discountAmount.value > 0 && (
                          <div className="flex justify-between text-sm text-green-600">
                            <span>{_("Discount")}</span>
                            <span>-{order.discountAmount.text}</span>
                          </div>
                        )}
                        <Separator />
                        <div className="flex justify-between font-medium">
                          <span>{_("Total")}</span>
                          <span>{order.grandTotal.text}</span>
                        </div>
                      </div>

                      <Separator className="my-4" />

                      {/* Delivery Info */}
                      <div className="space-y-2 text-sm">
                        <div className="flex items-start gap-2 text-muted-foreground">
                          <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                          <span>
                            {order.shippingAddress?.address1},{" "}
                            {order.shippingAddress?.city},{" "}
                            {order.shippingAddress?.country?.name},{" "}
                            {order.shippingAddress?.postcode}
                          </span>
                        </div>

                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="addresses">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>{_("Delivery Addresses")}</CardTitle>
                  <CardDescription>
                    {_("Manage your delivery addresses for faster checkout")}
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <MyAddresses />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Account Settings</CardTitle>
                <CardDescription>
                  Manage your account preferences and notifications
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Notifications</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Order Updates</p>
                        <p className="text-sm text-muted-foreground">
                          Get notified about your order status
                        </p>
                      </div>
                      <Button variant="outline" size="sm">
                        Enabled
                      </Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Special Offers</p>
                        <p className="text-sm text-muted-foreground">
                          Receive exclusive deals and promotions
                        </p>
                      </div>
                      <Button variant="outline" size="sm">
                        Enabled
                      </Button>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Privacy</h3>
                  <div className="space-y-3">
                    <Button variant="outline" className="w-full justify-start">
                      <Mail className="h-4 w-4 mr-2" />
                      Change Email
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Settings className="h-4 w-4 mr-2" />
                      Change Password
                    </Button>
                    <Button
                      variant="destructive"
                      className="w-full justify-start">
                      Delete Account
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export const layout = {
  areaId: "content",
  sortOrder: 10,
};
