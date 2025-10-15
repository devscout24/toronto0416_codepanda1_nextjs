import PersonalInfo from "./components/personalInfo";
import AddressBook from "./components/addressBook";
import RecentOrders from "./components/recentOrders";
import { userData } from "@/consts/user";
import Header from "./components/header";

export default function AccountPage() {
  return (
    <section className="w-full">
      <Header><h1 className="text-xl font-semibold">My Account</h1></Header>

      <div className="mt-5">
        <div className="grid grid-cols-2 gap-5">
          <div className="w-full rounded-xl bg-white p-5">
            <PersonalInfo userData={userData.personalInfo} />
          </div>

          <div className="w-full rounded-xl bg-white p-5">
            <AddressBook addressBook={userData.addressBook} />
          </div>

          <div className="col-span-2 rounded-xl bg-white p-5">
            <h2 className="text-xl font-semibold">Recent orders</h2>
            <RecentOrders payload={userData.recentOrders} />
          </div>
        </div>
      </div>
    </section>
  );
}
