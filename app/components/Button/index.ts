import ButtonLabel from "./ButtonLabel";
import ButtonIcon from "./ButtonIcon";
import ButtonRootComponent from "./ButtonRoot";

/**
 * Button component object containing subcomponents.
 * 
 * @property {typeof ButtonRootComponent} Root - The root component of the button.
 * @property {typeof ButtonIcon} Icon - The icon component of the button.
 * @property {typeof ButtonLabel} Label - The label component of the button.
 */
export const Button = {
  Root: ButtonRootComponent,
  Icon: ButtonIcon,
  Label: ButtonLabel,
};
