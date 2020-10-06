import React from 'react'
import PropTypes from 'prop-types'

import { components } from 'cozy-ui/transpiled/react/SelectBox'

const ControlDefault = ({ selectProps: { toggleMenu }, ...props }) => {
  // onTouchStart is necessary on mobile
  // see https://github.com/JedWatson/react-select/issues/3806#issuecomment-541325710
  return (
    <div onClick={toggleMenu} onTouchStart={toggleMenu}>
      <components.Control {...props} />
    </div>
  )
}

ControlDefault.propTypes = {
  selectProps: PropTypes.object.isRequired
}

export default ControlDefault
