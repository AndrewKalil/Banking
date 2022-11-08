import { View, Text } from "react-native";
import React, { FC } from "react";
import SelectDropdown from "react-native-select-dropdown";
import { ChevronDownIcon } from "react-native-heroicons/outline";
import { Base } from "../../core/models/base.model";

interface Props {
  data: any[];
  item: any;
  onSelect: (selected: any, selectedId: number) => void;
  defaultValue?: string;
}

const DropdownSelect: FC<Props> = ({ defaultValue, item, data, onSelect }) => {
  return (
    <SelectDropdown
      defaultButtonText={defaultValue || "Select an item"}
      renderDropdownIcon={() => <ChevronDownIcon size={13} color="gray" />}
      buttonStyle={{
        backgroundColor: "none",
        width: "208px",
      }}
      buttonTextStyle={{
        fontSize: 16,
        color: "#666666",
        textAlign: "right",
        fontWeight: "400",
      }}
      rowTextStyle={{
        fontSize: 16,
        color: "#666666",
        fontWeight: "400",
      }}
      dropdownStyle={{
        borderRadius: 5,
      }}
      data={data}
      onSelect={(selectedItem: any) =>
        onSelect(selectedItem, selectedItem.categoryId)
      }
      buttonTextAfterSelection={(loItem: any) => {
        // text represented after item is selected
        // if data array is an array of objects then return selectedItem.property to render after item is selected
        return loItem.name;
      }}
      rowTextForSelection={(loItem: any) => {
        // text represented for each item in dropdown
        // if data array is an array of objects then return item.property to represent item in dropdown
        return loItem.name;
      }}
    />
  );
};

export default DropdownSelect;
