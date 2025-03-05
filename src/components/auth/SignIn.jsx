"use client";

import React, { useActionState } from "react";
import Form from "next/form";
import { Loader2 } from "lucide-react";

const initialState = {
  message: "",
};

const SignIn = ({ action }) => {
  const [state, formAction, isPending] = useActionState(action, initialState);

  return (
    <Form
      action={formAction}
      className="max-w-md mx-auto my-16 p-8 bg-white rounded-lg shadow-md"
    >
      <h1
        className="text-2xl font-bold text-center mb-2"
        style={{ color: "var(--color-fontPrimary)" }}
      >
        مرحبًا بعودتك!
      </h1>
      <p
        className="text-center text-sm font-semibold mb-2"
        style={{ color: "var(--color-fontSecondary)" }}
      >
        🔥 عرض خاص للأعضاء 🔥
      </p>
      <p
        className="text-center text-sm mb-6"
        style={{ color: "var(--color-fontTertiary)" }}
      >
        سجل الدخول للوصول إلى عروض الأعضاء الحصرية.
      </p>

      <div className="space-y-6">
        {/* Email */}
        <div className="space-y-2 text-right">
          <label
            htmlFor="email"
            className="block text-sm font-medium"
            style={{ color: "var(--color-fontPrimary)" }}
          >
            عنوان البريد الإلكتروني
          </label>
          <input
            type="email"
            id="email"
            name="email"
            autoComplete="email"
            required
            className="w-full text-gray-900 text-right px-4 py-3 border border-gray-200 rounded-md focus:ring-2 focus:ring-black focus:border-transparent transition-colors"
            placeholder="أدخل بريدك الإلكتروني"
          />
        </div>

        {/* Password */}
        <div className=" space-y-2 text-right">
          <label
            htmlFor="password"
            className="block text-sm font-medium"
            style={{ color: "var(--color-fontPrimary)" }}
          >
            كلمة المرور
          </label>
          <input
            type="password"
            id="password"
            name="password"
            autoComplete="new-password"
            required
            className="w-full text-right text-gray-900 px-4 py-3 border border-gray-200 rounded-md focus:ring-2 focus:ring-black focus:border-transparent transition-colors"
            placeholder="أدخل كلمة المرور"
          />
        </div>

        {/* Copywriting */}
        <div className="text-center">
          <p
            className="text-xs mb-2"
            style={{ color: "var(--color-fontSecondary)" }}
          >
            ⚡️ الأعضاء يوفرون 15٪ إضافية على جميع الطلبات!
          </p>
          <p
            className="text-xs mb-4"
            style={{ color: "var(--color-fontSecondary)" }}
          >
            🛍️ واحصل على شحن مجاني للطلبات التي تزيد عن 150 شيكل
          </p>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isPending}
          className={`w-full py-3 rounded-md transition-colors font-medium flex items-center justify-center gap-2 ${isPending ? "cursor-not-allowed" : ""}`}
          style={{
            backgroundColor: "var(--color-fontPrimary)",
            color: "white",
          }}
        >
          {isPending ? (
            <React.Fragment>
              <Loader2 className="h-4 w-4 animate-spin" />
              جاري تسجيل الدخول...
            </React.Fragment>
          ) : (
            "تسجيل الدخول"
          )}
        </button>

        {state?.message && state.message.length > 0 && (
          <p className="text-center text-sm" style={{ color: "red" }}>
            {state.message}
          </p>
        )}
      </div>
    </Form>
  );
};

export default SignIn;
