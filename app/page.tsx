import LoginPage from "@/components/login-page"

export default function Home() {
  // In a real application, you would check if the user is authenticated
  // If authenticated, redirect to dashboard
  // For demo purposes, we'll just show the login page

  // Uncomment to simulate a logged in user
  // redirect("/dashboard");

  return <LoginPage />
}
