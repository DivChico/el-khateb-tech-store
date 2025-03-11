import { getCurrentSession } from "@/actions/auth";
import { redirect } from "next/navigation";

const CheckoutSuccessPage = async ({}) => {
  const { user } = await getCurrentSession();

  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="max-w-md w-full mx-auto p-6">
        <div className="bg-white rounded-2xl shadow-xl p-6 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-green-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            تم تقديم الطلب بنجاح{" "}
          </h1>
          <p className="text-gray-600 mb-6">سوف يتم التواصل معك في اقرب وقت</p>

          <div className="text-sm text-gray-500">
            {/* Order email: {user?.email} */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutSuccessPage;
