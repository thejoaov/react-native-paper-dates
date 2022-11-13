import * as React from 'react'

import { IconButton } from 'react-native-paper'
import { StyleSheet } from 'react-native'
import DatePickerModal from './DatePickerModal'
import { useLatest } from '../utils'
import type { DatePickerInputProps } from './DatePickerInput.shared'
import DatePickerInputWithoutModal from './DatePickerInputWithoutModal'
import { getTranslation } from '../translations/utils'

function DatePickerInput(
  {
    withModal = true,
    calendarIcon = 'calendar',
    ...rest
  }: DatePickerInputProps,
  ref: any
) {
  const [visible, setVisible] = React.useState<boolean>(false)
  const onDismiss = React.useCallback(() => {
    setVisible(false)
  }, [setVisible])
  const onChangeRef = useLatest(rest.onChange)
  const onInnerConfirm = React.useCallback(
    ({ date }: any) => {
      setVisible(false)
      onChangeRef.current(date)
    },
    [setVisible, onChangeRef]
  )
  const saveLabel = rest.saveLabel || getTranslation(rest.locale, 'save')

  return (
    <DatePickerInputWithoutModal
      ref={ref}
      {...rest}
      inputButtons={
        withModal ? (
          <IconButton
            size={24}
            style={styles.calendarButton}
            icon={calendarIcon}
            onPress={() => setVisible(true)}
          />
        ) : null
      }
      modal={({ value, locale, inputMode, validRange }) =>
        withModal ? (
          <DatePickerModal
            date={value}
            mode="single"
            visible={visible}
            onDismiss={onDismiss}
            onConfirm={onInnerConfirm}
            locale={locale}
            dateMode={inputMode}
            validRange={validRange}
            saveLabel={saveLabel}
          />
        ) : null
      }
    />
  )
}

const styles = StyleSheet.create({
  calendarButton: { position: 'absolute', right: 0, zIndex: 10 },
})

export default React.forwardRef(DatePickerInput)
