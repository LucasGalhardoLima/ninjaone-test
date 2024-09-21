import logo from "~/assets/images/logo.svg";

/**
 * A simple header component that displays the NinjaOne logo.
 *
 * @returns The header component.
 */
export const Header: React.FC = () => {
  return (
    <header className="bg-[#002A42] w-full h-[50px] flex items-center px-6">
      <img src={logo} height={26} alt="logo" />
    </header>
  );
};
