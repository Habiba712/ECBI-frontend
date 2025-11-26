import { Suspense } from "react";
import ResetPassword from "../../../components/reset";
 
export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResetPassword />
    </Suspense>
  );
}
