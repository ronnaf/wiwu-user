import React, { Fragment, useState } from 'react'
import { Item as FormItem, Picker, Label } from 'native-base'

// NOTE: picker placeholder not supported by android
const PickerItems = ({ items }) => {
  const [selected, setSelected] = useState({})
  const pickerItems = items.map(item => (
    <Fragment key={items.indexOf(item)}>
      <Label>{item.question}</Label>
      <FormItem picker>
        <Picker
          note
          mode='dropdown'
          selectedValue={selected}
          onValueChange={setSelected}>
          {item.answers.map(answer => (
            <Picker.Item
              label={answer}
              value={answer}
              key={item.answers.indexOf(answer)}
            />
          ))}
        </Picker>
      </FormItem>
    </Fragment>
  ))
  return pickerItems
}

export default PickerItems
