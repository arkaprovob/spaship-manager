import { useState } from "react";
import {
  Card,
  CardTitle,
  CardBody,
  CardFooter,
  Text,
  TextVariants,
  Label,
  DropdownItem,
  CardHeader,
  CardActions,
  Dropdown,
  KebabToggle,
} from "@patternfly/react-core";
import { ScreenIcon } from "@patternfly/react-icons";
import { IConfig } from "../../config";

interface IProps {
  config?: any;
  selectedName?: string;
  event: any[];
  onSelect: (conf: any) => void;
  onRemove?: (conf: IConfig) => void;
}
export default (props: IProps) => {

  const { config, selectedName, onSelect, onRemove, event } = props;
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const footer = "Deployed Website";

  var map = new Map();
  event.forEach((item) => {
    map.set(item.propertyName, item.count);
  });

  const onClick = () => {
    onSelect(config);
  };

  const handleRemove = () => {
  };
  const onToggle = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const dropdownItems = [
    <DropdownItem key="remove-config" onClick={handleRemove}>
      Remove
    </DropdownItem>,
  ];

  return (
    <Card isFlat isHoverable isSelectable={true}>
      <CardHeader>
        {/* {renderCardActions()} */}
        <CardTitle onClick={onClick}>
          <ScreenIcon /> {config.websiteName}
        </CardTitle>
      </CardHeader>
      <CardBody onClick={onClick}>
        <Text component={TextVariants.h4}>Deployment Count : <b>{map.get(config.websiteName) || 0}</b></Text>
        <br></br>
        <Label variant="outline" >Prod</Label>
        <Label variant="outline" >Stage</Label>
        <Label variant="outline" >Dev</Label>
        <Label variant="outline" >QA</Label>
      </CardBody>
      <CardFooter onClick={onClick}>
        <Text component={TextVariants.small}>{footer}</Text>
      </CardFooter>
    </Card>
  );
};
