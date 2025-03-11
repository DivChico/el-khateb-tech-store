"use client";

import React from "react";
import { useActionState } from "react";
import Form from "next/form";
import { Loader2 } from "lucide-react";

const initialState = {
  message: "",
};

const SignUp = ({ action }) => {
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
        انضم إلى متجر الخطيب
      </h1>
      <p
        className="text-center text-sm font-semibold mb-2"
        style={{ color: "var(--color-fontSecondary)" }}
      >
        🔥 عرض محدود 🔥
      </p>
      <p
        className="text-center text-sm mb-6"
        style={{ color: "var(--color-fontTertiary)" }}
      >
        سجل الآن واحصل على خصم 90٪ على طلبك الأول!
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
            className="w-full text-right px-4 py-3 border text-gray-900 border-gray-200 rounded-md focus:ring-2 focus:ring-black focus:border-transparent transition-colors"
            placeholder="أدخل بريدك الإلكتروني"
          />
        </div>

        {/* Password */}
        <div className=" text-right space-y-2">
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
            className="w-full text-right px-4 py-3 border text-gray-900 border-gray-200 rounded-md focus:ring-2 focus:ring-black focus:border-transparent transition-colors"
            placeholder="أنشئ كلمة مرور"
          />
        </div>

        {/* Copywriting */}
        <div className="text-center">
          <p
            className="text-xs mb-2"
            style={{ color: "var(--color-fontSecondary)" }}
          >
            ⚡️ فقط 127 حزمة ترحيبية متبقية!
          </p>
          <p
            className="text-xs mb-4"
            style={{ color: "var(--color-fontSecondary)" }}
          >
            🕒 العرض ينتهي في: 13:45
          </p>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isPending}
          className={`w-full py-3 rounded-md transition-colors font-medium flex items-center justify-center gap-2 ${isPending ? "cursor-not-allowed" : " cursor-pointer"}`}
          style={{
            backgroundColor: "var(--color-fontPrimary)",
            color: "white",
          }}
        >
          {isPending ? (
            <React.Fragment>
              <Loader2 className="h-4 w-4 animate-spin" />
              جاري إنشاء الحساب...
            </React.Fragment>
          ) : (
            "إنشاء حساب"
          )}
        </button>
        <p
          onClick={() => {
            window.location.href = "/auth/sign-in";
          }}
          className="text-xs mb-4 cursor-pointer text-center"
          style={{ color: "var(--color-fontSecondary)" }}
        >
          لديك حساب ؟سجل الدخول!{" "}
        </p>
        {state?.message && state.message.length > 0 && (
          <p className="text-center text-sm" style={{ color: "red" }}>
            {state.message}
          </p>
        )}
      </div>
    </Form>
  );
};

export default SignUp;
