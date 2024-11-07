import React, { Suspense } from "react";
import { lazily } from "react-lazily";
import { Routes, Route } from "react-router-dom";
import { Loading } from "../components";
import PrivateRoute from "./private";

// ---------- Layouts ----------
const { MainLayout } = lazily(() => import("../layout/_main"));
const { PanelLayout } = lazily(() => import("../layout/_panel"));

// ---------- Authentication Pages ----------
const { Login } = lazily(() => import("../pages/auth/login"));
const { Signup } = lazily(() => import("../pages/auth/signup"));
const { ForgetPassword } = lazily(() =>
  import("../pages/auth/forget-password")
);
const { VerifyUser } = lazily(() => import("../pages/verify-user"));
const { VerifiedEmail } = lazily(() =>
  import("../pages/verification-email-sent")
);

// ---------- Panel Pages ----------
const { Dashboard } = lazily(() => import("../pages/panel/dashboard"));
const { ComingSoon } = lazily(() => import("../pages/coming-soon"));
const { UserCompany } = lazily(() => import("../pages/panel/user-company"));
const { AccountPlanning } = lazily(() =>
  import("../pages/panel/account-planning/coding-header")
);
const { PlanningDetail } = lazily(() =>
  import("../pages/panel/account-planning/coding-detail")
);
const { CompanyPlanningDetail } = lazily(() =>
  import("../pages/panel/company-account-planning/company-planning-detail")
);
const { HelpDesk } = lazily(() => import("../pages/panel/help-desk"));
const { UsersList } = lazily(() => import("../pages/panel/users"));
const { Profile } = lazily(() => import("../pages/panel/profile"));
const { UserProfilePage } = lazily(() => import("../pages/panel/user-profile"));
const { DataUpload } = lazily(() => import("../pages/panel/data-upload"));
const { FileMapping } = lazily(() =>
  import("../pages/panel/data-upload/mapping")
);
const { Transaction } = lazily(() =>
  import("../pages/panel/data-upload/transaction")
);
const { AcceptFile } = lazily(() =>
  import("../pages/panel/data-upload/accept-file")
);
const { CompanyBudget } = lazily(() => import("../pages/panel/budget/budget"));
const { BudgetHeader } = lazily(() =>
  import("../pages/panel/budget/budget-header")
);
const { Definition } = lazily(() => import("../pages/panel/definition"));
const { Customer } = lazily(() => import("../pages/panel/customer"));
const { Stock } = lazily(() => import("../pages/panel/stock"));
const { Personnel } = lazily(() => import("../pages/panel/personnel"));
const { CompanyBudgetDetail } = lazily(() =>
  import("../pages/panel/budget/budget-detail")
);

const Index = () => {
  // ---------- render jsx ----------
  return (
    <>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route path="/login" element={<Login />} />
            <Route exact path="/signup" element={<Signup />} />
            <Route path="/forgetPassword" element={<ForgetPassword />} />
          </Route>

          {/* Private Routes */}
          <Route element={<PrivateRoute />}>
            <Route path="/" element={<PanelLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="/userCompany" element={<UserCompany />} />
              <Route path="/accountPlanning" element={<AccountPlanning />} />
              <Route
                path="/accountPlanning/detail"
                element={<PlanningDetail />}
              />
              <Route
                path="/companyAccountPlanning"
                element={<CompanyPlanningDetail />}
              />
              <Route path="/users" element={<UsersList />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/userProfile" element={<UserProfilePage />} />
              <Route path="/helpDesk" element={<HelpDesk />} />
              <Route path="/dataUpload" element={<DataUpload />} />
              <Route path="/dataUpload/mapping" element={<FileMapping />} />
              <Route path="/dataUpload/transaction" element={<Transaction />} />
              <Route path="/dataUpload/accept/:id" element={<AcceptFile />} />
              <Route path="/budget" element={<BudgetHeader />} />
              <Route path="/budget/details" element={<CompanyBudget />} />
              <Route path="/definition" element={<Definition />} />
              <Route path="/customer" element={<Customer />} />
              <Route path="/stock" element={<Stock />} />
              <Route path="/personnel" element={<Personnel />} />
              <Route
                path="/budget/details/info"
                element={<CompanyBudgetDetail />}
              />

              <Route path="*" element={<ComingSoon />} />
            </Route>
          </Route>

          {/* Verify User Route For Account Activation */}
          <Route>
            <Route path="/verifyUser/:GUID" element={<VerifyUser />} />
            <Route path="/emailSent" element={<VerifiedEmail />} />
          </Route>
        </Routes>
      </Suspense>
    </>
  );
};

export default Index;
