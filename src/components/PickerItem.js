import React, { Fragment, useState } from 'react'
import { Item as FormItem, Picker, Label } from 'native-base'
import PropTypes from 'prop-types'

// NOTE: picker placeholder only supported on ios
const PickerItem = ({ question, answers, setFieldValue }) => {
  const [selected, setSelected] = useState(undefined)
  return (
    <Fragment>
      <Label>{question}</Label>
      <FormItem picker>
        <Picker
          note
          mode='dropdown'
          selectedValue={selected}
          onValueChange={selected => {
            setFieldValue(question, selected)
            setSelected(selected)
          }}>
          {answers.map(answer => (
            <Picker.Item
              label={answer}
              value={answer}
              key={`answer.${answers.indexOf(answer)}`}
            />
          ))}
        </Picker>
      </FormItem>
    </Fragment>
  )
}

PickerItem.propTypes = {
  question: PropTypes.string.isRequired,
  answers: PropTypes.array.isRequired,
  setFieldValue: PropTypes.func.isRequired
}

export default PickerItem
