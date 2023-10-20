import Link from "next/link";
import { Link as RadixLink } from "@radix-ui/themes";

interface Props {
  href: string;
  children: string;
}
const LinkComponent = ({ href, children }: Props) => {
  return (
    <Link href={href} passHref legacyBehavior>
      <RadixLink color="blue" underline="always">
        {children}
      </RadixLink>
    </Link>
  );
};

export default LinkComponent;
