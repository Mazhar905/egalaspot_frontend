import { Text, Select, clx } from "@medusajs/ui"
import React from "react"

const FilterDropdown = ({
  title,
  items,
  value,
  handleChange,
  "data-testid": dataTestId,
}) => {
  return (
    <div className="flex gap-x-2 items-center justify-end w-[30%]">
      <Text className="txt-compact-small-plus text-ui-fg-muted w-[30%]">{title}</Text>
      <Select className="w-[50%]">
        <Select.Trigger>
          <Select.Value placeholder="Select a currency" />
        </Select.Trigger>

        <Select.Content>
          {items.map((item) => (
            <Select.Item key={item.value} value={item.value}>
              {item.label}
            </Select.Item>
          ))}
        </Select.Content>
      </Select>
    </div>
  )
}

export default FilterDropdown
