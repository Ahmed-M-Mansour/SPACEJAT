import { useRouter } from "next/navigation";
import { useLocalStorage } from "./useLocalStorage";

function useIsUserLoggedIn() {
  const [users] = useLocalStorage("users", []);

  const isLoggedIn = users.some((user) => user.isLoggedIn);
  return isLoggedIn;
}

const useAuth = () => {
  const router = useRouter();
  const authinticated = useIsUserLoggedIn();

  if (!authinticated) {
    router.push("/login");
  }

  return { authinticated };
};

export default useAuth;
