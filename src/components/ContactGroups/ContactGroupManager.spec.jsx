import React from 'react'
import { render, fireEvent } from '@testing-library/react'

import { groups } from '../../helpers/testData'
import ContactGroupManager from './ContactGroupManager'
import AppLike from '../../tests/Applike'

const createGroup = jest.fn()
const renameGroup = jest.fn()

const setup = () => {
  const root = render(
    <AppLike>
      <ContactGroupManager
        contactGroups={[groups[0]]}
        allGroups={groups}
        onGroupSelectionChange={() => {}}
        createGroup={createGroup}
        deleteGroup={() => {}}
        renameGroup={renameGroup}
      />
    </AppLike>
  )
  return { root }
}

describe('ContactGroupManager', () => {
  it('should display every groups and group creation button', () => {
    const { root } = setup()
    const { getByText } = root

    fireEvent.click(getByText('Manage groups'))
    groups.map(group => expect(getByText(group.name)).toBeTruthy())
    expect(getByText('Create a group')).toBeTruthy()
  })

  it('should be able to create a new group', () => {
    const { root } = setup()
    const { getByRole, getByText } = root

    fireEvent.click(getByText('Manage groups'))
    fireEvent.click(getByText('Create a group'))

    // it should replace the button by an empty input
    const createGroupInput = getByRole('textbox', { id: 'createGroupInput' })
    expect(createGroupInput.value).toBe('')

    // it should trigger creation function by pressing Enter key, and clear the input
    fireEvent.change(createGroupInput, { target: { value: 'new group' } })
    expect(createGroupInput.value).toBe('new group')
    fireEvent.keyDown(createGroupInput, { key: 'Enter', keyCode: '13' })
    expect(createGroupInput.value).toBe('')
    expect(createGroup).toHaveBeenCalled()
  })

  it('should be able to rename a group', async () => {
    const { root } = setup()
    const { getByRole, getByText, queryByRole, getByTestId } = root

    fireEvent.click(getByText('Manage groups'))

    // it should replace the field by input with group name as value
    const editIcon = getByTestId(`ActionsOption_${groups[0].name}-icon_pen`)
    fireEvent.click(editIcon)
    const editGroupInput = getByRole('textbox', { id: 'editGroupInput' })
    expect(editGroupInput.value).toBe(groups[0].name)

    // it should trigger rename function by pressing Enter key, and remove input
    fireEvent.keyDown(editGroupInput, { key: 'Enter', keyCode: '13' })
    expect(renameGroup).toHaveBeenCalled()
    expect(queryByRole('textbox', { id: 'editGroupInput' })).toBeNull()
  })
})
