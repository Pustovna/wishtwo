import NavLink from "../NavLink";
export default async function UserMenu() {
  return (
    <div>
      <NavLink href="/login" label="Login" />
      <NavLink href="/register" label="register" />
    </div>
  );
}
