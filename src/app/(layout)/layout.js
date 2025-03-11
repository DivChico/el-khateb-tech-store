import { getCurrentSession } from "@/actions/auth";
import Cart from "@/components/cart/Cart";
import Header from "@/components/Header";

export default async function ClientLayout({ children }) {
  const { user } = await getCurrentSession();

  return (
    <>
      <Header user={user} />
      {children}
      <Cart user={user} />
    </>
  );
}
