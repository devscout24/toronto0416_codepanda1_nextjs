import PersonalInfo from "./components/personalInfo";
import AddressBook from "./components/addressBook";
import RecentOrders from "./components/recentOrders";
import Header from "./components/header";
import { getAccountInfo } from "./components/action";
import { userData as fallbackUserData } from "@/consts/user";
import { TUserProfile } from "@/types/user.type";

export default async function AccountPage() {
let accountData = fallbackUserData as TUserProfile;


  try {
    const response = await getAccountInfo();
    if (response) {
      accountData = {
        personal_info: response.personal_info,
        addresses: response.addresses,
        orders: response.orders,
      };
    }
  } catch (error) {
    console.error("Error fetching account info:", error);
  }

  // ✅ Fallback UI if still no data
  if (!accountData) {
    return (
      <section className="w-full flex items-center justify-center py-20">
        <p className="text-gray-500">Unable to load account information.</p>
      </section>
    );
  }

  return (
    <section className="w-full">
      <Header>
        <h1 className="text-xl font-semibold">My Account</h1>
      </Header>

      <div className="mt-5">
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          {/* Personal Info */}
          <div className="w-full rounded-xl bg-white p-5">
            <PersonalInfo userData={accountData?.personal_info} />
          </div>

          {/* Address Book */}
          <div className="w-full rounded-xl bg-white p-5">
            <AddressBook addressBook={accountData?.addresses} />
          </div>

          {/* Recent Orders */}
          <div className="col-span-1 rounded-xl bg-white p-5 lg:col-span-2">
            <h2 className="text-xl font-semibold mb-4">Recent Orders</h2>
            <RecentOrders payload={accountData?.orders} />
          </div>
        </div>
      </div>
    </section>
  );
}
