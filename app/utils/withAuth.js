import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function withAuth(WrappedComponent) {
  return function ProtectedPage(props) {
    const router = useRouter();

    useEffect(() => {
      const session = localStorage.getItem("sessionData") ? JSON.parse(localStorage.getItem("sessionData")) : null;

      if (!session) {
        router.replace("/pages/login");
        return;
      }

    

      if (session.role !== "FINAL_USER") {
        router.replace("/pages/login");
      }

    }, []);

    return <WrappedComponent {...props} />;
  };
}
